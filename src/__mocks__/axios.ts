import dataLoginHeader from './data/dataLogin'
import dataOPT from './data/dataOPT'
import dataUnLockQuestiones from './data/dataUnLockQuestiones'
import dataDashboardHeader from './data/dataDashboardHeader'
import dataCustomerDashboard from './data/dataCustomerDashboard'
import dataAccountsDashboard from './data/dataAccountsDashboard'
import dataTransactionHistory from './data/dataTransactionHistory'
import dataManageCard from './data/dataManageCard'
import dataManageAlerts from './data/dataManageAlerts'
import dataAlertFAQs from './data/dataAlertFAQs'
import dataManageAlertsDetails from './data/dataManageAlertsDetails'
import dataRegistration from './data/dataRegistration'
import dataRecoverUser from './data/dataRecoverUser'
import dataResetPasscode from './data/dataResetPasscode'
import dataServiceError from './data/dataServiceError'
import dataRecentPayments from './data/dataRecentPayments'
import dataRecentPaymentsInternational from './data/dataRecentPaymentsInternational'
import dataAccounts from './data/dataAccounts'

const axios: {
  create: () => void
  AxiosInstance: any
} = jest.genMockFromModule('axios')

const getFunc = jest.fn((path) => {
  switch (path) {
    case '/dataLoginHeader.json':
      return Promise.resolve({ data: dataLoginHeader })
    case '/dataOPT.json':
      return Promise.resolve({ data: dataOPT })
    case '/dataUnLockQuestiones.json':
      return Promise.resolve({ data: dataUnLockQuestiones })
    case '/dataDashboardHeader.json':
      return Promise.resolve({ data: dataDashboardHeader })
    case '/dataCustomerDashboard.json':
      return Promise.resolve({ data: dataCustomerDashboard })
    case '/dataAccountsDashboard.json':
      return Promise.resolve({ data: dataAccountsDashboard })
    case '/dataTransactionHistory.json':
      return Promise.resolve({ data: dataTransactionHistory })
    case '/dataManageCard.json':
      return Promise.resolve({ data: dataManageCard })
    case '/dataManageAlerts.json':
      return Promise.resolve({ data: dataManageAlerts })
    case '/dataAlertFAQs.json':
      return Promise.resolve({ data: dataAlertFAQs })
    case '/dataManageAlertsDetails.json':
      return Promise.resolve({ data: dataManageAlertsDetails })
    case '/dataLogin.json':
      return Promise.resolve({ data: dataLoginHeader })
    case '/dataRegistration.json':
      return Promise.resolve({ data: dataRegistration })
    case '/dataRecoverUser.json':
      return Promise.resolve({ data: dataRecoverUser })
    case '/dataResetPasscode.json':
      return Promise.resolve({ data: dataResetPasscode })
    case '/dataServiceError.json':
      return Promise.resolve({ data: dataServiceError })
    case '/dataRecentPayments.json':
      return Promise.resolve({ data: dataRecentPayments })
    case '/dataRecentPaymentsInternational.json':
      return Promise.resolve({ data: dataRecentPaymentsInternational })
    case '/dataAccounts.json':
      return Promise.resolve({ data: dataAccounts })
    default:
      return Promise.resolve({ data: {} })
  }
})

const postFunc = jest.fn((path) => {
  if (path === '/configure/add_public_cred') {
    return Promise.resolve({
      status: 'success',
      base64Key: `
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsjtGIk8SxD+OEiBpP2/T
JUAF0upwuKGMk6wH8Rwov88VvzJrVm2NCticTk5FUg+UG5r8JArrV4tJPRHQyvqK
wF4NiksuvOjv3HyIf4oaOhZjT8hDne1Bfv+cFqZJ61Gk0MjANh/T5q9vxER/7TdU
NHKpoRV+NVlKN5bEU/NQ5FQjVXicfswxh6Y6fl2PIFqT2CfjD+FkBPU1iT9qyJYH
A38IRvwNtcitFgCeZwdGPoxiPPh1WHY8VxpUVBv/2JsUtrB/rAIbGqZoxAIWvijJ
Pe9o1TY3VlOzk9ASZ1AeatvOir+iDVJ5OpKmLnzc46QgGPUsjIyo6Sje9dxpGtoG
QQIDAQAB
      `,
    })
  }
  return Promise.resolve({ data: {} })
})

const networkError = jest.fn(() => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('error')
})

const selectedCreate: any = {
  get: getFunc,
  post: postFunc,
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
}
axios.create = () => selectedCreate
;(axios as any).switchToNetworkError = () => {
  selectedCreate.post = networkError
  selectedCreate.get = networkError
}
;(axios as any).switchToNetworkSuccess = () => {
  selectedCreate.post = postFunc
  selectedCreate.get = getFunc
}

axios.AxiosInstance = {}

export default axios
