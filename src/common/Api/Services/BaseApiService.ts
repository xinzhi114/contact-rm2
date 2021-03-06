import {PublicKey} from '../Domains/PublicKey';
import {AxiosInstance} from 'axios';
import {createAxiosInstance} from './ApiServiceHelper';
import {cipher, pki, util} from 'node-forge';
import moment from 'moment';
import {RequestBody} from '../Domains/req/RequestBody';
import {ResponseBody} from '../Domains/rsp/ResponseBody';
import {ApiServiceProvider} from './ApiServiceProvider';
import {Any} from '../Types';

/**
 * base api service
 */
export abstract class BaseApiService {
  protected publicKey?: PublicKey;
  protected prefix: string;
  protected httpInstance: AxiosInstance;
  private rawHttpInstance: AxiosInstance;
  protected constructor(prefix: string) {
    this.prefix = prefix;
    this.httpInstance = createAxiosInstance(this.prefix);
    this.rawHttpInstance = createAxiosInstance('');
  }
  protected getConfig() {
    return ApiServiceProvider.getConfig();
  }
  protected getStorage() {
    return ApiServiceProvider.getStorageService();
  }

  /**
   * get public key
   */
  protected async getPublicKey(): Promise<ResponseBody<PublicKey>> {
    return this.rawHttpInstance.get(
      '/v1/security/service/aekm/publickey?appId=' + this.getConfig().APP_ID,
    );
  }

  /**
   * build body
   */
  async buildBody(_body: Any) {
    return '';
  }

  async buildBodyAndHeaders(body: Any): Promise<RequestBody> {
    if (
      !this.publicKey ||
      moment(this.publicKey.appKey.validTo + 'Z').diff(moment(), 'seconds') < 30
    ) {
      const rsp = await this.getPublicKey();
      this.publicKey = rsp.body;
    }

    const publicKey = pki.publicKeyFromPem(
      `-----BEGIN PUBLIC KEY-----\n${this.publicKey.publicKey}\n-----END PUBLIC KEY-----`,
    );
    const cip = cipher.createCipher('AES-CBC', this.getConfig().E_KEY);
    cip.start({iv: this.getConfig().E_IV});
    cip.update(util.createBuffer(JSON.stringify(body)));
    cip.finish();
    return {
      payload: util.encode64(cip.output.data),
      headers: {
        'x-guid': this.publicKey.appKey.guid,
        'x-rhythm': util.encode64(publicKey.encrypt(this.getConfig().E_KEY)),
        'x-app': this.publicKey.appKey.appId,
      },
    };
  }
}
