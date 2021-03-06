import { IPayment } from '../../constants/payment'
import { AppThunk } from '../constants'
import dataSvc from '../../services/dataSvc'

export const LOAD_RECENT_PAYMENTS = '[PAYMENT] LOAD_RECENT_PAYMENTS'
export const LOAD_RECENT_PAYMENTS_SUCCESS = '[PAYMENT] LOAD_RECENT_PAYMENTS_SUCCESS'
export const LOAD_RECENT_PAYMENTS_ERROR = '[PAYMENT] LOAD_RECENT_PAYMENTS_ERROR'

export interface ILoadRecentPaymentsAction {
  type: typeof LOAD_RECENT_PAYMENTS
  payload: {
    domestic: boolean
  }
}

export interface ILoadRecentPaymentsSuccessAction {
  type: typeof LOAD_RECENT_PAYMENTS_SUCCESS
  payload: IPayment[]
}

export interface ILoadRecentPaymentsErrorAction {
  type: typeof LOAD_RECENT_PAYMENTS_ERROR
}

export const loadRecentPaymentsSuccess = (
  payments: IPayment[]
): ILoadRecentPaymentsSuccessAction => ({
  type: LOAD_RECENT_PAYMENTS_SUCCESS,
  payload: payments,
})

export const loadRecentPaymentsError = (): ILoadRecentPaymentsErrorAction => ({
  type: LOAD_RECENT_PAYMENTS_ERROR,
})

export const loadRecentPayments = (domestic: boolean): AppThunk => async (dispatch) => {
  dataSvc
    .getRecentPayments(domestic)
    .then((data) => {
      dispatch(loadRecentPaymentsSuccess(data.payments))
    })
    .catch((error) => {
      dispatch(loadRecentPaymentsError())
      throw error
    })
}

export type PaymentActionTypes =
  | ILoadRecentPaymentsAction
  | ILoadRecentPaymentsSuccessAction
  | ILoadRecentPaymentsErrorAction
