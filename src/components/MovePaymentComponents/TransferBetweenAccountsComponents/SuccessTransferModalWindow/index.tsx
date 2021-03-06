import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { amountToFloat, formatAmount } from '../../../../services/Util'
import moment from 'moment'
import './styles.scss'

interface ISuccessTransferModalWindowProps {
  t: any
  data: {
    fromAccount: string
    fromAccountNumber: string
    toAccount: string
    toAccountNumber: string
    transferDate: Date | undefined
    transferAmount: string
    fromAccountReference: string
  }
  individualBusiness: string
  onClose?: any
  onSetupRecurringTransfer?: any
}

interface ISuccessTransferModalWindowState {
  data: {
    fromAccount: string
    fromAccountNumber: string
    toAccount: string
    toAccountNumber: string
    transferDate: Date | undefined
    transferAmount: string
    fromAccountReference: string
  }
}

export class SuccessTransferModalWindow extends Component<
  ISuccessTransferModalWindowProps,
  ISuccessTransferModalWindowState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      data: props.data,
    }
  }

  render() {
    const { t, individualBusiness } = this.props
    const { data } = this.state
    return (
      <div className="modal-default success-transfer-modal">
        <div className="modal-mains">
          <a
            href="#javascript"
            className="btn-close label-transparent"
            onClick={(event) => {
              this.props.onClose()
              event.preventDefault()
            }}
          >
            {t('common.btns.close')}
          </a>
          <div className="title-area">
            <div className="blue-title">
              {t('movePaymentTransferBetweenAccounts.successTransferModalWindow.transfer_complete')}
            </div>
          </div>

          <div className="modal-info">
            <div className="row-line">
              <div className="center-info">
                <div className="icons done-icons">
                  <img src="/assets/Illustrations-confirm.svg" alt="svg" />
                </div>
                <div className="white-txt">
                  {t('movePaymentTransferBetweenAccounts.successTransferModalWindow.amount_of')}{' '}
                  <strong>£{data.transferAmount}</strong>{' '}
                  {t(
                    'movePaymentTransferBetweenAccounts.successTransferModalWindow.has_been_transferred_from'
                  )}{' '}
                  <br />"<strong>{data.fromAccount}</strong>"{' '}
                  {t('movePaymentTransferBetweenAccounts.successTransferModalWindow.to')} "
                  <strong>{data.toAccount}</strong>"{' '}
                  {t('movePaymentTransferBetweenAccounts.successTransferModalWindow.account')}
                </div>
              </div>
            </div>
            <div className="bottom-data">
              <div className="group">
                <div className="top-label">From account</div>
                <div className="values">{data.fromAccount}</div>
              </div>
              <div className="group">
                <div className="top-label">To account</div>
                <div className="values">{data.toAccount}</div>
              </div>
              <div className="group">
                <div className="top-label">
                  {individualBusiness === 'individual'
                    ? t('movePaymentTransferBetweenAccounts.deleteTransferModalWindow.reference')
                    : t(
                        'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.from_account_reference'
                      )}
                </div>
                <div className="values">{data.fromAccountReference}</div>
              </div>
              <div className="group">
                <div className="top-label">transfer date</div>
                <div className="values">
                  {data.transferDate ? moment(data.transferDate).format('DD MMMM YYYY') : ''}
                </div>
              </div>
              <div className="group">
                <div className="top-label">Transfer amount</div>
                <div className="values green-txt">
                  £ {formatAmount(amountToFloat(data.transferAmount))}
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('movePaymentTransferBetweenAccounts.successTransferModalWindow.complete')}
              href={'/movePaymentPages'}
              isNavLink
              isButton
            />

            <BaseTextLinkButton
              classNameContainer="btn-txt-link"
              label={t(
                'movePaymentTransferBetweenAccounts.successTransferModalWindow.setup_recurring_transfer'
              )}
              href={'#javascript'}
              onClick={(event: any) => {
                this.props.onSetupRecurringTransfer()
                event.preventDefault()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(SuccessTransferModalWindow)
