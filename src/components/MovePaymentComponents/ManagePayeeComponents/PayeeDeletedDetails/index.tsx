import React from 'react'
import { useTranslation } from 'react-i18next'
import { ITransaction } from '../../../../constants/transaction'
import { Payee } from '../../../../containers/MovePaymentPages/ManagePayees'
import { PayeeDetails } from '../PayeeDetails'
import './styles.scss'

export interface IPayeeDeletedDetailsProps {
  canceledTransactions: ITransaction[]
  payee?: Payee
  dark?: boolean
}

export const PayeeDeletedDetails: React.FunctionComponent<IPayeeDeletedDetailsProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.deletePayeeModal.${key}`)

  const { payee, canceledTransactions, dark } = props
  return (
    <div className={`payee-deleted-details ${dark ? 'dark' : ''}`}>
      {payee && <PayeeDetails payee={payee} tabletOnly={dark} />}
      {canceledTransactions.length > 0 && (
        <div className="canceled-transactions">
          <div className="section-title">{t('canceled_transactions')}</div>
          {canceledTransactions.map((transaction, index) => (
            <div className="transaction" key={index}>
              <div className="type-icon">
                <img
                  src={`/assets/${transaction.type.toLowerCase()}-transaction${
                    dark ? '-white' : ''
                  }.svg`}
                  alt="transaction type"
                />
              </div>
              <div className="left-info">
                <span className="reference">{transaction.reference}</span>
                <span className="date-and-type">
                  {transaction.date}, {transaction.type}
                </span>
              </div>
              <div className="right-info">
                <span className="amount">£{transaction.amount.toFixed(2)}</span>
                <span className="recipient">{transaction.recipient}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
