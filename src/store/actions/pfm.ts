import { Aggregation } from '../../domain/Aggregation'
import { Spending } from '../../domain/Spending'
import { InComeOutGoing } from '../../domain/InComeOutGoing'
import { Budget } from '../../domain/Budget'
import { Dispatch } from 'redux'
import { PFMService } from '../../common/Api/Services/PFMService'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'
import { showErrorMsg } from '../../components/Toast'

export const LOAD_AGGREGATION = 'LOAD_AGGREGATION'
export const LOAD_SPENDING = 'LOAD_SPENDING'
export const LOAD_INCOME_OUTGOING = 'LOAD_INCOME_OUTGOING'
export const LOAD_BUDGET = 'LOAD_BUDGET'

/**
 * load aggregation
 */
interface LoadAggregation {
  type: typeof LOAD_AGGREGATION
  payload: Aggregation[]
}

/**
 * load spending
 */
interface LoadSpending {
  type: typeof LOAD_SPENDING
  payload: Spending[]
}

/**
 * load income and outgoing
 */
interface LoadIncomeAndOutgoing {
  type: typeof LOAD_INCOME_OUTGOING
  payload: InComeOutGoing
}

/**
 * load budget
 */
interface LoadBudget {
  type: typeof LOAD_BUDGET
  payload: Budget
}

/**
 * load aggregation
 */
export function loadAggregation() {
  return (dispatch: Dispatch) => {
    ASF.getService(PFMService)
      .aggregatedAccounts()
      .then(({ body }: any) => {
        // TODO hard code, need remove
        body = body.filter((b: any) => b.accountType === 'CURRENT')
        dispatch({ type: LOAD_AGGREGATION, payload: body })
      })
      .catch((e) => showErrorMsg(e))
  }
}

/**
 * load spending
 */
export function loadSpending(filter: any, clear = true) {
  return (dispatch: Dispatch) => {
    if (clear) {
      dispatch({ type: LOAD_SPENDING, payload: undefined })
    }
    ASF.getService(PFMService)
      .spendCategorization(filter)
      .then(({ body }: any) => dispatch({ type: LOAD_SPENDING, payload: body }))
      .catch((e) => showErrorMsg(e))
  }
}

/**
 * load income and outgoing
 */
export function loadIncomeAndOutgoing(filter: any) {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOAD_INCOME_OUTGOING, payload: null })
    ASF.getService(PFMService)
      .incomeAndOutgoing(filter)
      .then(({ body }: any) => dispatch({ type: LOAD_INCOME_OUTGOING, payload: body }))
      .catch((e) => showErrorMsg(e))
  }
}

/**
 * load income and outgoing
 */
export function loadBudget(filter: any, clear = true) {
  return (dispatch: Dispatch) => {
    if (clear) {
      dispatch({ type: LOAD_BUDGET, payload: undefined })
    }
    ASF.getService(PFMService)
      .budgets(filter)
      .then(({ body }: any) => dispatch({ type: LOAD_BUDGET, payload: body }))
      .catch((e) => showErrorMsg(e))
  }
}

export type PFMActionTypes = LoadAggregation | LoadSpending | LoadIncomeAndOutgoing | LoadBudget
