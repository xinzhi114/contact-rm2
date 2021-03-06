import React, { Component } from 'react'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import ActivityDetection from '../../components/ActivityDetection'
import DashboardRelationshipManager from '../../components/DashboardRelationshipManager'
import DashboardFinanceManager from '../../components/HomeComponents/DashboardFinanceManager'
import AccountsTab from '../../components/AccountLoanComponents/AccountsTab'
import CardsCarousel from '../../components/AccountLoanComponents/CardsCarousel'
import ContactUs from '../../components/AccountLoanComponents/ContactUs'
import NormalClosedAccountCard from '../../components/AccountLoanComponents/NormalClosedAccountCard'
import DummyAccountCard from '../../components/AccountLoanComponents/DummyAccountCard'
import AccountInformation from '../../components/AccountLoanComponents/AccountInformation'
import QuickActions from '../../components/AccountLoanComponents/QuickActions'
import TodaysInsight from '../../components/AccountLoanComponents/TodaysInsight'
import TransactionHistory from '../../components/AccountLoanComponents/TransactionHistory'
import AccountAlerts from '../../components/AccountLoanComponents/AccountAlerts'
import ContactUpdatedNeededModalWindow from '../../components/AccountLoanComponents/ContactUpdatedNeededModalWindow'
import MessageInfo from '../../components/MessageInfo'
import { withTranslation } from 'react-i18next'
import BottomNavSetting from '../../components/BottomNavSetting'

import './styles.scss'

export interface IAccountsDashboardProps extends RouteComponentProps<any> {
  t: any
  db: {
    dataList?: {
      reasonDropdownOptions: string[]
      productForAutoClosure: {
        title: string
        category: string
      }[]
      contactUs: {
        phoneNumber: string
        email: string
      }
      relationshipManager: {
        photoUrl: string
        stars: number
        name: string
        role: string
        state: string
        email: string
        phoneNumber: string
        yourNextAppointment: {
          timeFull: string
          timeRange: string
          subject: string
          iconUrl: string
          topLabel: string
          bottomLabel: string
        }
      }
      fromAccountList: {
        label: string
        value: string
        number: string
        availableBalance: string
      }[]
      accountsAlertSwitchAccountToList: string[]
      accountsList: {
        id: number
        accountType: string
        isFavourite: boolean
        accountName: string
        customerId: string
        firstName: string
        lastName: string
        deliveryAddress: string
        accountCardInfoNormalClosed?: {
          // all type accounts
          activity: string
          number: string
          sortCode: string
          money: string
          overDraft: string
          closedDate: string
          interestRate: string
        }
        detailsNormalClosed?: {
          // 'normal', 'closed' accounts details
          showAccountAlerts: boolean
          accountsAlertSwitchAccountToList: string[]
          transactionHistory: {
            transactions: {
              dateLabel: string
              itemList: {
                iconUrl: string
                title: string
                timeLabel: string
                price: string
                cardSubfix: string
                changedLabel: string
                changedTypeRed: boolean
              }[]
            }[]
            spendingCategories: {
              iconUrl: string
              title: string
              timeLabel: string
              price: string
              cardSubfix: string
            }[]
            pendingTransactions: {
              dateLabel: string
              itemList: {
                iconUrl: string
                title: string
                timeLabel: string
                price: string
                cardSubfix: string
                changedLabel: string
                changedTypeRed: boolean
              }[]
            }[]
          }
          upcomingActivityEventsChart: {
            title: string
            isEmpty: boolean
            dataList: number[][]
            xTitles: string[]
          }
          upcomingActivityEvents: {
            dateLabelYear: string
            dateLabelDay: string
            dateLabelMonth: string
            eventsList: {
              title: string
              dueTime: string
              amount: string
              accountType: string
              accountId: string
            }[]
          }[]
          accountInformation: {
            fieldName: string
            fieldValue: string
          }[]
          todaysInsight: {
            fieldName: string
            fieldValue: string
          }[]
          cards: {
            status: string
            bankName: string
            cardType: string
            cardNumber: string
            expireDate: string
          }[]
        }
      }[]
    }
  }
  dataAction?: any
}

interface IAccountsDashboardState {
  isOpendContactUs: boolean
  isShowContactUpdateNeededModalWindow: boolean
  currentTab: string
  pageState: string
  prevArrowDisabled: boolean
  nextArrowDisabled: boolean
  currentAccountIndex: number
  currentAccountData: any
  accountListShown: any[]
  directAccountType: string
  individualBusiness: string
  isEditMode: boolean
}

