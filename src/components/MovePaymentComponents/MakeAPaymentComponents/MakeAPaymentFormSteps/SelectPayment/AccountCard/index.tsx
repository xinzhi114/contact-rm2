import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '../../../../../../services/Util'
import './styles.scss'

export interface IAccountCardProps {
  type: 'UK' | 'EU'
  amount: number
}

export const AccountCard: React.FunctionComponent<IAccountCardProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.accountCard.${key}`)

  const { type, amount } = props

  return (
    <div className="account-card">
      <div className="top-row">
        <img src={`/assets/${type.toLowerCase()}-flag.svg`} alt="country flag" />
        <span>{type === 'UK' ? t('gbp') : t('eur')}</span>
      </div>
      <span>
        {type === 'UK' ? '£' : '€'} {formatAmount(amount)}
      </span>
    </div>
  )
}
