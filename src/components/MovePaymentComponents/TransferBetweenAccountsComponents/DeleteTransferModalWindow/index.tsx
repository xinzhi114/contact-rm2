import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IDeleteTransferModalWindowProps {
  t: any
  data?: any
  individualBusiness: string
  onApply?: any
  onClose?: any
}

interface IDeleteTransferModalWindowState {
  data?: any
}

export class DeleteTransferModalWindow extends Component<
  IDeleteTransferModalWindowProps,
  IDeleteTransferModalWindowState
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
      <div className="modal-default delete-ransfer-modal">
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
              <i className="icons icon-download" />
              {t('movePaymentTransferBetweenAccounts.deleteTransferModalWindow.delete_transfer')}
            </div>
          </div>
          <div className="top-line">
            {t('movePaymentTransferBetweenAccounts.deleteTransferModalWindow.sure_delete')}
          </div>
          <div className="modal-info">
            <div className="row-line">
              <div className="group">
                <div className="top-title">
                  {t(
                    'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.' +
                      'account_details'
                  )}
                </div>
                <div className="three-drop top-three-drop">
                  <div className="items">
                    <div className="label-txt thin-label">
                      {t(
                        'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.' +
                          'from_account'
                      )}
                    </div>
                    <div className="values">
                      <div className="bold-txt">{data.fromAccount}</div>
                      <div className="phone-number">{data.fromAccountNumber}</div>
                    </div>
                    <i className="right-line-arrow">&nbsp;</i>
                  </div>
                  <div className="items">
                    <div className="label-txt thin-label">
                      {t(
                        'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.' +
                          'to_account'
                      )}
                    </div>
                    <div className="values">
                      <div className="bold-txt">{data.toAccount}</div>
                      <div className="phone-number">{data.toAccountNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="top-title flex-grid">
                  {t(
                    'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.' +
                      'transfer_details'
                  )}
                </div>
                <div className="three-drop ">
                  <div className="items">
                    <div className="label-txt">
                      {t(
                        'movePaymentTransferBetweenAccounts.updateTransferModalWindow.transfer_date'
                      )}
                    </div>
                    <div className="values">
                      {data.transferDate ? moment(data.transferDate).format('DD MMMM YYYY') : ''}
                    </div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {t(
                        'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.' +
                          'transfer_amount'
                      )}
                    </div>
                    <div className="values">£ {data.transferAmount}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {individualBusiness === 'individual'
                        ? t(
                            'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.reference'
                          )
                        : t(
                            'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.from_account_reference'
                          )}
                    </div>
                    <div className="values">{data.fromAccountReference}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('movePaymentTransferBetweenAccounts.deleteTransferModalWindow.delete')}
              href={'/movePaymentPages'}
              isNavLink
              isButton
              onClick={() => {
                this.props.onClose()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(DeleteTransferModalWindow)
