import * as types from '../actions/account'
import { IAccount } from '../../constants/account'

export interface IAccountState {
  accounts: IAccount[]
}

const defaultState: IAccountState = {
  accounts: [],
}

export default (state = defaultState, action: types.AccountActionTypes): IAccountState => {
  switch (action.type) {
    case types.LOAD_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
      }
    case types.LOAD_ACCOUNTS_ERROR:
      return {
        ...state,
        accounts: [],
      }
    default:
      return state
  }
}
