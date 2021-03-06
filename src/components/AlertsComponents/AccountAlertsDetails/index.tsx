import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import { AlertItem } from '../../../domain/AlertItem'
import { AlertList } from '../PaymentAlertsDetails'

export interface IAccountAlertsDetailsProps {
  currentIndex: number
  dataList: AlertItem[]
  onUpdated: () => void
}

export const AccountAlertsDetails: React.FunctionComponent<IAccountAlertsDetailsProps> = (
  props
) => {
  const { t } = useTranslation()

  const { dataList, onUpdated } = props

  return (
    <div className="card-list-boxs account-alerts-details">
      <div className="title-line-bar mobile-hide">
        <i className="icons icon-blue-user" />
        <span className="txt">{t('manageAlerts.alertsBannerTop.account_alerts')}</span>
      </div>
      <div className="debit-card-list">
        <AlertList items={dataList} onUpdated={onUpdated} />
      </div>
    </div>
  )
}
