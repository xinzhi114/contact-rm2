import React, { Component } from 'react'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import NormalTab from '../../components/NormalTab'
import SelectFAQCategory from '../../components/HelpSupportComponents/SelectFAQCategory'
import SelectContactBankOptions from '../../components/HelpSupportComponents/SelectContactBankOptions'
import SelectOfficeLocation from '../../components/HelpSupportComponents/SelectOfficeLocation'
import FaqRightList from '../../components/AlertsComponents/FaqRightList'
import FaqInsightRightList from '../../components/HelpSupportComponents/FaqInsightRightList'
import ContactBankCallDetails from '../../components/HelpSupportComponents/ContactBankCallDetails'
import ContactBankSecureEmailDetails from '../../components/HelpSupportComponents/ContactBankSecureEmailDetails'
import OfficeLocationDetails from '../../components/HelpSupportComponents/OfficeLocationDetails'
import { tabArrayHelpSupport, tabArrayHelpSupportContactBank } from '../../config'
import ActivityDetection from '../../components/ActivityDetection'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { IAppState } from '../../store/constants'
import { loadDrupalHelpContent } from '../../store/actions/faq'
import { HelpState } from '../../store/reducers/faq'
import _ from 'lodash'

export interface IHelpSupportProps extends RouteComponentProps<any> {
  t: any
  helpSupport: {
    dataList?: {
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
      contactBank: {
        secureEmail: {
          totalNumber: number
          categoryList: {
            categoryName: string
            categoryTotalNumber: number
            unreadNumber: number
            unread: {
              groupTitle: string
              emailList: {
                title: string
                replyEmail: string
                sn: string
                time: string
                content: string
              }[]
            }[]
            readNumber: number
            read: {
              groupTitle: string
              emailList: {
                title: string
                replyEmail: string
                sn: string
                time: string
                content: string
              }[]
            }[]
          }[]
        }
      }
    }
  }
  faq: HelpState
  faqActions: any
  dataAction?: any
  loadDrupalHelpContent: any
}

interface IHelpSupportState {
  individualBusiness: string
  currentTab: string
  currentFAQTabIndex: number
  currentContactBankTabIndex: number
  currentContactBankSecureEmailCategoryIndex: number
  currentRegionalOfficeAddressesTabIndex: number
}

