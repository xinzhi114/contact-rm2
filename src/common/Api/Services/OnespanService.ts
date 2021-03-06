import { BaseApiService } from './BaseApiService'
import { ResponseBody } from '../Domains/rsp/ResponseBody'
import {
  OneSpanRegisterRsp,
  RegisterRsp,
} from '../Domains/rsp/RegistrationRsp'
import { OneSpanRegisterReq } from '../Domains/req/RegistrationReq'

/**
 * onespan registration service
 */
export class OnespanService extends BaseApiService {
  constructor() {
    super(
      '/v1/security/service/onespan/adapter',
    )
  }


  /**
   * one span registration
   */
  async registration(req: OneSpanRegisterReq): Promise<ResponseBody<OneSpanRegisterRsp>> {
    const body = await this.buildBodyAndHeaders(req)
    return this.httpInstance.post('/customer/registration', body.payload, {
      headers: {
        ...body.headers,
      },
    })
  }

  /**
   * onespan registration status check
   */
  async registrationCheck(userId: string): Promise<ResponseBody<RegisterRsp>> {
    const body = await this.buildBodyAndHeaders({ userId })
    return this.httpInstance.post('/customer/registration/check/status', body.payload, {
      headers: {
        ...body.headers,
      },
    })
  }
}