export class AccountsDashboard extends Component<IAccountsDashboardProps, IAccountsDashboardState> {
  constructor(props: any) {
    super(props)

    nprogress.configure({ parent: 'main' })
    nprogress.start()

    this.state = {
      isOpendContactUs: true,
      isShowContactUpdateNeededModalWindow: Boolean(Math.round(Math.random() * 10) < 1),
      currentTab: 'All',
      pageState: '',
      prevArrowDisabled: true,
      nextArrowDisabled: false,
      currentAccountIndex: 0,
      currentAccountData: undefined,
      accountListShown: [],
      directAccountType: this.props.match.params.accountType,
      individualBusiness: 'individual',
      isEditMode: false,
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    this.props.dataAction.getAccountsDashboardData()
    nprogress.done()
  }

  componentDidUpdate() {
    if (
      this.state.currentAccountData === undefined &&
      this.props.db.dataList?.accountsList !== undefined
    ) {
      this.setState({
        currentAccountData: this.props.db.dataList?.accountsList[0] || undefined,
      })
    }
  }

  componentWillUnmount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.remove('dashboard')
    nprogress.done()
    // fix Warning: Can't perform a React state update on an unmounted component
    /* istanbul ignore next */
    this.setState = () => {
      // return
    }
  }

  // click Tab
  clickTab(tabName: string, accountsList: any[]) {
    this.setState({
      currentTab: tabName,
    })
    // do something

    const accountListShownTemp = accountsList.filter((item) => {
      switch (tabName) {
        case 'All':
          return true
        case 'Current':
          return item.accountType === 'current'
        case 'Savings':
          return item.accountType === 'savings'
        case 'Closed':
          return item.accountType === 'closed'
        default:
          return false
      }
    })

    this.setState({
      currentAccountIndex: 0,
      prevArrowDisabled: true,
      nextArrowDisabled:
        this.state.currentAccountIndex >=
        (JSON.stringify(accountListShownTemp) !== '[]' ? accountListShownTemp : accountsList)
          .length -
          4
          ? true
          : false,
      currentAccountData: accountListShownTemp[0],
      accountListShown: accountListShownTemp,
    })
  }

  // click Prev Arrow
  clickPrevArrow() {
    this.setState({
      currentAccountIndex: this.state.currentAccountIndex - 1,
      prevArrowDisabled: this.state.currentAccountIndex <= 1 ? true : false,
      nextArrowDisabled: false,
    })
  }

  // click Next Arrow
  clickNextArrow(accountsList: any[]) {
    this.setState({
      currentAccountIndex: this.state.currentAccountIndex + 1,
      prevArrowDisabled: false,
      nextArrowDisabled:
        this.state.currentAccountIndex >=
        (JSON.stringify(this.state.accountListShown) !== '[]'
          ? this.state.accountListShown
          : accountsList
        ).length -
          4
          ? true
          : false,
    })
  }

  // select Account
  selectAccount(item: any) {
    this.setState({
      currentAccountData: item,
    })
  }

  changeIndividualBusiness(accountType: string) {
    if (accountType === 'individual' || accountType === 'business') {
      this.setState({
        individualBusiness: accountType,
      })
    }
  }

  changeEditMode(isEditMode: boolean) {
    if (isEditMode === true || isEditMode === false) {
      this.setState({
        isEditMode,
      })
    }
  }

  // accountClosureRequestSuccess
  accountClosureRequestSuccess() {
    this.setState({
      pageState: 'showAccountClosureMessage',
    })

    setTimeout(() => {
      this.setState({ pageState: '' })
    }, 5000000)
  }

