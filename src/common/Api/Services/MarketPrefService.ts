import {BaseApiService} from './BaseApiService';
import {getOrRefreshToken} from './TokenHelper';
import {Any} from '../Types';
import {ResponseBody} from '../Domains/rsp/ResponseBody';
import {PreferencesStatus} from '../Domains/rsp/PreferencesStatus';

/**
 * Marketing Preferences Server
 */
export class MarketPrefService extends BaseApiService {
  constructor() {
    super('/v1/sales/service/customer/market/');
  }

  /**
   * get preferences
   */
  async getPreferences() {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.get('/preferences', {
      headers: {
        ...body.headers,
        'x-authorisation': `${token.access_token}`,
      },
    });
  }

  /**
   * get preferences status
   */
  async getPreferencesStatus(): Promise<ResponseBody<PreferencesStatus>> {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.get('/preferences/status', {
      headers: {
        ...body.headers,
        'x-authorisation': `${token.access_token}`,
      },
    });
  }

  /**
   * update preferences
   */
  async updatePreferences(data: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(data);
    return this.httpInstance.put('/preferences', body.payload, {
      headers: {
        ...body.headers,
        'x-authorisation': `${token.access_token}`,
      },
    });
  }
}
