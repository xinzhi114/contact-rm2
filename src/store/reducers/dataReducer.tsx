import * as types from '../../constants/actionTypes'

const defaultState = {
  db: {},
}

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case types.LOAD_DATA:
      return {
        ...state,
        db: action.data,
      }
    case types.LOAD_HEADER_DATA:
      return {
        ...state,
        headerDB: action.data,
      }
    case types.LOAD_OPT_DATA:
      return {
        ...state,
        opt: action.data,
      }
    case types.LOAD_CVV_CARD_DATA:
      return {
        ...state,
        cvvCard: action.data,
      }
    case types.LOAD_UNLOCK_QUESTIONES_DATA:
      return {
        ...state,
        unLockQuestiones: action.data,
      }
    case types.LOAD_DASHBOARD_HEADER_DATA:
      return {
        ...state,
        dashboardHeader: action.data,
      }
    case types.LOAD_CONTACT_RM_DATA:
      return {
        ...state,
        contactRM: action.data,
      }
    case types.LOAD_TRANSACTION_HISTORY_DATA:
      return {
        ...state,
        transactionHistory: action.data,
      }
    case types.LOAD_MANAGE_CARD_DATA:
      return {
        ...state,
        manageCard: action.data,
      }
    case types.LOAD_MANAGE_PROFILE_DATA:
      return {
        ...state,
        manageProfile: action.data,
      }
    case types.LOAD_MANAGE_ACCESS_ACCESS_DASHBOARD_DATA:
      return {
        ...state,
        manageAccessAccessDashboard: action.data,
      }
    case types.LOAD_MANAGE_ACCESS_USER_LISTS_DATA:
      return {
        ...state,
        manageAccessUserLists: action.data,
      }
    case types.LOAD_ALERT_FAQS_DATA:
      return {
        ...state,
        alertFAQs: action.data,
      }
    case types.LOAD_ESTATEMENTS_DATA:
      return {
        ...state,
        eStatements: action.data,
      }
    case types.LOAD_FINANCE_MANAGER_DATA:
      return {
        ...state,
        financeManager: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_DATA:
      return {
        ...state,
        movePayment: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_TRANSFER_BETWEEN_ACCOUNTS_DATA:
      return {
        ...state,
        movePaymentTransferBetweenAccounts: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_ONLINE_TRANSACTION_STATUS_DATA:
      return {
        ...state,
        movePaymentOnlineTransactionStatus: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_MANAGE_DIRECT_DEBITS_DATA:
      return {
        ...state,
        movePaymentManageDirectDebits: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_APPROVE_TRANSACTIONS_DATA:
      return {
        ...state,
        movePaymentApproveTransactions: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_MANAGE_STANDING_ORDERS_DATA:
      return {
        ...state,
        movePaymentManageStandingOrders: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_MANAGE_PAYMENT_TEMPLATE_DATA:
      return {
        ...state,
        movePaymentManagePaymentTemplate: action.data,
      }
    case types.LOAD_MOVE_PAYMENT_MANAGE_PAYEES_DATA:
      return {
        ...state,
        movePaymentManagePayees: action.data,
      }
    case types.SAVE_TRANSFER_BETWEEN_ACCOUNTS:
      return {
        ...state,
        transferBetweenAccounts: action.data,
      }
    case types.LOAD_HELP_SUPPORT_DATA:
      return {
        ...state,
        helpSupport: action.data,
      }
    case types.LOAD_MARKETINGPREFERENCES_DATA:
      return {
        ...state,
        marketingPreferences: action.data,
      }
    default:
      return state
  }
}
