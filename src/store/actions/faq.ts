import { Dispatch } from 'redux'
import { ContactCallRsp, FAQRsp, RegionalOfficeRsp } from '../../common/Api/Domains/rsp/HelpRsp'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'
import { DrupalHelpService } from '../../common/Api/Services/DrupalHelpService'
import { showErrorMsg } from '../../components/Toast'

export const LOAD_HELP_SUPPORT = 'LOAD_HELP_SUPPORT'

/**
 * load help and support
 */
interface LoadHelpSupport {
  type: typeof LOAD_HELP_SUPPORT
  payload: {
    FAQ: FAQRsp[]
    call: ContactCallRsp[]
    offices: RegionalOfficeRsp[]
  }
}

/**
 * load drupal help content
 */
export function loadDrupalHelpContent() {
  return (dispatch: Dispatch) => {
    ASF.getService(DrupalHelpService)
      .loadContent()
      .then((rsp) => {
        dispatch({ type: LOAD_HELP_SUPPORT, payload: rsp })
      })
      .catch((e) => showErrorMsg(e))
  }
}

export type HelpActionTypes = LoadHelpSupport
