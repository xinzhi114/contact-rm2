import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { movePaymentFrequencyDropdownOptions } from '../../../../config'
import formValidationSvc from '../../../../services/formValidationSvc'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'
import { DATE_FORMAT } from '../../../../constants/date'

interface ISetupRecurringTransferModalWindowProps {
  data?: any
  onClose?: any
  onSave?: any
}

const SetupRecurringTransferModalWindow: React.FunctionComponent<ISetupRecurringTransferModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const [data] = useState(props.data)

  const [frequency, setFrequency] = useState('Select')
  const [transferAmount, setTransferAmount] = useState(data.transferAmount)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [nextPaymentDate, setNextPaymentDate] = useState<Date | undefined>(undefined)
  const [regularTransferAmount, setRegularTransferAmount] = useState('')
  const [finalPaymentDate, setFinalPaymentDate] = useState<Date | undefined>(undefined)
  const [finalTransferAmount, setFinalTransferAmount] = useState('')
  const [fromAccountReference, setFromAccountReference] = useState(data.fromAccountReference)

  return (
    <div className="modal-default update-ransfer-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close label-transparent"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          {t('common.btns.close')}
        </a>
        <div className="title-area">
          <div className="blue-title">
            {t(
              'movePaymentTransferBetweenAccounts.setupRecurringTransferModalWindow.setup_recurring_transfer'
            )}
          </div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="two-group">
              <div className="items">
                <div className="label-txt thin-label">
                  {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.from_account')}
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
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.transfer_date')}
                </div>
                <div className="control-item">
                  <div className="global-date-container date-boxs">
                    <div className="inputs disabled-style">
                      <DatePicker
                        disabled={true}
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={new Date()}
                        selected={data.transferDate}
                        onChange={() => null}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.frequency')}
                </div>
                <div className="control-item">
                  <BaseDropdown
                    id="dropdown-basic-frequency"
                    value={frequency}
                    options={movePaymentFrequencyDropdownOptions}
                    onChange={(event: any) => {
                      setFrequency(event)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t(
                    'movePaymentTransferBetweenAccounts.updateTransferModalWindow.transfer_amount'
                  )}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="transferAmountSetupRecurringTransfer"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency={true}
                    pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                    value={transferAmount}
                    onChange={(event) =>
                      setTransferAmount(
                        formValidationSvc.validateInputEnteringPattern(event, transferAmount)
                      )
                    }
                  />
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.end_date')}
                </div>
                <div className="control-item">
                  <div className="global-date-container date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={data.transferDate}
                        selected={endDate}
                        onChange={(event: Date) => {
                          setEndDate(event)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t(
                    'movePaymentTransferBetweenAccounts.updateTransferModalWindow.next_payment_date'
                  )}
                </div>
                <div className="control-item">
                  <div className="global-date-container date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={data.transferDate}
                        selected={nextPaymentDate}
                        onChange={(event: Date) => {
                          setNextPaymentDate(event)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t(
                    'movePaymentTransferBetweenAccounts.updateTransferModalWindow.regular_transfer_amount'
                  )}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="regularTransferAmount"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency={true}
                    pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                    value={regularTransferAmount}
                    onChange={(event) =>
                      setRegularTransferAmount(
                        formValidationSvc.validateInputEnteringPattern(event, regularTransferAmount)
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t(
                    'movePaymentTransferBetweenAccounts.updateTransferModalWindow.final_payment_date'
                  )}
                </div>
                <div className="control-item">
                  <div className="global-date-container date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={data.transferDate}
                        selected={finalPaymentDate}
                        onChange={(event: Date) => {
                          setFinalPaymentDate(event)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t(
                    'movePaymentTransferBetweenAccounts.updateTransferModalWindow.final_transfer_amount'
                  )}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="finalTransferAmount"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency={true}
                    pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                    value={finalTransferAmount}
                    onChange={(event) =>
                      setFinalTransferAmount(
                        formValidationSvc.validateInputEnteringPattern(event, finalTransferAmount)
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.reference')}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="fromAccountReferenceSetupRecurringTransfer"
                    placeholder={t('common.labels.enter_value')}
                    value={fromAccountReference}
                    onChange={(event) => setFromAccountReference(event.target.value)}
                  />
                </div>
              </div>
              <div className="items" />
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={t('common.btns.save')}
            href={'#javascript'}
            isButton={true}
            onClick={() => {
              props.onSave()
            }}
          />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
export default SetupRecurringTransferModalWindow
