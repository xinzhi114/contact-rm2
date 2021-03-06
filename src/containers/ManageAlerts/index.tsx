import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreHelpers } from 'react-joyride'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import { AlertsBannerTop } from '../../components/AlertsComponents/AlertsBannerTop'
import { AlertsBannerBottom } from '../../components/AlertsComponents/AlertsBannerBottom'
import ActivityDetection from '../../components/ActivityDetection'
import { countAlerts, getAlertDashboardData } from '../../store/actions/alerts'
import { IAppState } from '../../store/constants'
import { IRelationshipManager } from '../../constants/account'
import { RelationshipManager } from '../../components/MovePaymentComponents/RelationshipManager'
import { GuidedTour } from '../../components/GuidedTour'
import './styles.scss'

export const ManageAlerts: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const guidedTourHelpersRef = useRef<StoreHelpers | null>(null)

  const [individualBusiness, setIndividualBusiness] = useState('individual')
  const [guidedTourStepIndex, setGuidedTourStepIndex] = useState<number>(0)

  const relationshipManager = useSelector<IAppState>(
    (state) => state.alerts.relationshipManager
  ) as IRelationshipManager | null

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
    let input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    dispatch(countAlerts())
    dispatch(getAlertDashboardData())
    return () => {
      input = document.getElementById('root') as HTMLInputElement
      input.classList.remove('dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  const resetGuidedTour = () => {
    setGuidedTourStepIndex(0)
    if (guidedTourHelpersRef.current) {
      guidedTourHelpersRef.current.close()
    }
  }

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        title="Manage Alerts"
        desktopShownIcon="Alerts"
        mobileShownIcon="Menu"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => handleChangeIndividualBusiness(accountType)}
      />

      <div className="content manage-alerts-content">
        <div className="mains">
          <ActivityDetection />
          {individualBusiness === 'business' && !!relationshipManager && (
            <RelationshipManager data={relationshipManager} />
          )}
          <AlertsBannerTop />
        </div>
        <AlertsBannerBottom
          onStartTour={() => {
            if (guidedTourHelpersRef.current) {
              guidedTourHelpersRef.current.open()
            }
          }}
        />
        <GuidedTour
          stepSelectors={[1, 2, 3].map(
            (index) => `.manage-alerts-content .banner-wrap :nth-child(${index}) .white-panel`
          )}
          helpersRef={guidedTourHelpersRef}
          stepIndex={guidedTourStepIndex}
          onNextClick={() => setGuidedTourStepIndex(guidedTourStepIndex + 1)}
          onReset={() => resetGuidedTour()}
          translationKey="manageAlerts.guidedTour"
        />
      </div>
    </React.Fragment>
  )
}
