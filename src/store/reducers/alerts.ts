import { IRelationshipManager } from '../../constants/account'
import { AlertHistory } from '../../domain/AlertHistory'
import { AccountAlert, AlertItem } from '../../domain/AlertItem'
import * as types from '../actions/alerts'

export interface IAlertsState {
  countOfAccount: number | null
  countOfPayment: number | null
  relationshipManager: IRelationshipManager | null
  histories: AlertHistory[] | null
  accountAlerts: AccountAlert[] | null
  paymentAlerts: AlertItem[] | null
  error: string | null
}

export const defaultState: IAlertsState = {
  countOfAccount: null,
  countOfPayment: null,
  relationshipManager: null,
  histories: null,
  accountAlerts: null,
  paymentAlerts: null,
  error: null,
}

export default (state = defaultState, action: types.AlertsActionsTypes): IAlertsState => {
  switch (action.type) {
    case types.COUNT_ALERTS:
    case types.COUNT_ALERTS_ERROR:
      return {
        ...state,
        countOfAccount: null,
        countOfPayment: null,
      }
    case types.COUNT_ALERTS_SUCCESS:
      return {
        ...state,
        countOfAccount: action.payload.countOfAccount,
        countOfPayment: action.payload.countOfPayment,
      }
    case types.GET_ALERT_DASHBOARD_DATA:
      return {
        ...state,
        relationshipManager: null,
      }
    case types.GET_ALERT_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        relationshipManager: action.payload.relationshipManager,
      }
    case types.FETCH_START:
    case types.CLEAR_ALERTS_ERROR:
      return {
        ...state,
        error: null,
      }
    case types.FETCH_FAILED:
      return {
        ...state,
        error: action.error,
      }
    case types.FETCH_HISTORY_SUCCESS:
    case types.FETCH_ALERTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
