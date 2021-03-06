import {BaseApiService} from './BaseApiService';
import {getOrRefreshToken} from './TokenHelper';
import {Any} from '../Types';
import {ResponseBody} from '../Domains/rsp/ResponseBody';
import {EventRsp} from '../Domains/rsp/EventRsp';
import {EventUpdateReq} from '../Domains/req/EventUpdateReq';
import {EVENTS} from '../config';

/**
 * Event Subscription Filtration Server
 */
export class EventSubscriptionFiltrationService extends BaseApiService {
  constructor() {
    super('/v1/operations/executions/events');
  }

  /**
   * get config views
   */
  async getViews(): Promise<ResponseBody<EventRsp>> {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.post('/view', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.ALERT_CONFIGURE,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * update alert item
   */
  async updateAlert(data: EventUpdateReq) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(data);
    return this.httpInstance.post('/update', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.ALERT_CONFIGURE,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * get alert history
   */
  async getHistory(query: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(query || {});
    return this.httpInstance.post('/history/data', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.ALERT_CONFIGURE,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }
}
