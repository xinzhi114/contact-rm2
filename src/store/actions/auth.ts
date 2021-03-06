import { getLoginParams } from '../../utils/auth'
import { AppThunk } from '../constants'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'
import { AuthenticationService } from '../../common/Api/Services/AuthenticationService'
import { IAuthToken } from '../../domain/LoginRsp'
import { Any } from '../../common/Api/Types'
import { storageService } from '../../services/Util'
import { API_AUTH_USER_KEY } from '../../common/Api/config'

export const SEND_OTP = '[AUTH] SEND_OTP'
export const SEND_OTP_SUCCESS = '[AUTH] SEND_OTP_SUCCESS'
export const LOGOUT = '[AUTH] LOGOUT'
export const LOGIN = '[AUTH] LOGIN'
export const LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS'
export const LOGIN_ERROR = '[AUTH] LOGIN_ERROR'

export interface ISendOTPAction {
  type: typeof SEND_OTP
}

export interface ISendOTPSuccessAction {
  type: typeof SEND_OTP_SUCCESS
}

export interface ILoginAction {
  type: typeof LOGIN
}

export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  payload: {
    token: IAuthToken
  }
}

export interface ILoginErrorAction {
  type: typeof LOGIN_ERROR
  payload: {
    error: string
  }
}

export interface ILogoutAction {
  type: typeof LOGOUT
}

export const sendOtp = (userId: string, password: string): AppThunk => (dispatch) => {
  dispatch({ type: SEND_OTP })
  ASF.getService(AuthenticationService)
    .evaluate(getLoginParams(userId, password))
    .then(() => {
      // Verified that user and password are valid
      dispatch(sendOtpSuccess())
    })
    .catch((e) => dispatch(loginError(e)))
}

export const sendOtpSuccess = (): ISendOTPSuccessAction => ({ type: SEND_OTP_SUCCESS })

export const login = (userId: string, password: string, otp: string): AppThunk => (dispatch) => {
  dispatch({ type: LOGIN })
  ASF.getService(AuthenticationService)
    .evaluate(getLoginParams(userId, password, otp))
    .then((resp: Any) => {
      // TODO, here should save real user object
      storageService.storeData(API_AUTH_USER_KEY, { userId }).then(() => {
        // Send otp and login information
        dispatch(loginSuccess(resp.body as IAuthToken))
      })
    })
    .catch((e) => dispatch(loginError(e)))
}

export const loginSuccess = (token: IAuthToken): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { token },
})

export const loginError = (error: string): ILoginErrorAction => ({
  type: LOGIN_ERROR,
  payload: {
    error,
  },
})

export const logout = (): ILogoutAction => ({ type: LOGOUT })

export type AuthActionTypes =
  | ISendOTPAction
  | ISendOTPSuccessAction
  | ILogoutAction
  | ILoginAction
  | ILoginSuccessAction
  | ILoginErrorAction