  render() {
    const { dataList } = { ...this.props.db }
    const {
      currentTab,
      pageState,
      isShowContactUpdateNeededModalWindow,
      prevArrowDisabled,
      nextArrowDisabled,
      currentAccountIndex,
      currentAccountData,
      accountListShown,
      individualBusiness,
      isEditMode,
    } = { ...this.state }

    return (
      <React.Fragment>
        <DashboardLeftSidebar
          title="Accounts and Loans"
          desktopShownIcon="Dashboard"
          mobileShownIcon="Menu"
          showDemoLink={true}
          showEditMode={true}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
          setIsEditMode={(editMode: boolean) => this.changeEditMode(editMode)}
        />

        {isShowContactUpdateNeededModalWindow && (
          <ContactUpdatedNeededModalWindow
            onConfirm={() => {
              this.setState({
                isShowContactUpdateNeededModalWindow: false,
              })
            }}
            onUpdate={() => {
              this.setState({
                isShowContactUpdateNeededModalWindow: false,
              })
            }}
            onClose={() => {
              this.setState({
                isShowContactUpdateNeededModalWindow: false,
              })
            }}
          />
        )}

        {!!dataList && !!currentAccountData && (
          <div className="content accdashboard-content">
            <div className="mains flex">
              <ActivityDetection />

              {pageState === 'showAccountClosureMessage' && (
                <MessageInfo
                  classes={'show-center'}
                  messageType={pageState}
                  onDismiss={() => this.setState({ pageState: '' })}
                />
              )}

              <div className="white-panel-wrap ">
                <div className="two-grid">
                  <div className="left-area">
                    <AccountsTab
                      showTab
                      currentTab={currentTab}
                      prevArrowDisabled={prevArrowDisabled}
                      nextArrowDisabled={nextArrowDisabled}
                      clickTab={(tabName: string) => this.clickTab(tabName, dataList.accountsList)}
                      clickPrevArrow={() => this.clickPrevArrow()}
                      clickNextArrow={() => this.clickNextArrow(dataList.accountsList)}
                    />

                    <div className="account-tab-contents all-accounts ">
                      <div className="three-panel">
                        {(JSON.stringify(accountListShown) !== '[]'
                          ? accountListShown
                          : dataList.accountsList
                        ).map((item, index) => (
                          <React.Fragment key={index}>
                            <div
                              className={`flex-card mobile-show ${
                                currentAccountIndex <= index && index < currentAccountIndex + 3
                                  ? ''
                                  : 'desktop-hide'
                              }`}
                            >
                              {(item.accountType === 'current' ||
                                item.accountType === 'savings' ||
                                item.accountType === 'closed') && (
                                <NormalClosedAccountCard
                                  isEditMode={isEditMode}
                                  isActive={currentAccountData.id === item.id}
                                  dataList={item}
                                  onClick={() => this.selectAccount(item)}
                                />
                              )}
                            </div>
                          </React.Fragment>
                        ))}

                        <DummyAccountCard />
                      </div>
                    </div>
                  </div>

                  <div className="flex-345">
                    {individualBusiness === 'individual' && (
                      <ContactUs showArrow={false} dataList={dataList.contactUs} />
                    )}
                    {individualBusiness === 'business' && (
                      <DashboardRelationshipManager
                        hideAppointment
                        data={dataList.relationshipManager}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(currentAccountData.accountType === 'current' ||
              currentAccountData.accountType === 'savings' ||
              currentAccountData.accountType === 'closed') && (
              <React.Fragment>
                {currentAccountData.detailsNormalClosed.showAccountAlerts && (
                  <AccountAlerts
                    accountName={currentAccountData.accountCardInfoNormalClosed.activity}
                    dataList={
                      currentAccountData.detailsNormalClosed.accountsAlertSwitchAccountToList
                    }
                  />
                )}

                <div className="tab-all-accounts accounts-loans">
                  <div className="some-cols">
                    <div className="col-items flex-50">
                      {!!currentAccountData.detailsNormalClosed.transactionHistory && (
                        <TransactionHistory
                          isEditMode={isEditMode}
                          accountType={currentAccountData.accountType}
                          individualBusiness={individualBusiness}
                          dataList={currentAccountData.detailsNormalClosed.transactionHistory}
                        />
                      )}
                    </div>
                    <div className="col-items flex-25">
                      {!!currentAccountData.detailsNormalClosed.upcomingActivityEvents &&
                        !!currentAccountData.detailsNormalClosed.upcomingActivityEventsChart && (
                          <DashboardFinanceManager
                            isEditMode={isEditMode}
                            data={currentAccountData.detailsNormalClosed.upcomingActivityEvents}
                            dataChart={
                              currentAccountData.detailsNormalClosed.upcomingActivityEventsChart
                            }
                          />
                        )}

                      {(currentAccountData.accountType === 'savings' ||
                        currentAccountData.accountType === 'closed') &&
                        !!currentAccountData.detailsNormalClosed.accountInformation && (
                          <AccountInformation
                            isEditMode={isEditMode}
                            dataList={currentAccountData.detailsNormalClosed.accountInformation}
                          />
                        )}

                      {!!currentAccountData.detailsNormalClosed.todaysInsight && (
                        <TodaysInsight
                          isEditMode={isEditMode}
                          dataList={currentAccountData.detailsNormalClosed.todaysInsight}
                        />
                      )}
                    </div>
                    <div className="col-items flex-last">
                      <QuickActions
                        fromAccountList={dataList.fromAccountList}
                        accountName={currentAccountData.accountCardInfoNormalClosed.activity}
                        accountNumber={currentAccountData.accountCardInfoNormalClosed.number}
                        customerId={currentAccountData.customerId}
                        firstName={currentAccountData.firstName}
                        lastName={currentAccountData.lastName}
                        deliveryAddress={currentAccountData.deliveryAddress}
                        dataList={currentAccountData.detailsNormalClosed.accountInformation}
                        individualBusiness={individualBusiness}
                        shownClosed={currentAccountData.accountType === 'closed' ? true : false}
                        isEditMode={isEditMode}
                      />

                      {!!currentAccountData.detailsNormalClosed.cards && (
                        <CardsCarousel
                          isEditMode={isEditMode}
                          dataList={currentAccountData.detailsNormalClosed.cards}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
        <BottomNavSetting />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(compose<any>(withTranslation(), withRouter)(AccountsDashboard))
