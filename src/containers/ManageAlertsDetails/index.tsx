import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import NormalTab from '../../components/NormalTab'
import { AlertsSelectAccount } from '../../components/AlertsComponents/AlertsSelectAccount'
import { AccountAlertsDetails } from '../../components/AlertsComponents/AccountAlertsDetails'
import { PaymentAlertsDetails } from '../../components/AlertsComponents/PaymentAlertsDetails'
import { AlertHistoryDetails } from '../../components/AlertsComponents/AlertHistoryDetails'
import ActivityDetection from '../../components/ActivityDetection'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearAlertError, fetchAlerts, fetchHistory } from '../../store/actions/alerts'
import { IAppState } from '../../store/constants'
import { AlertHistory } from '../../domain/AlertHistory'
import { AccountAlert, AlertItem } from '../../domain/AlertItem'

const tabArray = ['Account', 'Payment', 'Alert History']
export const ManageAlertsDetails: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const history = useHistory()
  const params = useParams<{ tabIndex: string }>()
  const dispatch = useDispatch()

  const histories = useSelector<IAppState>((state) => state.alerts.histories) as
    | AlertHistory[]
    | null
  const accountAlerts = useSelector<IAppState>((state) => state.alerts.accountAlerts) as
    | AccountAlert[]
    | null
  const paymentAlerts = useSelector<IAppState>((state) => state.alerts.paymentAlerts) as
    | AlertItem[]
    | null
  const errorMsg = useSelector<IAppState>((state) => state.alerts.error) as string | null

  const [, setIndividualBusiness] = useState<string>('individual')
  const [currentTab, setCurrentTab] = useState<string>(tabArray[Number(params.tabIndex)])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const headerBreadcrumbData = [
    {
      pageName: 'home',
      pageUrl: '/customerDashboard',
    },
    {
      pageName: 'manage_my_profile',
      pageUrl: '#',
    },
    {
      pageName: 'manage_alerts',
      pageUrl: '#',
    },
  ]

  useEffect(() => {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    dispatch(fetchAlerts())
    return () => {
      input.classList.remove('dashboard')
    }
  }, [dispatch])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // click Tab
  const clickTab = (tabName: string) => {
    setCurrentTab(tabName)
    dispatch(clearAlertError())
    history.push('/alerts/manageAlertsDetails/' + tabArray.findIndex((i) => i === tabName))
  }

  // select Account
  const selectAccount = (index: number) => {
    setCurrentIndex(index)
  }

  // is Mobile view
  const isMobileView = () => {
    return window.innerWidth <= 768
  }

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title={
          !isMobileView()
            ? 'Manage Alerts'
            : currentTab !== 'Alert History'
            ? currentTab + ' Alerts'
            : currentTab
        }
        desktopShownIcon="Alerts"
        mobileShownIcon="Back"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      <div className="content manage-alerts-details-content">
        <div className="mains">
          <ActivityDetection />

          <div className="three-row">
            <div className="mobile-hide">
              <NormalTab
                tabArray={tabArray}
                currentTab={currentTab}
                clickTab={(event: string) => clickTab(event)}
              />
            </div>

            <div className="right-link mobile-hide">
              <NavLink to="/alerts/manageAlerts" className="icon-back">
                {t('manageAlertsDetails.alert_dashboard')}
              </NavLink>
            </div>

            {currentTab === 'Account' && (
              <Fragment>
                {errorMsg && <div className="tip-txt">{errorMsg}</div>}
                {!errorMsg && !accountAlerts && (
                  <div className="tip-txt">{t('common.loading')}</div>
                )}
                <div className="two-row tab-alerts-account">
                  {accountAlerts && (
                    <Fragment>
                      <AlertsSelectAccount
                        currentIndex={currentIndex}
                        accountAlerts={accountAlerts}
                        selectAccount={(event: any) => selectAccount(event)}
                      />

                      {accountAlerts &&
                        accountAlerts.map((item, index) => (
                          <div
                            key={index}
                            className={`right-container ${currentIndex === index ? '' : 'hide'}`}
                          >
                            <AccountAlertsDetails
                              onUpdated={() => dispatch(fetchAlerts())}
                              currentIndex={index}
                              dataList={item.events}
                            />
                          </div>
                        ))}
                    </Fragment>
                  )}
                </div>
              </Fragment>
            )}

            {currentTab === 'Payment' && (
              <div className="two-row tab-alerts-payment">
                <PaymentAlertsDetails
                  loadErrorMsg={errorMsg}
                  dataList={paymentAlerts}
                  onUpdated={() => dispatch(fetchAlerts())}
                />
              </div>
            )}

            {currentTab === 'Alert History' && (
              <div className="two-row tab-alerts-history">
                <AlertHistoryDetails
                  dataList={histories}
                  fetchHistory={(query: any) => dispatch(fetchHistory(query))}
                  loadErrorMsg={errorMsg}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
