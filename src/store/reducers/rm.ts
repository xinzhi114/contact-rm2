import { LOAD_RM, RMActionTypes } from '../actions/rm'
import { RMInfoRSP } from '../../common/Api/Domains/rsp/RMRsp'

export interface RMState {
  rm?: RMInfoRSP
}

const defaultState: RMState = {}

/**
 * RM state reducer
 * @param state the previous state
 * @param action the action with data
 */
export default function RMReducer(state = defaultState, action: RMActionTypes): RMState {
  if (action.type === LOAD_RM) {
    return { ...state, rm: action.payload }
  } else {
    return state
  }
}
