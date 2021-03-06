/**
 * Finance manager state
 */

import {
  PFMActionTypes,
  LOAD_AGGREGATION,
  LOAD_BUDGET,
  LOAD_INCOME_OUTGOING,
  LOAD_SPENDING,
} from '../actions/pfm'
import { Aggregation } from '../../domain/Aggregation'
import { Spending, SpendingTransaction } from '../../domain/Spending'
import { InComeOutGoing } from '../../domain/InComeOutGoing'
import { Budget } from '../../domain/Budget'

export interface FMState {
  aggregations?: Aggregation[]
  spending?: Spending[]
  spendingTransactions: Record<string, SpendingTransaction>
  incomeAndOutgoing?: InComeOutGoing
  budget?: Budget
}

const initState: FMState = {
  spendingTransactions: {},
}
/**
 * Finance manager state reducer
 * @param state the previous state
 * @param action the action with data
 */
export default function FMReducer(state: FMState = initState, action: PFMActionTypes): FMState {
  if (action.type === LOAD_AGGREGATION) {
    return { ...state, aggregations: action.payload }
  } else if (action.type === LOAD_SPENDING) {
    return { ...state, spending: action.payload }
  } else if (action.type === LOAD_INCOME_OUTGOING) {
    return { ...state, incomeAndOutgoing: action.payload }
  } else if (action.type === LOAD_BUDGET) {
    return { ...state, budget: action.payload }
  }
  return state
}
