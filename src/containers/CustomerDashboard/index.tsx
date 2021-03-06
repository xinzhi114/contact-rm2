import React, { Component } from 'react'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import DashboardWelcome from '../../components/HomeComponents/DashboardWelcome'
import ContactUs from '../../components/AccountLoanComponents/ContactUs'
import DashboardRelationshipManager from '../../components/DashboardRelationshipManager'
import PortfolioOverview from '../../components/HomeComponents/PortfolioOverview'
import DashboardLeftCarousel from '../../components/HomeComponents/DashboardLeftCarousel'
import DashboardFinanceManager from '../../components/HomeComponents/DashboardFinanceManager'
import MostActiveAccounts from '../../components/HomeComponents/MostActiveAccounts'
import DashboardRightCarousel from '../../components/HomeComponents/DashboardRightCarousel'
import MarketingPreferencesModalWindow from '../../components/MarketingPreferencesComponents/MarketingPreferencesModalWindow'
import ActivityDetection from '../../components/ActivityDetection'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { ASF } from '../../common/Api/Services/ApiServiceFactory'
import { MarketPrefService } from '../../common/Api/Services/MarketPrefService'
import { noop } from 'lodash'

export interface IDashboardProps {
  t: any
  db: {
    dataList?: {
      lastLogin: {
        loginTime: string
        loginIP: string
      }
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
      portfolioOverview: {
        carousel: {
          companyName: string
          price: string
          changeType: string
          changeFromLastMonth: string
          productList: {
            iconUrlDefault: string
            iconUrlHover: string
            price: string
            title: string
          }[]
        }[]
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
      mostActiveAccounts: {
        accountType: string
        accountNumber: string
        remainingBalance: string
        overdraft: string
      }[]
    }
  }
  dataAction?: any
}

interface IDashboardState {
  individualBusiness: string
  showMarketingPreferencesWindow?: boolean
  marketPrefLastUpdated?: string
}

export class CustomerDashboard extends Component<IDashboardProps, IDashboardState> {
  constructor(props: any) {
    super(props)

    nprogress.configure({ parent: 'main' })
    nprogress.start()
    this.state = {
      individualBusiness: 'individual',
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    this.props.dataAction.getCustomerDashboardData()
    nprogress.done()
    this.checkAndOpenMarkPrefModal()
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

  changeIndividualBusiness(accountType: string) {
    if (accountType === 'individual' || accountType === 'business') {
      this.setState({
        individualBusiness: accountType,
      })
    }
  }

  /**
   * check and open market pref modal window
   */
  checkAndOpenMarkPrefModal = () => {
    ASF.getService(MarketPrefService)
      .getPreferencesStatus()
      .then(({ body }: any) => {
        if (body.notify) {
          this.setState({
            showMarketingPreferencesWindow: true,
            marketPrefLastUpdated: body.lastUpdated,
          })
        }
      })
      .catch(noop)
  }

  render() {
    const { t } = this.props
    const { dataList } = { ...this.props.db }
    const { individualBusiness, showMarketingPreferencesWindow } = { ...this.state }

    return (
      <React.Fragment>
        <DashboardLeftSidebar
          title="Home"
          desktopShownIcon="Dashboard"
          mobileShownIcon="Menu"
          showDemoLink={true}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
        />

        {showMarketingPreferencesWindow && (
          <MarketingPreferencesModalWindow
            t={t}
            lastUpdated={this.state.marketPrefLastUpdated}
            onClose={() => this.setState({ showMarketingPreferencesWindow: false })}
          />
        )}

        {!!dataList && (
          <div className="content dashboard-content">
            <div className="mains">
              <ActivityDetection />
              <DashboardWelcome dataList={dataList.lastLogin} />
            </div>
            <div className="tab-all-accounts ">
              <div className="some-cols customer-some-col">
                <div className="col-items flex-35">
                  <div className="desktop-hide tablet-show">
                    {individualBusiness === 'individual' && (
                      <ContactUs
                        dataList={dataList.contactUs}
                        showArrow={false}
                        onClickArrow={(event: any) => {
                          event.preventDefault()
                        }}
                      />
                    )}
                    {individualBusiness === 'business' && (
                      <DashboardRelationshipManager data={dataList.relationshipManager} />
                    )}
                  </div>

                  <PortfolioOverview
                    individualBusiness={individualBusiness}
                    dataList={dataList.portfolioOverview}
                  />

                  <DashboardLeftCarousel />
                </div>
                <div className="col-items flex-47">
                  <DashboardFinanceManager data={dataList.upcomingActivityEvents} />

                  <DashboardRightCarousel />
                </div>
                <div className="col-items">
                  <div className="tablet-hide">
                    {individualBusiness === 'individual' && (
                      <ContactUs
                        dataList={dataList.contactUs}
                        showArrow={false}
                        onClickArrow={(event: any) => {
                          event.preventDefault()
                        }}
                      />
                    )}
                    {individualBusiness === 'business' && (
                      <DashboardRelationshipManager data={dataList.relationshipManager} />
                    )}
                  </div>

                  <MostActiveAccounts dataList={dataList.mostActiveAccounts} />
                </div>
              </div>
            </div>
          </div>
        )}
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
)(compose<any>(withTranslation())(CustomerDashboard))
