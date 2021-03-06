import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import { Col, Row } from 'react-bootstrap'
import { FlexContainer } from '../../../components/FlexLayoutComponents/FlexContainer'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import AccountsTab from '../../../components/AccountLoanComponents/AccountsTab'
import NormalClosedAccountCard from '../../../components/AccountLoanComponents/NormalClosedAccountCard'
import UserListTable from '../../../components/ManageAccessComponents/UserListTable'
import ActivityDetection from '../../../components/ActivityDetection'
// import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IAccessDashboardProps {
  manageAccessAccessDashboard: {
    dataList?: {
      accountsList: {
        id: number
        accountType: string
        isFavourite: boolean
        accountName: string
        customerId: string
        cardNumber: string
        accountCardInfoNormalClosed: {
          // all type accounts
          activity: string
          number: string
          sortCode: string
          money: string
          overDraft: string
          closedDate: string
          interestRate: string
        }
        accessData: {
          userListAccessLevel: {
            id: string
            userNameColor: string
            userNameLabelColor: string
            userNameShortLabel: string
            fieldList: {
              fieldType: string
              fieldName: string
              fieldValue: string
              isHide?: boolean
              queryHide: boolean
            }[]
          }[]
          userListCardAccess: {
            id: string
            userNameColor: string
            userNameLabelColor: string
            userNameShortLabel: string
            cardNumber: string
            fieldList: {
              fieldType: string
              fieldName: string
              fieldValue: string
              isHide?: boolean
              queryHide: boolean
            }[]
          }[]
        }
      }[]
    }
  }
  dataAction?: any
}

const AccessDashboard: React.FunctionComponent<IAccessDashboardProps> = (props) => {
  // const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')

  const [prevArrowDisabled, setPrevArrowDisabled] = useState(true)
  const [nextArrowDisabled, setNextArrowDisabled] = useState(false)

  const [currentAccountIndex, setCurrentAccountIndex] = useState(0)
  const [currentAccountData, setCurrentAccountData] = useState(undefined as any)
  const [accountListShown] = useState([])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getManageAccessAccessDashboardData()
  }, [props.dataAction])

  useEffect(() => {
    if (props.manageAccessAccessDashboard) {
      setCurrentAccountData(props.manageAccessAccessDashboard.dataList?.accountsList[0])
    }
  }, [props.manageAccessAccessDashboard])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // click Prev Arrow
  const clickPrevArrow = () => {
    setCurrentAccountIndex(currentAccountIndex - 1)
    setPrevArrowDisabled(currentAccountIndex <= 1 ? true : false)
    setNextArrowDisabled(false)
  }

  // click Next Arrow
  const clickNextArrow = (accountsList: any[]) => {
    setCurrentAccountIndex(currentAccountIndex + 1)
    setPrevArrowDisabled(false)
    setNextArrowDisabled(
      currentAccountIndex >=
        (JSON.stringify(accountListShown) !== '[]'
          ? accountListShown
          : accountsList.filter((item) => {
              return item.accountType === 'normal'
            })
        ).length -
          4
        ? true
        : false
    )
  }

  // select Account
  const selectAccount = (item: any) => {
    setCurrentAccountData(item)
  }

  const { dataList } = { ...props.manageAccessAccessDashboard }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Manage Access"
        desktopShownIcon="Back"
        mobileShownIcon="Back"
        showDemoLink={true}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {!!dataList && !!currentAccountData && (
        <div className="content manage-access-access-dashboard-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <FlexContainer flexDirection="column">
              <Row>
                <Col xs={12} lg={12} className="form-col aaa">
                  <div className="title">Select Account</div>
                  <AccountsTab
                    showTab={false}
                    currentTab={''}
                    prevArrowDisabled={prevArrowDisabled}
                    nextArrowDisabled={nextArrowDisabled}
                    clickTab={() => null}
                    clickPrevArrow={() => clickPrevArrow()}
                    clickNextArrow={() => clickNextArrow(dataList.accountsList)}
                  />
                  <div className="white-panel-wrap ">
                    <div className="two-grid">
                      <div className="left-area">
                        <div className="account-tab-contents all-accounts ">
                          <div className="three-panel">
                            {(JSON.stringify(accountListShown) !== '[]'
                              ? accountListShown
                              : dataList.accountsList.filter(() => {
                                  return true
                                })
                            ).map((item, index) => (
                              <React.Fragment key={index}>
                                <div
                                  className={`flex-card mobile-show ${
                                    currentAccountIndex <= index && index < currentAccountIndex + 5
                                      ? ''
                                      : 'desktop-hide'
                                  }`}
                                >
                                  {(item.accountType === 'current' ||
                                    item.accountType === 'savings' ||
                                    item.accountType === 'closed') && (
                                    <NormalClosedAccountCard
                                      isEditMode={false}
                                      isActive={currentAccountData.id === item.id}
                                      dataList={item}
                                      onClick={() => selectAccount(item)}
                                    />
                                  )}
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <UserListTable
                    customerId={currentAccountData.customerId}
                    accountNumber={currentAccountData.accountCardInfoNormalClosed.number}
                    dataList={currentAccountData.accessData}
                  />
                </Col>
              </Row>
            </FlexContainer>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(AccessDashboard)
