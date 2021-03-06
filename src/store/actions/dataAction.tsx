import { Dispatch } from 'redux'
import * as types from '../../constants/actionTypes'
import dataSvc from '../../services/dataSvc'

// loads Data
export function loadData(data: any) {
  return { type: types.LOAD_DATA, data }
}

// loads header Data
export function loadHeaderData(data: any) {
  return { type: types.LOAD_HEADER_DATA, data }
}

// loads OPT Data
export function loadOPTData(data: any) {
  return { type: types.LOAD_OPT_DATA, data }
}

// loads CVV Card Data
export function loadCVVCardData(data: any) {
  return { type: types.LOAD_CVV_CARD_DATA, data }
}

// loads UnLock Questiones Data
export function loadUnLockQuestionesData(data: any) {
  return { type: types.LOAD_UNLOCK_QUESTIONES_DATA, data }
}

// loads Dashboard Header Data
export function loadDashboardHeaderData(data: any) {
  return { type: types.LOAD_DASHBOARD_HEADER_DATA, data }
}

// loads Contact RM Data
export function loadContactRMData(data: any) {
  return { type: types.LOAD_CONTACT_RM_DATA, data }
}

// loads Transaction History Data
export function loadTransactionHistoryData(data: any) {
  return { type: types.LOAD_TRANSACTION_HISTORY_DATA, data }
}

// loads Manage Card Data
export function loadManageCardData(data: any) {
  return { type: types.LOAD_MANAGE_CARD_DATA, data }
}

// loads Manage Profile Data
export function loadManageProfileData(data: any) {
  return { type: types.LOAD_MANAGE_PROFILE_DATA, data }
}

// loads Access Dashboard Data of Manage Access
export function loadManageAccessAccessDashboardData(data: any) {
  return { type: types.LOAD_MANAGE_ACCESS_ACCESS_DASHBOARD_DATA, data }
}

// loads User Lists Data of Manage Access
export function loadManageAccessUserListsData(data: any) {
  return { type: types.LOAD_MANAGE_ACCESS_USER_LISTS_DATA, data }
}

// loads Alert FAQs Data
export function loadAlertFAQsData(data: any) {
  return { type: types.LOAD_ALERT_FAQS_DATA, data }
}

// loads EStatements Data
export function loadEStatementsData(data: any) {
  return { type: types.LOAD_ESTATEMENTS_DATA, data }
}

// loads Finance Manager Data
export function loadFinanceManagerData(data: any) {
  return { type: types.LOAD_FINANCE_MANAGER_DATA, data }
}

// loads Move Payment Data
export function loadMovePaymentData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_DATA, data }
}

// loads Transfer Between Accounts Data of Move Payment
export function loadMovePaymentTransferBetweenAccountsData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_TRANSFER_BETWEEN_ACCOUNTS_DATA, data }
}

// loads Online Transaction Status Data of Move Payment
export function loadMovePaymentOnlineTransactionStatusData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_ONLINE_TRANSACTION_STATUS_DATA, data }
}

// loads Manage Direct Debits Data of Move Payment
export function loadMovePaymentManageDirectDebitsData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_MANAGE_DIRECT_DEBITS_DATA, data }
}

// loads Approve Transactions Data of Move Payment
export function loadMovePaymentApproveTransactionsData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_APPROVE_TRANSACTIONS_DATA, data }
}

// loads Manage Standing Orders Data of Move Payment
export function loadMovePaymentManageStandingOrdersData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_MANAGE_STANDING_ORDERS_DATA, data }
}

// loads ManagePaymentTemplate Data of Move Payment
export function loadMovePaymentManagePaymentTemplateData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_MANAGE_PAYMENT_TEMPLATE_DATA, data }
}

// loads Manage Payees of Move Payment
export function loadMovePaymentManagePayeesData(data: any) {
  return { type: types.LOAD_MOVE_PAYMENT_MANAGE_PAYEES_DATA, data }
}

// save transfer between accounts data
export function saveTransferBetweenAccountsData(data: any) {
  return { type: types.SAVE_TRANSFER_BETWEEN_ACCOUNTS, data }
}

// loads Help Support Data
export function loadHelpSupportData(data: any) {
  return { type: types.LOAD_HELP_SUPPORT_DATA, data }
}

// loads Marketing Preferences Data
export function loadMarketingPreferencesData(data: any) {
  return { type: types.LOAD_MARKETINGPREFERENCES_DATA, data }
}

