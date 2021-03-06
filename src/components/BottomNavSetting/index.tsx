import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IBottomNavSettingProps {
  t: any
}

class BottomNavSetting extends Component<IBottomNavSettingProps> {
  render() {
    const { t } = this.props

    return (
      <div className="bottom-nav-setting">
        <NavLink
          to="/movePaymentPages"
          className="btn-nav-move-payment label-transparent desktop-hide mobile-show"
        >
          {t('common.btns.setting')}
        </NavLink>
        <a
          href="#javascript"
          className="btn-nav-profile label-transparent desktop-hide mobile-show"
          onClick={(event) => event.preventDefault()}
        >
          {t('common.btns.setting')}
        </a>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(BottomNavSetting)
