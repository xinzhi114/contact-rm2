import { META } from './config'
import Index from './containers/Index'
import { LoginAndRecoverUserID } from './containers/AuthenticationPages/LoginAndRecoverUserID'
import { RegistrationAndResetPasscode } from './containers/AuthenticationPages/RegistrationAndResetPasscode'
import { GetOdysseyMobileApp } from './containers/AuthenticationPages/GetOdysseyMobileApp'
import CustomerDashboard from './containers/CustomerDashboard'
import ContactRM from './containers/ContactRM'
import BookAppointment from './containers/BookAppointment'
import AccountsDashboard from './containers/AccountsDashboard'
import ManageCard from './containers/ManageCard'
import ManageProfile from './containers/ManageProfile'
import AccessDashboard from './containers/ManageAccess/AccessDashboard'
import UserLists from './containers/ManageAccess/UserLists'
import TransactionHistoryPage from './containers/TransactionHistory'
import { ManageAlerts } from './containers/ManageAlerts'
import { ManageAlertsDetails } from './containers/ManageAlertsDetails'
import AlertFAQs from './containers/AlertFAQs'
import MovePaymentHome from './containers/MovePaymentPages/MovePaymentHome'
import TransferBetweenAccounts from './containers/MovePaymentPages/TransferBetweenAccounts'
import OnlineTransactionStatus from './containers/MovePaymentPages/OnlineTransactionStatus'
import ManageDirectDebits from './containers/MovePaymentPages/ManageDirectDebits'
import ManagePaymentTemplate from './containers/MovePaymentPages/ManagePaymentTemplate'
import ApproveTransactions from './containers/MovePaymentPages/ApproveTransactions'
import ManageStandingOrders from './containers/MovePaymentPages/ManageStandingOrders'
import EStatements from './containers/EStatements'
import FinanceManager from './containers/FinanceManager'
import HelpSupport from './containers/HelpSupport'
import MarketingPreferences from './containers/MarketingPreferences'
import DocumentRepository from './containers/DocumentRepository'
import { ManagePayees } from './containers/MovePaymentPages/ManagePayees'
import { AddPayee } from './containers/MovePaymentPages/AddPayee'
import { MakeAPayment } from './containers/MovePaymentPages/MakeAPayment'

/**
 * Generate an object with all necessary fields to render a page.
 * @param {string} path - The page path
 * @param {string} title - THe page title (for SEO)
 * @param {Function} component - The component to be rendered. Containers can also be used
 * @param {string} description - The page description (for SEO) [OPTIONAL]
 * @param {string} keywords - The comma separated page keywords (for SEO) [OPTIONAL]
 * @returns {object}
 */
export const createPage = (
  path: any,
  title: any,
  component: any,
  description?: any,
  keywords?: any
) => ({
  path,
  title: `${title} | ${META.PAGE_TITLE_SUFFIX}`,
  component,
  description: description || META.PAGE_DESCRIPTION,
  keywords: keywords || META.PAGE_KEYWORDS,
})

export default [
  createPage('/', 'LoginAndRecoverUserID', LoginAndRecoverUserID),
  createPage('/login/:pageState', 'Login', LoginAndRecoverUserID),
  createPage('/registration', 'Registration', RegistrationAndResetPasscode),
  createPage('/resetPasscode', 'ResetPasscode', RegistrationAndResetPasscode),
  createPage('/recoverUserID', 'LoginAndRecoverUserID', LoginAndRecoverUserID),
  createPage('/accountLocked', 'AccountLocked', RegistrationAndResetPasscode),
  createPage('/getMobileApp', 'GetOdysseyMobileApp', GetOdysseyMobileApp),
  createPage('/customerDashboard', 'CustomerDashboard', CustomerDashboard),
  createPage('/contactRM', 'ContactRM', ContactRM),
  createPage('/contactRM/BookAppointment', 'BookAppointment', BookAppointment),
  createPage('/accountsDashboard', 'AccountsDashboard', AccountsDashboard),
  createPage('/accountsDashboard/:accountType', 'AccountsDashboard', AccountsDashboard),
  createPage(
    '/accountsDashboardPage/transactionHistory',
    'TransactionHistoryPage',
    TransactionHistoryPage
  ),
  createPage('/accountsDashboardPage/manageCard/:currentIndex', 'ManageCard', ManageCard),
  createPage('/accountsDashboardPage/manageProfile', 'ManageProfile', ManageProfile),
  createPage('/manageAccess/accessDashboard', 'AccessDashboard', AccessDashboard),
  createPage('/manageAccess/userLists/:currentIndex', 'UserLists', UserLists),
  createPage('/documentRepository', 'DocumentRepository', DocumentRepository),
  createPage('/alerts/manageAlerts', 'ManageAlerts', ManageAlerts),
  createPage('/alerts/manageAlertsDetails/:tabIndex', 'ManageAlertsDetails', ManageAlertsDetails),
  createPage('/alerts/alertFAQs', 'AlertFAQs', AlertFAQs),
  createPage('/movePaymentPages', 'MovePaymentHome', MovePaymentHome),
  createPage(
    '/movePaymentPages/transferBetweenAccounts',
    'TransferBetweenAccounts',
    TransferBetweenAccounts
  ),
  createPage(
    '/movePaymentPages/onlineTransactionStatus',
    'OnlineTransactionStatus',
    OnlineTransactionStatus
  ),
  createPage('/movePaymentPages/manageDirectDebits', 'ManageDirectDebits', ManageDirectDebits),
  createPage('/movePaymentPages/makeAPayment', 'MakeAPayment', MakeAPayment),
  createPage(
    '/movePaymentPages/managePaymentTemplate',
    'ManagePaymentTemplate',
    ManagePaymentTemplate
  ),
  createPage('/movePaymentPages/approveTransactions', 'ApproveTransactions', ApproveTransactions),
  createPage(
    '/movePaymentPages/manageStandingOrders',
    'ManageStandingOrders',
    ManageStandingOrders
  ),
  createPage('/movePaymentPages/managePayees', 'ManagePayees', ManagePayees),
  createPage('/movePaymentPages/managePayees/addPayee', 'AddPayee', AddPayee),
  createPage('/eStatements', 'EStatements', EStatements),
  createPage('/financeManager', 'FinanceManager', FinanceManager),
  createPage('/helpSupport/:tabIndex', 'HelpSupport', HelpSupport),
  createPage('/marketingPreferences', 'MarketingPreferences', MarketingPreferences),
  createPage('/indexPage', 'Index', Index),
]
