/**
 * Help state
 */
import { ContactCallRsp, FAQRsp, RegionalOfficeRsp } from '../../common/Api/Domains/rsp/HelpRsp'
import { HelpActionTypes, LOAD_HELP_SUPPORT } from '../actions/faq'

export interface HelpState {
  FAQ?: FAQRsp[]
  call?: ContactCallRsp[]
  offices?: RegionalOfficeRsp[]
}

/**
 * help state reducer
 * @param state the previous state
 * @param action the action with data
 */
export default function helpReducer(state: HelpState = {}, action: HelpActionTypes): HelpState {
  if (action.type === LOAD_HELP_SUPPORT) {
    return { ...state, ...action.payload }
  } else {
    return state
  }
}
