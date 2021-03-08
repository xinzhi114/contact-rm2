import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../store/actions/dataAction'

class Index extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to="/">Login</NavLink>
        </li>
        <li>
          <NavLink to="/login/showResetMessage">Login ShowResetMessage</NavLink>
        </li>
        <li>
          <NavLink to="/login/unlockAccount">Login UnlockAccount</NavLink>
        </li>
        <li>
          <NavLink to="/login/showNewUserMessage">Login ShowNewUserMessage</NavLink>
        </li>
        <li>
          <NavLink to="/firstLogin">FirstLogin</NavLink>
        </li>
        <li>
          <NavLink to="/registration">Registration</NavLink>
        </li>
        <li>
          <NavLink to="/resetPasscode">ResetPasscode</NavLink>
        </li>
        <li>
          <NavLink to="/recoverUserID">RecoverUserID</NavLink>
        </li>
        <li>
          <NavLink to="/accountLocked">AccountLocked</NavLink>
        </li>
        <li>
          <NavLink to="/unLockMessages/true">UnLockMessages True</NavLink>
        </li>
        <li>
          <NavLink to="/unLockMessages/false">UnLockMessages False</NavLink>
        </li>
        <li>
          <NavLink to="/serviceError">ServiceError</NavLink>
        </li>
        <li>
          <NavLink to="/customerDashboard">CustomerDashboard</NavLink>
        </li>
        <li>
          <NavLink to="/contactRM">Contact RM</NavLink>
        </li>
        <li>
          <NavLink to="/contactRM/BookAppointment">Book Appointment</NavLink>
        </li>
        <li>
          <NavLink to="/accountsDashboard">AccountsDashboard</NavLink>
        </li>
        <li>
          <NavLink to="/accountsDashboardPage/transactionHistory">
            AccountsDashboard - Transaction History
          </NavLink>
        </li>
        <li>
          <NavLink to="/accountsDashboardPage/manageCard/0">
            AccountsDashboard - Manage Card - 0
          </NavLink>
        </li>
        <li>
          <NavLink to="/accountsDashboardPage/manageProfile">
            AccountsDashboard - Manage Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/manageAccess/accessDashboard">ManageAccess - Access Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/manageAccess/userLists/0">ManageAccess - User Lists - 0</NavLink>
        </li>
        <li>
          <NavLink to="/alerts/manageAlerts">ManageAlerts</NavLink>
        </li>
        <li>
          <NavLink to="/alerts/manageAlertsDetails/0">ManageAlertsDetails/0</NavLink>
        </li>
        <li>
          <NavLink to="/alerts/manageAlertsDetails/1">ManageAlertsDetails/1</NavLink>
        </li>
        <li>
          <NavLink to="/alerts/manageAlertsDetails/2">ManageAlertsDetails/2</NavLink>
        </li>
        <li>
          <NavLink to="/alerts/alertFAQs">AlertFAQs</NavLink>
        </li>
        <li>
          <NavLink to="/eStatements">EStatements</NavLink>
        </li>
        <li>
          <NavLink to="/financeManager">Finance Manager</NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages">MovePayment</NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/transferBetweenAccounts">
            MovePayment/TransferBetweenAccounts
          </NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/onlineTransactionStatus">
            MovePayment/OnlineTransactionStatus
          </NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/manageDirectDebits">
            MovePayment/ManageDirectDebits
          </NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/managePaymentTemplate">
            MovePayment/ManagePaymentTemplate
          </NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/approveTransactions">
            MovePayment/ApproveTransactions
          </NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/manageStandingOrders">
            MovePayment/ManageStandingOrders
          </NavLink>
        </li>
        <li>
          <NavLink to="/helpSupport/0">Help Support/0</NavLink>
        </li>
        <li>
          <NavLink to="/helpSupport/1">Help Support/1</NavLink>
        </li>
        <li>
          <NavLink to="/helpSupport/2">Help Support/2</NavLink>
        </li>
        <li>
          <NavLink to="/marketingPreferences">Marketing Preferences</NavLink>
        </li>

        <li>
          <NavLink to="/documentRepository">Document Repository</NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/managePayees">Manage Payees</NavLink>
        </li>
        <li>
          <NavLink to="/movePaymentPages/managePayees/addPayee">Manage Payees - Add Payee</NavLink>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(Index)
