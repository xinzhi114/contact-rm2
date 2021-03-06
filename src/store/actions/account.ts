import { IAccount } from '../../constants/account'
import { AppThunk } from '../constants'
import dataSvc from '../../services/dataSvc'

export const LOAD_ACCOUNTS = '[ACCOUNT] LOAD_ACCOUNTS'
export const LOAD_ACCOUNTS_SUCCESS = '[ACCOUNT] LOAD_ACCOUNTS_SUCCESS'
export const LOAD_ACCOUNTS_ERROR = '[ACCOUNT] LOAD_ACCOUNTS_ERROR'

export interface ILoadAccountsAction {
  type: typeof LOAD_ACCOUNTS
}

export interface ILoadAccountsSuccessAction {
  type: typeof LOAD_ACCOUNTS_SUCCESS
  payload: IAccount[]
}

export interface ILoadAccountsErrorAction {
  type: typeof LOAD_ACCOUNTS_ERROR
}

export const loadAccountsSuccess = (accounts: IAccount[]): ILoadAccountsSuccessAction => ({
  type: LOAD_ACCOUNTS_SUCCESS,
  payload: accounts,
})

export const loadAccountsError = (): ILoadAccountsErrorAction => ({
  type: LOAD_ACCOUNTS_ERROR,
})

export const loadAccounts = (): AppThunk => async (dispatch) => {
  dataSvc
    .getAccounts()
    .then((data) => {
      dispatch(loadAccountsSuccess(data.accounts))
    })
    .catch((error) => {
      dispatch(loadAccountsError())
      throw error
    })
}

export type AccountActionTypes =
  | ILoadAccountsAction
  | ILoadAccountsSuccessAction
  | ILoadAccountsErrorAction
