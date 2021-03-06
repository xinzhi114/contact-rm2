import { LoginRsp } from '../common/Api/Domains/rsp/LoginRsp'
export type IAuthToken = LoginRsp
export type IAuthResponse = { body: 'OTP_CREATE' | IAuthToken; status: { code: string } }
