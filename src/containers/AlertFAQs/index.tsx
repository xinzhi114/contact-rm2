import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import { NormalTab } from '../../components/NormalTab'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import { FaqSelectCategory } from '../../components/AlertsComponents/FaqSelectCategory'
import { AlertsFaqRightList } from '../../components/AlertsComponents/AlertsFaqRightList'
import ActivityDetection from '../../components/ActivityDetection'
import './styles.scss'

interface IAlertFAQsProps {
  alertFAQs: {
    dataList?: {
      name: string
      iconUrl: string
      categoryLabel: string
      faqList: {
        title: string
        description: string
      }[]
    }[]
  }
  dataAction?: any
}

const tabArray = ['Account', 'Payment', 'Alert History']
const AlertFAQs: React.FunctionComponent<IAlertFAQsProps> = (props) => {
  const [individualBusiness, setIndividualBusiness] = useState('individual')
  const [currentIndex, setCurrentIndex] = useState(0)

  const [headerBreadcrumbData] = useState([
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
      pageUrl: '/alerts/manageAlerts',
    },
    {
      pageName: 'alerts_faqs',
      pageUrl: '#',
    },
  ])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getAlertFAQsData()
  }, [props.dataAction])

  useEffect(() => {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    return () => {
      // Anything in here is fired on component unmount.
      input.classList.remove('dashboard')
    }
  }, [])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // select Category
  const selectCategory = (index: number) => {
    setCurrentIndex(index)
  }

  // click Mobile Tab
  const clickMobileTab = (tabName: string) => {
    let tempIndex = 0

    tabArray.forEach((item, index) => {
      if (item === tabName) {
        tempIndex = index
      }
    })

    setCurrentIndex(tempIndex)
  }

  const { dataList } = { ...props.alertFAQs }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Alerts FAQs"
        desktopShownIcon="Back"
        mobileShownIcon="Back"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {!!dataList && (
        <div className="content alerts-faq-content">
          <div className="mains alerts-faqs-content">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <div className="mobile-tabs desktop-hide mobile-show">
                <NormalTab
                  tabArray={tabArray}
                  currentTab={tabArray[currentIndex]}
                  clickTab={(event: string) => clickMobileTab(event)}
                />
              </div>

              <div className="two-row ">
                <FaqSelectCategory
                  currentIndex={currentIndex}
                  dataList={dataList}
                  selectCategory={(index: any) => selectCategory(index)}
                />

                {dataList.map((item, index) => (
                  <div
                    key={index}
                    className={`right-container ${currentIndex === index ? '' : 'hide'}`}
                  >
                    <AlertsFaqRightList dataList={item} />
                  </div>
                ))}
              </div>
            </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(AlertFAQs)
