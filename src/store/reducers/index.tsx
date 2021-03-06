import { combineReducers } from 'redux'
import { IAppState } from '../constants'
import dataReducer from './dataReducer'
import FMReducer from './pfm'
import paymentReducer from './payment'
import accountReducer from './account'
import authReducer from './auth'
import alertsReducer from './alerts'
import helpReducer from './faq'
import RMReducer from './rm'

const allReducers = combineReducers<IAppState>({
  dataReducer,
  payment: paymentReducer,
  account: accountReducer,
  auth: authReducer,
  alerts: alertsReducer,
  FMReducer,
  faq: helpReducer,
  rm: RMReducer,
})

export default allReducers
