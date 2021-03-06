import React from 'react'
import * as _ from 'lodash'
import { Payee } from '../../../../containers/MovePaymentPages/ManagePayees'
import './styles.scss'
import { useTranslation } from 'react-i18next'

export interface IPayeeDetailsProps {
  payee: Payee
  desktopOnly?: boolean
  tabletOnly?: boolean
  roundBorders?: boolean
}

export const PayeeDetails: React.FunctionComponent<IPayeeDetailsProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string, underlined?: boolean) =>
    _t(
      `movePaymentManagePayees.payeeDetails.${
        underlined ? key.replace(/[A-Z]/g, (v) => `_${v.toLowerCase()}`) : key
      }`
    )

  const { payee, desktopOnly, tabletOnly, roundBorders } = props

  return (
    <div
      className={`payee-details ${desktopOnly ? 'tablet-hide desktop-show' : ''} ${
        tabletOnly ? 'tablet-show desktop-hide' : ''
      } ${roundBorders ? 'round-borders' : ''}`}
    >
      {desktopOnly && <div className="desktop-title">{t('desktop_title')}</div>}
      <div className="section-title">{t('title')}</div>
      {[['type', !payee.bic ? 'uk_payee' : 'non_uk_payee'], ..._.entries(payee)].map(
        (entry, index) =>
          !(!payee.bic && entry[0] === 'iban') &&
          !(!!payee.bic && entry[0] === 'sortCode') && (
            <div className="detail" key={index}>
              <div className="label">{t(entry[0], true)}</div>
              <div className="value">{entry[0] === 'type' ? t(entry[1] as string) : entry[1]}</div>
            </div>
          )
      )}
    </div>
  )
}
