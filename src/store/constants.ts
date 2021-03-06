import { ThunkAction } from '@reduxjs/toolkit'
import { AccountActionTypes } from './actions/account'
import { AlertsActionsTypes } from './actions/alerts'
import { AuthActionTypes } from './actions/auth'
import { PaymentActionTypes } from './actions/payment'
import { IAccountState } from './reducers/account'
import { IAlertsState } from './reducers/alerts'
import { IAuthState } from './reducers/auth'
import { IPaymentState } from './reducers/payment'
import { HelpState } from './reducers/faq'
import { RMState } from './reducers/rm'

export interface IAppState {
  dataReducer: any
  payment: IPaymentState
  account: IAccountState
  auth: IAuthState
  alerts: IAlertsState
  FMReducer: any
  faq: HelpState
  rm: RMState
}

export type AppActionTypes =
  | AuthActionTypes
  | AccountActionTypes
  | PaymentActionTypes
  | AlertsActionsTypes

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IAppState,
  unknown,
  AppActionTypes
>
