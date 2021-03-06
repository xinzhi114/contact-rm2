import { IAuthToken } from '../../domain/LoginRsp'
import * as types from '../actions/auth'
import {
  AUTH_LOCAL_KEY,
  AuthenticationService,
} from '../../common/Api/Services/AuthenticationService'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'

export interface IAuthState {
  token: IAuthToken | null
  forceRedirect: boolean
  canSendOtp: boolean
  loading: boolean | null
  error: string | null
}

const getDefaultState = (): IAuthState => {
  const cached = window.localStorage.getItem(AUTH_LOCAL_KEY)
  return {
    token: cached ? (JSON.parse(cached) as IAuthToken) : null,
    forceRedirect: cached !== null,
    canSendOtp: false,
    loading: null,
    error: null,
  }
}

export default (state = getDefaultState(), action: types.AuthActionTypes): IAuthState => {
  switch (action.type) {
    case types.SEND_OTP:
    case types.LOGIN:
      return {
        ...state,
        canSendOtp: false,
        token: null,
        loading: true,
        error: null,
      }
    case types.SEND_OTP_SUCCESS:
      return {
        ...state,
        canSendOtp: true,
        token: null,
        loading: false,
        error: null,
      }
    case types.LOGIN_SUCCESS:
      ASF.getService(AuthenticationService).saveToken(action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        canSendOtp: false,
        loading: false,
        error: null,
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        canSendOtp: false,
        loading: false,
        error: action.payload.error,
      }
    case types.LOGOUT:
      window.localStorage.removeItem(AUTH_LOCAL_KEY)
      return getDefaultState()
    default:
      return state
  }
}
