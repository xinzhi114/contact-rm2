import React from 'react'
import { useTranslation } from 'react-i18next'
import { IAccount } from '../../../../constants/account'
import './styles.scss'

export interface IAccountInfoProps {
  account: IAccount
  balance: string
}

export const AccountInfo: React.FunctionComponent<IAccountInfoProps> = ({ account, balance }) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.accountInfo.${key}`)

  const rows: {
    label: string
    value: string
  }[] = [
    {
      label: 'available_balance',
      value: balance,
    },
    {
      label: 'currency',
      value: 'GBP (£)',
    },
    {
      label: 'interest_rate',
      value: `${(account.interestRate * 100).toFixed(1)}%`,
    },
    {
      label: 'account_number',
      value: account.accountNumber,
    },
    {
      label: 'sort_code',
      value: account.sortCode,
    },
  ]

  return (
    <div className="account-info">
      <div className="section-title">{t('account_information')}</div>
      {rows.map((row, index) => (
        <div className="account-row" key={index}>
          <span className="label">{t(row.label)}</span>
          <span className="value">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
