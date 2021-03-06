import * as types from '../actions/payment'
import { IPayment } from '../../constants/payment'

export interface IPaymentState {
  payments: IPayment[]
}

const defaultState: IPaymentState = {
  payments: [],
}

export default (state = defaultState, action: types.PaymentActionTypes): IPaymentState => {
  switch (action.type) {
    case types.LOAD_RECENT_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload,
      }
    case types.LOAD_RECENT_PAYMENTS_ERROR:
      return {
        ...state,
        payments: [],
      }
    default:
      return state
  }
}
