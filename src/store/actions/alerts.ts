import * as _ from 'lodash'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'
import { EventSubscriptionFiltrationService } from '../../common/Api/Services/EventSubscriptionFiltrationService'
import { IRelationshipManager } from '../../constants/account'
import { AlertHistory } from '../../domain/AlertHistory'
import { AccountAlert, AlertItem } from '../../domain/AlertItem'
import dataSvc from '../../services/dataSvc'
import { AppThunk } from '../constants'

export const COUNT_ALERTS = '[ALERTS] COUNT_ALERTS'
export const COUNT_ALERTS_SUCCESS = '[ALERTS] COUNT_ALERTS_SUCCESS'
export const COUNT_ALERTS_ERROR = '[ALERTS] COUNT_ALERTS_ERROR'

export const GET_ALERT_DASHBOARD_DATA = '[ALERTS] GET_ALERT_DASHBOARD_DATA'
export const GET_ALERT_DASHBOARD_DATA_SUCCESS = '[ALERTS] GET_ALERT_DASHBOARD_DATA_SUCCESS'
export const GET_ALERT_DASHBOARD_DATA_ERROR = '[ALERTS] GET_ALERT_DASHBOARD_DATA_ERROR'

export const FETCH_START = '[ALERTS] FETCH_START'
export const FETCH_FAILED = '[ALERTS] FETCH_FAILED'
export const FETCH_HISTORY_SUCCESS = '[ALERTS] FETCH_HISTORY_SUCCESS'
export const FETCH_ALERTS_SUCCESS = '[ALERTS] FETCH_ALERTS_SUCCESS'
export const CLEAR_ALERTS_ERROR = '[ALERTS] CLEAR_ALERTS_ERROR'

export interface ICountAlertsAction {
  type: typeof COUNT_ALERTS
}

export interface ICountAlertsSuccessAction {
  type: typeof COUNT_ALERTS_SUCCESS
  payload: {
    countOfAccount: number
    countOfPayment: number
  }
}

export interface ICountAlertsErrorAction {
  type: typeof COUNT_ALERTS_ERROR
  error: string
}

export interface IGetAlertDashboardDataAction {
  type: typeof GET_ALERT_DASHBOARD_DATA
}

export interface IGetAlertDashboardDataSuccessAction {
  type: typeof GET_ALERT_DASHBOARD_DATA_SUCCESS
  payload: {
    relationshipManager: IRelationshipManager
  }
}

export interface IGetAlertDashboardDataErrorAction {
  type: typeof GET_ALERT_DASHBOARD_DATA_ERROR
  error: string
}

export interface IFetchStartAction {
  type: typeof FETCH_START
}

export interface IFetchFailedAction {
  type: typeof FETCH_FAILED
  error: string
}

export interface IFetchHistorySuccessAction {
  type: typeof FETCH_HISTORY_SUCCESS
  payload: {
    histories: AlertHistory[]
  }
}

export interface IFetchAlertsSuccessAction {
  type: typeof FETCH_ALERTS_SUCCESS
  payload: {
    accountAlerts: AccountAlert[]
    paymentAlerts: AlertItem[]
  }
}

export interface IClearAlertsErrorAction {
  type: typeof CLEAR_ALERTS_ERROR
}

export const countAlertStart = (): ICountAlertsAction => ({ type: COUNT_ALERTS })

export const countAlertSuccess = (
  countOfAccount: number,
  countOfPayment: number
): ICountAlertsSuccessAction => ({
  type: COUNT_ALERTS_SUCCESS,
  payload: { countOfAccount, countOfPayment },
})

export const countAlertError = (error: string): ICountAlertsErrorAction => ({
  type: COUNT_ALERTS_ERROR,
  error,
})

export const countAlerts = (): AppThunk => (dispatch) => {
  dispatch(countAlertStart())
  ASF.getService(EventSubscriptionFiltrationService)
    .getViews()
    .then((rsp) => {
      let c1 = 0
      const c2 = rsp.body.payment_alert_event.filter((i) => i.active).length
      _.each(rsp.body.current_account_alert_event, (aItem) => {
        c1 += aItem.events.filter((i) => i.active).length
      })
      dispatch(countAlertSuccess(c1, c2))
    })
    .catch((error) => {
      dispatch(countAlertError(error))
    })
}

export const getAlertDashboardDataSuccess = (
  relationshipManager: IRelationshipManager
): IGetAlertDashboardDataSuccessAction => ({
  type: GET_ALERT_DASHBOARD_DATA_SUCCESS,
  payload: {
    relationshipManager,
  },
})

export const getAlertDashboardDataError = (error: string): IGetAlertDashboardDataErrorAction => ({
  type: GET_ALERT_DASHBOARD_DATA_ERROR,
  error,
})

export const getAlertDashboardData = (): AppThunk => (dispatch) => {
  dispatch({ type: GET_ALERT_DASHBOARD_DATA })
  // fetches remote data
  dataSvc
    .getAlertsDashboardData()
    .then((data) => {
      dispatch(getAlertDashboardDataSuccess(data.dataList.relationshipManager))
    })
    .catch((error) => {
      dispatch(getAlertDashboardDataError(error))
      throw error
    })
}

const fetchStart = (): IFetchStartAction => ({ type: FETCH_START })
const fetchFailed = (error: string): IFetchFailedAction => ({ type: FETCH_FAILED, error })
const fetchHistorySuccess = (histories: AlertHistory[]): IFetchHistorySuccessAction => ({
  type: FETCH_HISTORY_SUCCESS,
  payload: { histories },
})
const fetchAlertsSuccess = (
  accountAlerts: AccountAlert[],
  paymentAlerts: AlertItem[]
): IFetchAlertsSuccessAction => ({
  type: FETCH_ALERTS_SUCCESS,
  payload: { accountAlerts, paymentAlerts },
})

/**
 * fetch alert history
 */
export const fetchHistory = (query: any): AppThunk => (dispatch) => {
  dispatch(fetchStart())
  ASF.getService(EventSubscriptionFiltrationService)
    .getHistory(query || {})
    .then((rsp: any) => {
      dispatch(fetchHistorySuccess(rsp.body))
    })
    .catch((e) => dispatch(fetchFailed(e)))
}

/**
 * fetch alerts
 */
export const fetchAlerts = (): AppThunk => (dispatch) => {
  dispatch(fetchStart())
  ASF.getService(EventSubscriptionFiltrationService)
    .getViews()
    .then((rsp) => {
      dispatch(
        fetchAlertsSuccess(rsp.body.current_account_alert_event, rsp.body.payment_alert_event)
      )
    })
    .catch((e) => dispatch(fetchFailed(e)))
}

export const clearAlertError = (): IClearAlertsErrorAction => ({ type: CLEAR_ALERTS_ERROR })

export type AlertsActionsTypes =
  | ICountAlertsAction
  | ICountAlertsSuccessAction
  | ICountAlertsErrorAction
  | IGetAlertDashboardDataAction
  | IGetAlertDashboardDataSuccessAction
  | IGetAlertDashboardDataErrorAction
  | IFetchStartAction
  | IFetchFailedAction
  | IFetchHistorySuccessAction
  | IFetchAlertsSuccessAction
  | IClearAlertsErrorAction
