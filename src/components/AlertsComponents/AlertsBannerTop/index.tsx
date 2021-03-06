import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IAppState } from '../../../store/constants'
import './styles.scss'

export const AlertsBannerTop: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAlerts.alertsBannerTop.${key}`)

  const history = useHistory()

  const countOfAccount = useSelector<IAppState>((state) => state.alerts.countOfAccount) as
    | number
    | null
  const countOfPayment = useSelector<IAppState>((state) => state.alerts.countOfPayment) as
    | number
    | null

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleResize)
    return () => {
      mql.removeEventListener('change', handleResize)
    }
  }, [])

  return (
    <div className="banner-wrap">
      <React.Fragment>
        <div className="items">
          <div
            className="white-panel"
            onClick={() => isMobile && history.push('/alerts/manageAlertsDetails/0')}
          >
            <i className="icons icon-user-line" />
            <div className="blue-title">{t('account_alerts')}</div>
            <div className="thin-txt">{t('note_balances')}</div>
            <NavLink
              to="/alerts/manageAlertsDetails/0"
              className={`btn btn-gray ${countOfAccount && !isMobile ? 'btn-blue-border' : ''}`}
            >
              {countOfAccount
                ? isMobile
                  ? `${countOfAccount} ${t('alerts')}`
                  : t('view_account_alerts')
                : t('no_alert_enabled')}
            </NavLink>
          </div>
        </div>
        <div className="items">
          <div
            className="white-panel"
            onClick={() => isMobile && history.push('/alerts/manageAlertsDetails/1')}
          >
            <i className="icons icon-payment" />
            <div className="blue-title">{t('payment_alerts')}</div>
            <div className="thin-txt">{t('know_payment')}</div>
            <NavLink
              to="/alerts/manageAlertsDetails/1"
              className={`btn btn-gray ${countOfPayment && !isMobile ? 'btn-blue-border' : ''}`}
            >
              {countOfPayment
                ? isMobile
                  ? `${countOfPayment} ${t('alerts')}`
                  : t('view_payment_alerts')
                : t('no_alert_enabled')}
            </NavLink>
          </div>
        </div>
        <div className="items">
          <div
            className="white-panel"
            onClick={() => isMobile && history.push('/alerts/manageAlertsDetails/2')}
          >
            <i className="icons icon-clock" />
            <div className="blue-title">{t('alert_history')}</div>
            <div className="thin-txt">{t('track_alerts')}</div>
            <NavLink
              to="/alerts/manageAlertsDetails/2"
              className={`btn btn-gray btn-blue-border mobile-hide tablet-show`}
            >
              {t('view_history')}
            </NavLink>
          </div>
        </div>
      </React.Fragment>
    </div>
  )
}
