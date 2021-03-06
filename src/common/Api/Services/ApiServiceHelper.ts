import axios from 'axios';
import {get} from 'lodash';
import {cipher, util} from 'node-forge';
import {Any} from '../Types';
import {ApiServiceProvider} from './ApiServiceProvider';
import {API_AUTH_USER_KEY} from '../config';

/**
 * decrypt response
 * @param rsp the response string
 */
function decryptRsp(rsp: Any): Any {
  if (typeof rsp === 'object') {
    return rsp;
  }
  let stringBody = '';
  const config = ApiServiceProvider.getConfig();
  const {globalT} = ApiServiceProvider.getI18n();
  try {
    const cip = cipher.createDecipher('AES-CBC', config.E_KEY);
    cip.start({iv: config.E_IV});
    cip.update(util.createBuffer(util.decode64(rsp)));
    cip.finish();
    stringBody = cip.output.data;
  } catch (e) {
    throw new Error(globalT('error.decryption_failed'));
  }

  try {
    return JSON.parse(stringBody);
  } catch (e) {
    throw new Error(globalT('error.parse_rsp_failed'));
  }
}
/**
 * create axios instance
 * @param prefix
 */
export function createAxiosInstance(prefix: string) {
  /**
   * new http/s request instance
   */
  const apiInstance = axios.create({
    baseURL: ApiServiceProvider.getConfig().BASE_API_PATH + prefix,
  });

  /**
   * inject token
   */
  apiInstance.interceptors.request.use(
    async (config) => {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    () => {
      const {globalT} = ApiServiceProvider.getI18n();
      return Promise.reject(globalT('error.request_failed'));
    },
  );

  /**
   * interceptor errors
   */
  apiInstance.interceptors.response.use(
    (rsp) => {
      let jsonRsp;
      try {
        jsonRsp = decryptRsp(rsp.data);
      } catch (e) {
        throw e.message;
      }
      return jsonRsp;
    },
    (error) => {
      const {globalT, globalTExist} = ApiServiceProvider.getI18n();
      let errMsg = error.message || globalT('error.request_failed');
      if (error.response && error.response.data) {
        let errorJson: Any = {};
        try {
          errorJson = decryptRsp(error.response.data);
        } catch (e) {
          return Promise.reject(e.message);
        }
        const isLoginEndpoint = get(error, 'request._url', '').includes(
          'authenticate/login',
        );
        const bsService = ApiServiceProvider.getStorageService();
        if (error.response.status.toString() === '401' && !isLoginEndpoint) {
          const {AUTH_LOCAL_KEY} = require('./AuthenticationService');
          return bsService
            .removeData(AUTH_LOCAL_KEY)
            .then(() => bsService.removeData(API_AUTH_USER_KEY))
            .then(() => {
              ApiServiceProvider.navigate({routeName: 'login'});
              return Promise.reject(globalT('common.login_expired'));
            });
        }
        const translateKey = `error.${get(errorJson, 'status.errorCode')}`;
        errMsg = globalTExist(translateKey)
          ? globalT(translateKey)
          : get(errorJson, 'status.message');
        errMsg = errMsg || globalT('error.server_no_returned');
      }
      return Promise.reject(errMsg);
    },
  );

  return apiInstance;
}
