import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import NormalTab from '../../components/NormalTab'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import GeneralConfirmModalWindow from '../../components/GeneralConfirmModalWindow'
import ProfileSelectCategory from '../../components/ManageProfileComponents/ProfileSelectCategory'
import ProfileRightDetails from '../../components/ManageProfileComponents/ProfileRightDetails'
import ActivityDetection from '../../components/ActivityDetection'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IManageProfileProps {
  manageProfile: {
    dataList?: {
      phoneNumber: string
      workPhoneNumber: string
      emailAddress: string
      tradingAddress: string
      correspondenceAddress: string
    }
  }
  dataAction?: any
}

const tabArray = ['personal', 'contact', 'security']
const ManageProfile: React.FunctionComponent<IManageProfileProps> = (props) => {
  const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')

  const [currentIndex, setCurrentIndex] = useState(1)

  const [
    isShowContactDetailsUpdatedModalWindow,
    setIsShowContactDetailsUpdatedModalWindow,
  ] = useState(false)

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
      pageName: 'contact_details',
      pageUrl: '#',
    },
  ])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getManageProfileData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // select Category
  const selectCategory = (index: number) => {
    if (index === 1) {
      setCurrentIndex(index)
    }
  }

  // click Mobile Tab
  const clickMobileTab = (tabName: string) => {
    let tempIndex = 0

    tabArray.forEach((item, index) => {
      if (item === tabName) {
        tempIndex = index
      }
    })

    if (tempIndex === 1) {
      setCurrentIndex(tempIndex)
    }
  }

  const { dataList } = { ...props.manageProfile }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Manage My Profile"
        desktopShownIcon="Back"
        mobileShownIcon="Back"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {isShowContactDetailsUpdatedModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('manageProfile.contact_details_updated')}
          messageText={`${t('manageProfile.your_contact_details_has_updated')}`}
          href={'/customerDashboard'}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowContactDetailsUpdatedModalWindow(false)
          }}
        />
      )}

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
                  clickTab={(tabName: string) => clickMobileTab(tabName)}
                />
              </div>

              <div className="two-row ">
                <ProfileSelectCategory
                  currentIndex={currentIndex}
                  tabArray={tabArray}
                  selectCategory={(index: number) => selectCategory(index)}
                />

                {currentIndex === 1 && (
                  <div className={`right-container`}>
                    <div>
                      <ProfileRightDetails
                        dataList={dataList}
                        onCloseApproveModal={() => {
                          setIsShowContactDetailsUpdatedModalWindow(true)
                        }}
                      />
                    </div>
                  </div>
                )}
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

export default connect(mapStateToProps, matchDispatchToProps)(ManageProfile)
