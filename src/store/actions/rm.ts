import { Dispatch } from 'redux'
import { storageService } from '../../services/Util'
import { User } from '../../domain/User'
import { API_AUTH_USER_KEY } from '../../common/Api/config'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'
import { RMService } from '../../common/Api/Services/RMService'
import { showErrorMsg } from '../../components/Toast'
import { globalT } from '../../i18n'
import { RMInfoRSP } from '../../common/Api/Domains/rsp/RMRsp'

export const LOAD_RM = 'LOAD_RM'

interface LoadRM {
  type: typeof LOAD_RM
  payload: RMInfoRSP
}

/**
 * load relationship manager
 */
export function loadRM() {
  return (dispatch: Dispatch) => {
    // get authed user info
    storageService.getData<User>(API_AUTH_USER_KEY).then((user) => {
      if (user) {
        ASF.getService(RMService)
          .getRMDetails({ customerUniqueIdentifier: user.userId })
          .then((rsp) => {
            dispatch({ type: LOAD_RM, payload: { ...rsp.body } })
          })
          .catch((e) => showErrorMsg(e))
      } else {
        showErrorMsg(globalT('error.user_request_failed'))
      }
    })
  }
}

export type RMActionTypes = LoadRM
