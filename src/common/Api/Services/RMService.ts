import {BaseApiService} from './BaseApiService';
import {getOrRefreshToken} from './TokenHelper';
import {RMDetailsReq} from '../Domains/req/RMReq';
import {ResponseBody} from '../Domains/rsp/ResponseBody';
import {RMInfoRSP} from '../Domains/rsp/RMRsp';

/**
 * Contact RM Service
 */
export class RMService extends BaseApiService {
  constructor() {
    super('/v1/customer/services/relationship/manager');
  }

  /**
   * get RM Details
   */
  async getRMDetails(req: RMDetailsReq): Promise<ResponseBody<RMInfoRSP>> {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(req);
    return this.httpInstance.post('/business/details', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }
}
