import React, { Component } from 'react'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { withTranslation } from 'react-i18next'
import './styles.scss'

interface IDashboardWelcomeProps {
  t: any
  dataList?: {
    loginTime: string
    loginIP: string
  }
}

export class DashboardWelcome extends Component<IDashboardWelcomeProps, {}> {
  // get WelCome Msg
  getWelComeMsg() {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 4 && hours <= 11) {
      return 'Good morning'
    }

    if (hours >= 12 && hours < 17) {
      return 'Good afternoon'
    }

    if (hours >= 17 && hours < 21) {
      return 'Good evening'
    }

    return 'Hello'
  }

  render() {
    const { t } = this.props
    const { dataList } = { ...this.props }

    return (
      <div className={`dashboard-welcome`}>
        <div className="big-title desktop-show mobile-hide">
          {t('common.dynamicLabels.' + this.getWelComeMsg())}, {t('home.dashboardWelcome.ashley')}!
        </div>
        <BaseTextLinkButton
          classNameContainer={'big-title desktop-hide mobile-show'}
          label={`${t('common.dynamicLabels.' + this.getWelComeMsg())}, ${t(
            'home.dashboardWelcome.ashley'
          )}!`}
          href={'/accountsDashboardPage/manageProfile'}
          isNavLink
        />
        {!!dataList && (
          <div className="login-time">
            <i className="icons icon-clock" />
            {t('home.dashboardWelcome.last_login')}: {dataList.loginTime} -{' '}
            {t('home.dashboardWelcome.ip')}: {dataList.loginIP}
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(DashboardWelcome)
