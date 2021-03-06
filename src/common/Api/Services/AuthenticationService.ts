import {BaseApiService} from './BaseApiService';
import {LoginRsp} from '../Domains/rsp/LoginRsp';
import moment from 'moment';
import {ResponseBody} from '../Domains/rsp/ResponseBody';
import {Any} from '../Types';
import {ApiServiceProvider} from './ApiServiceProvider';
import {EVENTS} from '../config';

export const AUTH_LOCAL_KEY = 'AUTH_LOCAL_KEY';

/**
 * Authentication Service
 */
export class AuthenticationService extends BaseApiService {
  constructor() {
    super('/v1/security/service/authenticate');
  }

  /**
   * used to send otp and validate otp for login
   */
  async evaluate(data: Any) {
    const body = await this.buildBodyAndHeaders(data);
    return this.httpInstance.post('/login', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.USER_CRED_VALIDATE,
      },
    });
  }

  /**
   * refresh token
   */
  async refreshToken(refreshToken: string): Promise<ResponseBody<LoginRsp>> {
    const body = await this.buildBodyAndHeaders({token: refreshToken});
    return this.httpInstance.post('/refreshToken', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.USER_CRED_VALIDATE,
      },
    });
  }

  /**
   * get access token
   */
  async getToken(): Promise<LoginRsp> {
    const cached = await this.getStorage().getData<LoginRsp>(AUTH_LOCAL_KEY);
    // cache token is not exist or token expires in 2 minutes, will redirect to login
    if (
      !cached ||
      moment(cached.refresh_token_expired_at).diff(moment(), 'minutes') <
        this.getConfig().REFRESH_TOKEN_EXPIRES_BEFORE
    ) {
      this.getStorage()
        .removeData(AUTH_LOCAL_KEY)
        .then(() => null);
      ApiServiceProvider.navigate({routeName: 'login'});
      const {globalT} = ApiServiceProvider.getI18n();
      return Promise.reject(globalT('common.login_expired'));
    }

    if (
      moment(cached.access_token_expired_at).diff(moment(), 'minutes') <
      this.getConfig().ACCESS_TOKEN_EXPIRES_BEFORE
    ) {
      const newToken = await this.refreshToken(cached.refresh_token);
      return this.saveToken(newToken.body);
    }
    return Promise.resolve(cached);
  }

  /**
   * save token
   * @param token the token
   */
  async saveToken(token: LoginRsp): Promise<LoginRsp> {
    token.access_token_expired_at = moment()
      .add(token.access_token_expires_in, 'seconds')
      .toISOString();
    token.refresh_token_expired_at = moment()
      .add(token.refresh_token_expires_in, 'seconds')
      .toISOString();
    await this.getStorage().storeData(AUTH_LOCAL_KEY, token);
    return token;
  }

  /**
   * used to send otp and validate otp for recoverusername
   */
  async recoverUserName(data: Any) {
    const body = await this.buildBody({
      payload: data,
      cynEvent: EVENTS.RECOVER_USERNAME,
      g_recaptcha: 'dummy-response',
    });
    return this.httpInstance.post('/authenticate/recoverusername', body);
  }
}