// get Login Header data
export function getLoginHeaderData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getLoginHeaderData()
      .then((data) => {
        // load data
        dispatch(loadHeaderData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get OPT data
export function getOPTData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getOPTData()
      .then((data) => {
        // load data
        dispatch(loadOPTData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get CVV Card data
export function getCVVCardData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCVVCardData()
      .then((data) => {
        // load data
        dispatch(loadCVVCardData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get UnLock Questiones data
export function getUnLockQuestionesData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getUnLockQuestionesData()
      .then((data) => {
        // load data
        dispatch(loadUnLockQuestionesData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Dashboard Header data
export function getDashboardHeaderData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getDashboardHeaderData()
      .then((data) => {
        // load data
        dispatch(loadDashboardHeaderData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Customer Dashboard data
export function getCustomerDashboardData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCustomerDashboardData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Contact RM data
export function getContactRMData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getContactRMData()
      .then((data) => {
        // load data
        dispatch(loadContactRMData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Accounts Dashboard data
export function getAccountsDashboardData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAccountsDashboardData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Transaction History data
export function getTransactionHistoryData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getTransactionHistoryData()
      .then((data) => {
        // load data
        dispatch(loadTransactionHistoryData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Manage Card data
export function getManageCardData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getManageCardData()
      .then((data) => {
        // load data
        dispatch(loadManageCardData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Manage Profile data
export function getManageProfileData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getManageProfileData()
      .then((data) => {
        // load data
        dispatch(loadManageProfileData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Access Dashboard data of Manage Access
export function getManageAccessAccessDashboardData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getManageAccessAccessDashboardData()
      .then((data) => {
        // load data
        dispatch(loadManageAccessAccessDashboardData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get User Lists data of Manage Access
export function getManageAccessUserListsData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getManageAccessUserListsData()
      .then((data) => {
        // load data
        dispatch(loadManageAccessUserListsData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Alert FAQs data
export function getAlertFAQsData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAlertFAQsData()
      .then((data) => {
        // load data
        dispatch(loadAlertFAQsData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}
// get EStatements data
export function getEStatementsData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getEStatementsData()
      .then((data) => {
        // load data
        dispatch(loadEStatementsData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Finance Manager data
export function getFinanceManagerData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getFinanceManagerData()
      .then((data) => {
        // load data
        dispatch(loadFinanceManagerData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Move Payment data
export function getMovePaymentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Transfer Between Accounts data of Move Payment
export function getMovePaymentTransferBetweenAccountsData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentTransferBetweenAccountsData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentTransferBetweenAccountsData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Online Transaction Status data of Move Payment
export function getMovePaymentOnlineTransactionStatusData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentOnlineTransactionStatusData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentOnlineTransactionStatusData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Manage Direct Debits data of Move Payment
export function getMovePaymentManageDirectDebitsData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentManageDirectDebitsData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentManageDirectDebitsData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Approve Transactions data of Move Payment
export function getMovePaymentApproveTransactionsData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentApproveTransactionsData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentApproveTransactionsData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Manage Standing Orders data of Move Payment
export function getMovePaymentManageStandingOrdersData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentManageStandingOrdersData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentManageStandingOrdersData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Manage Payment Template data of Move Payment
export function getMovePaymentManagePaymentTemplateData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentManagePaymentTemplateData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentManagePaymentTemplateData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Manage Payees of Move Payment
export function getMovePaymentManagePayeesData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMovePaymentManagePayeesData()
      .then((data) => {
        // load data
        dispatch(loadMovePaymentManagePayeesData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Help Support data
export function getHelpSupportData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHelpSupportData()
      .then((data) => {
        // load data
        dispatch(loadHelpSupportData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Login data
export function getLoginData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getLoginData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Registration data
export function getRegistrationData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getRegistrationData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Recover User data
export function getRecoverUserData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getRecoverUserData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Reset Passcode data
export function getResetPasscodeData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getResetPasscodeData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// get Service Error data
export function getServiceErrorData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getServiceErrorData()
      .then((data) => {
        // load data
        dispatch(loadData(data))
      })
      .catch((error) => {
        throw error
      })
  }
}

// save transfer between accounts data
export function saveTransferBetweenAccounts(data: any) {
  return function func(dispatch: Dispatch) {
    dispatch(saveTransferBetweenAccountsData(data))
  }
}

export default {
  getLoginHeaderData,
  getOPTData,
  getCVVCardData,
  getUnLockQuestionesData,
  getDashboardHeaderData,
  getCustomerDashboardData,
  getContactRMData,
  getAccountsDashboardData,
  getTransactionHistoryData,
  getManageCardData,
  getManageProfileData,
  getManageAccessAccessDashboardData,
  getManageAccessUserListsData,
  getAlertFAQsData,
  getEStatementsData,
  getFinanceManagerData,
  getMovePaymentData,
  getMovePaymentTransferBetweenAccountsData,
  getMovePaymentOnlineTransactionStatusData,
  getMovePaymentManageDirectDebitsData,
  getMovePaymentApproveTransactionsData,
  getMovePaymentManageStandingOrdersData,
  getMovePaymentManagePaymentTemplateData,
  saveTransferBetweenAccounts,
  getHelpSupportData,
  getLoginData,
  getRegistrationData,
  getRecoverUserData,
  getResetPasscodeData,
  getServiceErrorData,
}
