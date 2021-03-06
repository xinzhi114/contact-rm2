import React, { Component } from 'react'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import MarketingPreferencesDetails from '../../components/MarketingPreferencesComponents/MarketingPreferencesDetails'
import ActivityDetection from '../../components/ActivityDetection'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IMarketingPreferencesProps extends RouteComponentProps<any> {
  t: any
}

interface IMarketingPreferencesState {
  individualBusiness: string
  headerBreadcrumbData: {
    pageName: string
    pageUrl: string
  }[]
}

export class MarketingPreferences extends Component<
  IMarketingPreferencesProps,
  IMarketingPreferencesState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      individualBusiness: 'individual',
      headerBreadcrumbData: [
        {
          pageName: 'home',
          pageUrl: '/customerDashboard',
        },
        {
          pageName: 'marketing_preferences',
          pageUrl: '#',
        },
      ],
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
  }

  componentWillUnmount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.remove('dashboard')
  }

  changeIndividualBusiness(accountType: string) {
    if (accountType === 'individual' || accountType === 'business') {
      this.setState({
        individualBusiness: accountType,
      })
    }
  }

  render() {
    const { headerBreadcrumbData } = { ...this.state }
    return (
      <React.Fragment>
        <DashboardLeftSidebar
          headerWhiteBg={true}
          title="Marketing Preferences"
          desktopShownIcon=""
          mobileShownIcon="Back"
          showDemoLink={false}
          headerBreadcrumbData={headerBreadcrumbData}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
        />

        <div className="content marketing-preferences-content">
          <div className="mains">
            <ActivityDetection />
            <div className="three-row">
              <div className="two-row tab-alerts-account">
                <MarketingPreferencesDetails />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default compose<any>(withTranslation(), withRouter)(MarketingPreferences)