export class HelpSupport extends Component<IHelpSupportProps, IHelpSupportState> {
  constructor(props: any) {
    super(props)
    this.state = {
      individualBusiness: 'individual',
      currentTab: tabArrayHelpSupport[this.props.match.params.tabIndex],
      currentFAQTabIndex: 0,
      currentContactBankTabIndex: 0,
      currentContactBankSecureEmailCategoryIndex: 0,
      currentRegionalOfficeAddressesTabIndex: 0,
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    this.props.dataAction.getHelpSupportData()
    this.loadDrupalHelp()
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

  loadDrupalHelp() {
    const { faq, faqActions } = this.props
    if (!faq.call) {
      faqActions.loadDrupalHelpContent()
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
    this.setState({
      currentTab: tabName,
    })
  }

  // select FAQ Tab
  selectFAQTab(index: number) {
    this.setState({
      currentFAQTabIndex: index,
    })
  }

  // select Contact Bank Tab
  selectContactBankTab(index: number) {
    this.setState({
      currentContactBankTabIndex: index,
    })
  }

  // select Contact Bank Secure Email Category
  selectContactBankSecureEmailCategory(index: number) {
    this.setState({
      currentContactBankSecureEmailCategoryIndex: index,
    })
  }

  // select Regional Office Addresses Tab
  selectRegionalOfficeAddressesTab(index: number) {
    this.setState({
      currentRegionalOfficeAddressesTabIndex: index,
    })
  }

  // is Mobile view
  isMobileView() {
    return window.innerWidth <= 768
  }

  render() {
    const { dataList } = { ...this.props.helpSupport }
    const {
      individualBusiness,
      currentTab,
      currentFAQTabIndex,
      currentContactBankTabIndex,
      currentContactBankSecureEmailCategoryIndex,
      currentRegionalOfficeAddressesTabIndex,
    } = { ...this.state }
    const { faq, t } = this.props

    const faqGroups = _.uniqBy(faq.FAQ || [], 'name')
    const currentFAQs = (faq.FAQ || []).filter(
      (f) => f.name === (faqGroups[currentFAQTabIndex] || {}).name
    )
    return (
      <React.Fragment>
        <DashboardLeftSidebar
          headerWhiteBg={true}
          title={
            !this.isMobileView()
              ? 'Help & Support'
              : currentTab !== 'Regional Office Addresses'
              ? currentTab
              : undefined
          }
          desktopShownIcon=""
          mobileShownIcon="Back"
          showDemoLink={false}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
        />

        {!!dataList && (
          <div className="content help-support-content">
            <div className="mains">
              <ActivityDetection />

              <div className="three-row">
                <div className="mobile-hide">
                  <NormalTab
                    tabArray={tabArrayHelpSupport}
                    currentTab={currentTab}
                    clickTab={(tabName: string) => this.clickTab(tabName)}
                  />
                </div>

                {currentTab === 'FAQ' && (
                  <div className="two-row tab-alerts-account">
                    {!faq.FAQ && <p>{t('common.loading')}</p>}
                    {faq.FAQ && faq.FAQ.length <= 0 && <p>{t('common.no_record')}</p>}
                    {faq.FAQ && faq.FAQ.length > 0 && (
                      <React.Fragment>
                        <SelectFAQCategory
                          currentIndex={currentFAQTabIndex}
                          faq={faqGroups}
                          selectTab={(index: number) => this.selectFAQTab(index)}
                          clickContactUs={() =>
                            this.setState({
                              currentTab: 'Contact Bank',
                            })
                          }
                        />

                        {faqGroups.map((item, index) => (
                          <div
                            key={index}
                            className={`right-container ${
                              currentFAQTabIndex === index ? '' : 'hide'
                            }`}
                          >
                            {item.name === 'insight' ? (
                              <FaqInsightRightList faq={currentFAQs} />
                            ) : (
                              <FaqRightList faq={currentFAQs} />
                            )}
                          </div>
                        ))}
                      </React.Fragment>
                    )}
                  </div>
                )}

                {currentTab === 'Contact Bank' && (
                  <div className="two-row tab-alerts-payment">
                    <SelectContactBankOptions
                      individualBusiness={individualBusiness}
                      relationshipManager={dataList.relationshipManager}
                      tabArray={tabArrayHelpSupportContactBank}
                      currentTabIndex={currentContactBankTabIndex}
                      currentSecureEmailCategoryIndex={currentContactBankSecureEmailCategoryIndex}
                      dataList={dataList.contactBank.secureEmail}
                      selectTab={(index: number) => this.selectContactBankTab(index)}
                      selectSecureEmailCategory={(index: number) =>
                        this.selectContactBankSecureEmailCategory(index)
                      }
                    />

                    <div className={`right-container`}>
                      {tabArrayHelpSupportContactBank[currentContactBankTabIndex] === 'Call' && (
                        <ContactBankCallDetails call={faq.call} />
                      )}

                      {tabArrayHelpSupportContactBank[currentContactBankTabIndex] ===
                        'Secure Email' && (
                        <React.Fragment>
                          {dataList.contactBank.secureEmail.categoryList &&
                            dataList.contactBank.secureEmail.categoryList.map((item, index) => (
                              <div
                                key={index}
                                className={`${
                                  currentContactBankSecureEmailCategoryIndex === index ? '' : 'hide'
                                }`}
                              >
                                <ContactBankSecureEmailDetails
                                  secureEmailDataList={dataList.contactBank.secureEmail}
                                  currentContactBankSecureEmailCategoryIndex={index}
                                  dataList={item}
                                  selectSecureEmailCategory={(categoryIndex: string) =>
                                    this.selectContactBankSecureEmailCategory(
                                      parseInt(categoryIndex, 10)
                                    )
                                  }
                                />
                              </div>
                            ))}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                )}

                {currentTab === 'Regional Office Addresses' && (
                  <div className="two-row tab-alerts-history">
                    {!faq.offices && <p>{t('common.loading')}</p>}
                    {faq.offices && faq.offices.length <= 0 && <p>{t('common.no_record')}</p>}
                    {faq.offices && faq.offices.length > 0 && (
                      <React.Fragment>
                        <SelectOfficeLocation
                          individualBusiness={individualBusiness}
                          relationshipManager={dataList.relationshipManager}
                          currentIndex={currentRegionalOfficeAddressesTabIndex}
                          offices={faq.offices}
                          selectTab={(event: any) => this.selectRegionalOfficeAddressesTab(event)}
                        />
                        {faq.offices.map((item, index) => (
                          <div
                            key={index}
                            className={`right-container ${
                              currentRegionalOfficeAddressesTabIndex === index ? '' : 'hide'
                            }`}
                          >
                            <OfficeLocationDetails office={item} />
                          </div>
                        ))}
                      </React.Fragment>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({ ...state.dataReducer, faq: state.faq })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  faqActions: bindActionCreators({ loadDrupalHelpContent }, dispatch),
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(compose<any>(withTranslation(), withRouter)(HelpSupport))
