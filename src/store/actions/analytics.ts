export const CHANGE_SCREEN = '[ANALYTICS] CHANGE_SCREEN'

export interface IChangeScreenAction {
  type: typeof CHANGE_SCREEN
  payload: {
    pathname: string
  }
}

export const changeScreen = (screenId: string): IChangeScreenAction => ({
  type: CHANGE_SCREEN,
  payload: {
    pathname: screenId,
  },
})

export type AnalyticsActionTypes = IChangeScreenAction

export default {
  changeScreen,
}
