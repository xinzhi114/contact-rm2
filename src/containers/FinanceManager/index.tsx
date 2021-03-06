import React, { Component } from 'react'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import FinanceTab from '../../components/FinanceManagerComponents/FinanceTab'
import TabAccountAggregation from '../../components/FinanceManagerComponents/TabAccountAggregation'
import TabIncomeOutgoings from '../../components/FinanceManagerComponents/TabIncomeOutgoings'
import TabSpending from '../../components/FinanceManagerComponents/TabSpending'
import TabBudgeting from '../../components/FinanceManagerComponents/TabBudgeting'
import ActivityDetection from '../../components/ActivityDetection'
import { withTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import './styles.scss'
import {
  loadAggregation,
  loadBudget,
  loadIncomeAndOutgoing,
  loadSpending,
} from '../../store/actions/pfm'
import { Aggregation } from '../../domain/Aggregation'
import { Spending, SpendingTransaction } from '../../domain/Spending'
import { InComeOutGoing } from '../../domain/InComeOutGoing'
import { Budget } from '../../domain/Budget'
import { AccountProfile } from '../../domain/AccountProfile'

interface IFinanceManagerProps {
  t: any
  financeManager: {
    dataList?: {
      accountProfile: AccountProfile
    }
  }
  dataAction?: any
  pfmActions: any
  aggregations?: Aggregation[]
  spending?: Spending[]
  spendingTransactions: Record<string, SpendingTransaction>
  incomeAndOutgoing?: InComeOutGoing
  budget?: Budget
}

interface IFinanceManagerState {
  individualBusiness: string
  currentTabIndex: number
  accountSelection: string
  timelineSelection: string
  currencySelection: string
}

const tabArray = ['Account Aggregation', 'Income & Outgoings', 'Spending', 'Budgeting']
export class FinanceManager extends Component<IFinanceManagerProps, IFinanceManagerState> {
  constructor(props: any) {
    super(props)
    this.state = {
      accountSelection: 'test',
      currencySelection: 'test',
      timelineSelection: 'test',
      individualBusiness: 'individual',
      currentTabIndex: 0,
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    this.props.dataAction.getFinanceManagerData()
    this.props.pfmActions.loadAggregation()
  }

  componentWillUnmount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.remove('dashboard')
    // fix Warning: Can't perform a React state update on an unmounted component
    /* istanbul ignore next */
    this.setState = () => {
      // return
    }
  }

  changeIndividualBusiness(accountType: string) {
    if (accountType === 'individual' || accountType === 'business') {
      this.setState({
        individualBusiness: accountType,
      })
    }
  }

  // click Tab
  clickTab(tabName: string) {
    let tempIndex = 0
    tabArray.forEach((item, index) => {
      if (item === tabName) {
        tempIndex = index
      }
    })
    this.setState({
      currentTabIndex: tempIndex,
    })
  }

  render() {
    const { dataList } = { ...this.props.financeManager }
    const { currentTabIndex } = { ...this.state }

    if (this.state.individualBusiness !== 'individual') {
      return <Redirect to="/customerDashboard" />
    }

    return (
      <React.Fragment>
        <DashboardLeftSidebar
          title="Finance Manager"
          desktopShownIcon="Alerts"
          mobileShownIcon="Menu"
          showDemoLink={false}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
        />

        <div className="content finance-manager-content">
          <FinanceTab
            tabArray={tabArray}
            currentTabIndex={tabArray[currentTabIndex]}
            accountProfile={dataList?.accountProfile}
            clickTab={(tabName: string) => this.clickTab(tabName)}
          />
          <div className="mains">
            <ActivityDetection />

            {!this.props.aggregations && (
              <div className="tip-txt">{this.props.t('common.loading')}</div>
            )}
            {this.props.aggregations && (
              <React.Fragment>
                {currentTabIndex === 0 && (
                  <TabAccountAggregation
                    accountProfile={dataList?.accountProfile}
                    aggregations={this.props.aggregations}
                  />
                )}

                {currentTabIndex === 1 && (
                  <TabIncomeOutgoings
                    incomeAndOutgoing={this.props.incomeAndOutgoing}
                    aggregations={this.props.aggregations}
                    pfmActions={this.props.pfmActions}
                    accountProfile={dataList?.accountProfile}
                  />
                )}

                {currentTabIndex === 2 && (
                  <TabSpending
                    aggregations={this.props.aggregations}
                    pfmActions={this.props.pfmActions}
                    spending={this.props.spending}
                    accountProfile={dataList?.accountProfile}
                  />
                )}

                {currentTabIndex === 3 && (
                  <TabBudgeting
                    aggregations={this.props.aggregations}
                    pfmActions={this.props.pfmActions}
                    budget={this.props.budget}
                    accountProfile={dataList?.accountProfile}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer, ...state.FMReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  pfmActions: bindActionCreators(
    {
      loadAggregation,
      loadSpending,
      loadIncomeAndOutgoing,
      loadBudget,
    },
    dispatch
  ),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(compose<any>(withTranslation())(FinanceManager))
