import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Payee } from '../../../containers/MovePaymentPages/ManagePayees'
import { MoreActionsModal } from '../ManagePayeeComponents/MoreActionsModal'
import './styles.scss'

export interface PayeePaymentDetails {
  amount?: string
}

export interface IPayeeListProps {
  payees: (Payee & PayeePaymentDetails)[]
  viewMode: 'grid' | 'list'
  hideActionIcons?: boolean
  onUpdate?: (payee: Payee) => void
  onDelete?: (payee: Payee) => void
  onPayeeClick?: (payee: Payee & PayeePaymentDetails, index: number) => void
}

export const PayeeList: React.FunctionComponent<IPayeeListProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.payeeList.${key}`)

  const { payees, viewMode, hideActionIcons, onUpdate, onDelete, onPayeeClick } = props

  const [showMoreActionsModal, setShowMoreActionsModal] = useState<Payee | null>(null)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleResize = (e: MediaQueryListEvent) => {
      if (!e.matches && showMoreActionsModal) {
        setShowMoreActionsModal(null)
      }
    }
    mql.addEventListener('change', handleResize)
    return () => {
      mql.removeEventListener('change', handleResize)
    }
  })

  return (
    <div className="payee-list-wrapper" tabIndex={0}>
      <div className={`payee-list ${viewMode === 'grid' ? 'grid-view' : ''}`}>
        {payees.map((payee, index) => {
          const columns: { label: string; value: string }[] = [
            {
              label: 'account_number',
              value: payee.accountNumber,
            },
            {
              label: 'sort_code',
              value: payee.sortCode as string,
            },
            {
              label: 'payee_reference',
              value: payee.reference,
            },
          ]
          if (payee.bic) {
            columns.splice(1, 1)
            columns.push(
              ...[
                {
                  label: 'iban',
                  value: payee.iban,
                },
                {
                  label: 'bic',
                  value: payee.bic,
                },
              ]
            )
          }
          if (payee.amount !== undefined) {
            columns.push({
              label: 'amount',
              value: payee.amount,
            })
          }
          return (
            <React.Fragment key={index}>
              <div
                className={`payee-item desktop-show tablet-hide ${
                  index === payees.length - 1 ? 'last' : ''
                }`}
                onClick={() => onPayeeClick && onPayeeClick(payee, index)}
              >
                <div
                  className="avatar"
                  style={{
                    backgroundColor: `${payee.userNameColor}`,
                    color: `${payee.userNameLabelColor}`,
                  }}
                >
                  {payee.name
                    .split(' ')
                    .map((segment) => segment[0])
                    .join('')}
                </div>
                <div className="name">{payee.name}</div>
                {columns.map((column, innerIndex) => (
                  <div key={innerIndex} className={`payee-col ${column.label.replace('_', '-')}`}>
                    <span className="label">{t(column.label)}</span>
                    <span className="value">{column.value}</span>
                  </div>
                ))}
                <div className="actions">
                  {!hideActionIcons ? (
                    <>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`update-${payee.accountNumber}`}>{t('update')}</Tooltip>
                        }
                      >
                        <img
                          className="update"
                          src="/assets/green-update.svg"
                          alt="update"
                          onClick={() => onUpdate && onUpdate(payee)}
                        />
                      </OverlayTrigger>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`delete-${payee.accountNumber}`}>{t('delete')}</Tooltip>
                        }
                      >
                        <img
                          className="delete"
                          src="/assets/red-delete.svg"
                          alt="delete"
                          onClick={() => onDelete && onDelete(payee)}
                        />
                      </OverlayTrigger>
                    </>
                  ) : (
                    <div className="actions">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="payee-item desktop-hide tablet-show"
                onClick={() => onPayeeClick && onPayeeClick(payee, index)}
              >
                <div className="avatar">
                  {payee.name
                    .split(' ')
                    .map((segment) => segment[0])
                    .join('')}
                </div>
                {viewMode === 'grid' ? (
                  <React.Fragment>
                    <div className="name">{payee.name}</div>
                    <div className="account-number">{payee.accountNumber}</div>
                    <div className="payee-reference">{payee.reference}</div>
                    {payee.bic && (
                      <React.Fragment>
                        <div className="bic">
                          {t('bic')}: {payee.bic}
                        </div>
                        <div className="iban">
                          {t('iban')}: {payee.iban}
                        </div>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="left-info">
                      <div className="name">{payee.name}</div>
                      <div className="payee-reference">{payee.reference}</div>
                      {payee.bic && <div className="account-number">{payee.accountNumber}</div>}
                    </div>
                    <div className="right-info">
                      {!payee.bic ? (
                        <>
                          <div className="iban">{payee.iban}</div>
                          <div className="sort-code">{payee.sortCode}</div>
                        </>
                      ) : (
                        <>
                          <div className="bic">{payee.bic}</div>
                          <div className="iban">{payee.iban}</div>
                        </>
                      )}
                    </div>
                  </React.Fragment>
                )}
                <div className="actions" onClick={() => setShowMoreActionsModal(payee)}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      {showMoreActionsModal && (
        <MoreActionsModal
          onUpdate={() => {
            if (onUpdate) {
              onUpdate(showMoreActionsModal)
            }
            setShowMoreActionsModal(null)
          }}
          onDelete={() => {
            if (onDelete) {
              onDelete(showMoreActionsModal)
            }
            setShowMoreActionsModal(null)
          }}
          onClose={() => setShowMoreActionsModal(null)}
        />
      )}
    </div>
  )
}
