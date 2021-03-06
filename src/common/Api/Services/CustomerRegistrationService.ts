import {BaseApiService} from './BaseApiService';
import {EVENTS} from '../config';
import { ResponseBody } from '../Domains/rsp/ResponseBody'
import {
  RegisterOTPEvaluateRsp,
  RegisterConfirmRsp,
  RegisterRsp,
  TitleRsp,
  TNCRsp,
  TNCUriRsp,
} from '../Domains/rsp/RegistrationRsp'
import { RegisterOTPEvaluateReq, RegisterConfirmReq, RegisterReq, TNCReq } from '../Domains/req/RegistrationReq'

/**
 * customer registration service
 */
export class CustomerRegistrationService extends BaseApiService {
  constructor() {
    super(
      '/v1/sales/service/customer/registration',
    );
  }


  /**
   * get user titles
   */
  async getTitles() : Promise<ResponseBody<TitleRsp[]>> {
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.get('/titles', {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.CUSTOMER_REGISTRATION,
      },
    });
  }

  /**
   * get TNC uri
   */
  private async getTNCUri() : Promise<ResponseBody<TNCUriRsp>> {
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.get('/tncuri', {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.CUSTOMER_REGISTRATION,
      },
    });
  }
  /**
   * get TNC
   */
  async getTNC(req: TNCReq): Promise<ResponseBody<TNCRsp>> {
    const tncUri = await this.getTNCUri()
    const body = await this.buildBodyAndHeaders({
      termsAndConditionPageURI: tncUri.body.termsAndConditionPageURI,
      ...req,
    })
    return this.httpInstance.post('/termsAndConditions', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.CUSTOMER_REGISTRATION,
      },
    })
  }

  /**
   * register
   */
  async register(req: RegisterReq): Promise<ResponseBody<RegisterRsp>> {
    const body = await this.buildBodyAndHeaders(req)
    return this.httpInstance.post('/register', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.CUSTOMER_REGISTRATION,
      },
    })
  }

  /**
   * evaluate otp
   */
  async evaluate(req: RegisterOTPEvaluateReq): Promise<ResponseBody<RegisterOTPEvaluateRsp>> {
    const body = await this.buildBodyAndHeaders(req)
    return this.httpInstance.post('/otp/evaluate', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.CUSTOMER_REGISTRATION,
      },
    })
  }

  /**
   * confirm register
   */
  async confirm(req: RegisterConfirmReq, mfaToken: string): Promise<ResponseBody<RegisterConfirmRsp>> {
    const body = await this.buildBodyAndHeaders(req)
    return this.httpInstance.post('/confirm', body.payload, {
      headers: {
        ...body.headers,
        'x-cyn-event': EVENTS.CUSTOMER_REGISTRATION,
        'x-mfatoken': mfaToken,
      },
    })
  }
}
