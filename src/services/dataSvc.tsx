import axios from 'axios'
import { ILoadAccountsResponse } from '../constants/account'
import { ILoadAlertsDashboardDataResponse } from '../constants/alerts'
import { ILoadRecentPaymentsResponse } from '../constants/payment'

const axiosInstance = axios.create({
  baseURL: '/data',
})

// data service
export default class DataSvc {
  static async getLoginHeaderData() {
    const response = await axiosInstance.get('/dataLoginHeader.json')
    return response.data
  }

  static async getOPTData() {
    const response = await axiosInstance.get('/dataOPT.json')
    return response.data
  }

  static async getCVVCardData() {
    const response = await axiosInstance.get('/dataCVVCard.json')
    return response.data
  }

  static async getUnLockQuestionesData() {
    const response = await axiosInstance.get('/dataUnLockQuestiones.json')
    return response.data
  }

  static async getDashboardHeaderData() {
    const response = await axiosInstance.get('/dataDashboardHeader.json')
    return response.data
  }

  static async getCustomerDashboardData() {
    const response = await axiosInstance.get('/dataCustomerDashboard.json')
    return response.data
  }

  static async getContactRMData() {
    let jsonUrl = ''

    if (Math.round(Math.random() * 2) >= 1) {
      jsonUrl = '/dataContactRMHasData.json'
    } else {
      jsonUrl = '/dataContactRMNoData.json'
    }

    const response = await axiosInstance.get(jsonUrl)
    return response.data
  }

  static async getAccountsDashboardData() {
    const response = await axiosInstance.get('/dataAccountsDashboard.json')
    return response.data
  }

  static async getAlertsDashboardData() {
    const response = await axiosInstance.get<ILoadAlertsDashboardDataResponse>(
      '/dataAlertsDashboard.json'
    )
    return response.data
  }

  static async getTransactionHistoryData() {
    const dataMockupType = Math.round(Math.random() * 2)
    const response = await axiosInstance.get(`/dataTransactionHistory-${dataMockupType}.json`)
    return response.data
  }

  static async getManageCardData() {
    const response = await axiosInstance.get('/dataManageCard.json')
    return response.data
  }

  static async getManageProfileData() {
    const response = await axiosInstance.get('/dataManageProfile.json')
    return response.data
  }

  static async getManageAccessAccessDashboardData() {
    const response = await axiosInstance.get('/dataManageAccessAccessDashboard.json')
    return response.data
  }

  static async getManageAccessUserListsData() {
    const response = await axiosInstance.get('/dataManageAccessUserLists.json')
    return response.data
  }

  static async getAlertFAQsData() {
    const response = await axiosInstance.get('/dataAlertFAQs.json')
    return response.data
  }

  static async getEStatementsData() {
    const response = await axiosInstance.get('/dataEStatements.json')
    return response.data
  }

  static async getFinanceManagerData() {
    const response = await axiosInstance.get('/dataFinanceManager.json')
    return response.data
  }

  static async getMovePaymentData() {
    const response = await axiosInstance.get('/dataMovePayment.json')
    return response.data
  }

  static async getMovePaymentTransferBetweenAccountsData() {
    const response = await axiosInstance.get('/dataMovePaymentTransferBetweenAccounts.json')
    return response.data
  }

  static async getMovePaymentOnlineTransactionStatusData() {
    const response = await axiosInstance.get('/dataMovePaymentOnlineTransactionStatus.json')
    return response.data
  }

  static async getMovePaymentManageDirectDebitsData() {
    const response = await axiosInstance.get('/dataMovePaymentManageDirectDebits.json')
    return response.data
  }

  static async getMovePaymentApproveTransactionsData() {
    const response = await axiosInstance.get('/dataMovePaymentApproveTransactions.json')
    return response.data
  }

  static async getMovePaymentManageStandingOrdersData() {
    const response = await axiosInstance.get('/dataMovePaymentManageStandingOrders.json')
    return response.data
  }

  static async getMovePaymentManagePaymentTemplateData() {
    const response = await axiosInstance.get('/dataMovePaymentManagePaymentTemplate.json')
    return response.data
  }

  static async getMovePaymentManagePayeesData() {
    const response = await axiosInstance.get('/dataMovePaymentManagePayees.json')
    return response.data
  }

  static async getHelpSupportData() {
    const response = await axiosInstance.get('/dataHelpSupport.json')
    return response.data
  }

  static async getLoginData() {
    const response = await axiosInstance.get('/dataLogin.json')
    return response.data
  }

  static async getRegistrationData() {
    const response = await axiosInstance.get('/dataRegistration.json')
    return response.data
  }

  static async getRecoverUserData() {
    const response = await axiosInstance.get('/dataRecoverUser.json')
    return response.data
  }

  static async getResetPasscodeData() {
    const response = await axiosInstance.get('/dataResetPasscode.json')
    return response.data
  }

  static async getServiceErrorData() {
    const response = await axiosInstance.get('/dataServiceError.json')
    return response.data
  }

  static async getRecentPayments(domestic: boolean) {
    const response = await axiosInstance.get<ILoadRecentPaymentsResponse>(
      domestic ? '/dataRecentPayments.json' : '/dataRecentPaymentsInternational.json'
    )
    return response.data
  }

  static async getAccounts() {
    const response = await axiosInstance.get<ILoadAccountsResponse>('/dataAccounts.json')
    return response.data
  }
}
