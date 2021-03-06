import { Middleware } from 'redux'
import firebase from 'firebase/app'
import * as _ from 'lodash'
import * as AnalyticsActions from '../actions/analytics'
import * as AuthActions from '../actions/auth'

const logEvent = (event: string, data?: any) => {
  if (firebase.apps.length > 0) {
    firebase.analytics().logEvent(event as any, data)
  }
}

const ACTION_TO_EVENT_MAP = _.invert({
  login: AuthActions.LOGIN_SUCCESS,
  change_screen: AnalyticsActions.CHANGE_SCREEN,
})

export const firebaseMiddleware: Middleware = () => (next) => (action) => {
  const eventKey = ACTION_TO_EVENT_MAP[action.type]
  if (eventKey) {
    logEvent(eventKey, action.payload)
  }
  return next(action)
}
