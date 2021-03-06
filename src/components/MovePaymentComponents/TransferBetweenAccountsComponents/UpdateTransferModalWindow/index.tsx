import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import DatePicker from 'react-datepicker'
import formValidationSvc from '../../../../services/formValidationSvc'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { DATE_FORMAT } from '../../../../constants/date'

interface IUpdateTransferModalWindowProps {
  t: any
  selectData?: any
  data?: any
  individualBusiness: string
  onClose?: any
}

interface IUpdateTransferModalWindowState {
  data?: any
}

export class UpdateTransferModalWindow extends Component<
  IUpdateTransferModalWindowProps,
  IUpdateTransferModalWindowState
> {
  constructor(props: any) {
    super(props)
    const { data } = props
    this.state = {
      data,
    }
  }

  /**
   * save data
   * @param params
   */
  saveData(params: any) {
    const { data } = this.state
    data[params.key] = params.value
    this.setState(data)
  }

  render() {
    const { t, individualBusiness } = this.props
    const { data } = this.state
    return (
      <div className="modal-default update-ransfer-modal">
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
              {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.update_transfer')}
            </div>
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
              </div>
              <div className="two-group">
                <div className="items">
                  <div className="label-txt thin-label">
                    {t(
                      'movePaymentTransferBetweenAccounts.updateTransferModalWindow.' +
                        'from_account'
                    )}
                  </div>
                  <div className="values">
                    <div className="bold-txt">{data.fromAccount}</div>
                    <div className="phone-number">{data.fromAccountNumber}</div>
                  </div>
                  <i className="icons icon-right-arrow" />
                </div>
                <div className="items">
                  <div className="label-txt thin-label">
                    {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.to_account')}
                  </div>
                  <div className="values">
                    <div className="bold-txt">{data.toAccount}</div>
                    <div className="phone-number">{data.toAccountNumber}</div>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="top-title">
                  {t(
                    'movePaymentTransferBetweenAccounts.deleteTransferModalWindow.' +
                      'transfer_details'
                  )}
                </div>
              </div>
              <div className="two-group">
                <div className="items">
                  <div className="label-txt">
                    {t(
                      'movePaymentTransferBetweenAccounts.updateTransferModalWindow.' +
                        'transfer_amount'
                    )}
                  </div>
                  <div className="control-item">
                    <BaseTextInput
                      id="transferAmountUpdateTransfer"
                      placeholder={t('common.labels.enter_value')}
                      showCurrency
                      pattern="[0-9]{0,15}"
                      value={data.transferAmount}
                      onChange={(event) =>
                        this.saveData({
                          key: 'transferAmount',
                          value: formValidationSvc.validateInputEnteringPattern(
                            event,
                            data.transferAmount
                          ),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="items">
                  <div className="label-txt">
                    {individualBusiness === 'individual'
                      ? t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.reference')
                      : t(
                          'movePaymentTransferBetweenAccounts.updateTransferModalWindow.from_account_reference'
                        )}
                  </div>
                  <div className="control-item">
                    <BaseTextInput
                      id="fromAccountReferenceUpdateTransfer"
                      placeholder={t('common.labels.enter_value')}
                      pattern="[\s\S]{0,50}"
                      value={data.fromAccountReference}
                      onChange={(event) =>
                        this.saveData({
                          key: 'fromAccountReference',
                          value: formValidationSvc.validateInputEnteringPattern(
                            event,
                            data.fromAccountReference
                          ),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="two-group">
                <div className="items">
                  <div className="label-txt">
                    {t(
                      'movePaymentTransferBetweenAccounts.updateTransferModalWindow.transfer_date'
                    )}
                  </div>
                  <div className="control-item">
                    <div className="global-date-container date-boxs">
                      <div className="inputs disabled-style">
                        <DatePicker
                          disabled
                          placeholderText={t(
                            'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                          )}
                          dateFormat={DATE_FORMAT}
                          minDate={new Date()}
                          selected={data.transferDate}
                          onChange={(event: Date) => {
                            this.saveData({
                              key: 'transferDate',
                              value: event,
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.update')}
              href={'#javascript'}
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
export default withTranslation()(UpdateTransferModalWindow)
