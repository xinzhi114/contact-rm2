import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { DATE_FORMAT } from '../../../constants/date'
import './styles.scss'

interface ITransactionHistoryFiltersModalWindowProps {
  t: any
  onApply?: any
  onClose?: any
}

interface ITransactionHistoryFiltersModalWindowState {
  transactionForRadio?: string
  specificDateInput?: Date
  debitsCheck?: boolean
  creditsCheck?: boolean
  chequesClearedUnclearedCheck?: boolean
  interestEarnedCheck?: boolean
}

export class TransactionHistoryFiltersModalWindow extends Component<
  ITransactionHistoryFiltersModalWindowProps,
  ITransactionHistoryFiltersModalWindowState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      transactionForRadio: '',
      specificDateInput: undefined,
      debitsCheck: false,
      creditsCheck: false,
      chequesClearedUnclearedCheck: false,
      interestEarnedCheck: false,
    }
  }

  // handle Check Change
  handleCheckChange(fieldName: string, event: any) {
    this.setState({
      [fieldName]: event.target.checked,
    })
  }

  handleDateChange(date: Date) {
    this.setState({
      specificDateInput: date,
    })
  }

  // handle Input Change
  handleInputChange(fieldName: string, event: any) {
    this.setState({
      [fieldName]: event.target.value.toString(),
    })
  }

  render() {
    const { t } = this.props
    const {
      transactionForRadio,
      specificDateInput,
      debitsCheck,
      creditsCheck,
      chequesClearedUnclearedCheck,
      interestEarnedCheck,
    } = { ...this.state }

    return (
      <div className="modal-default filter-modal">
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
              {t('accountsDashboard.transactionHistoryFiltersModalWindow.filters')}
            </div>
          </div>

          <div className="modal-info">
            <div className="row-line">
              <div className="title">
                {t('accountsDashboard.transactionHistoryFiltersModalWindow.transaction_for')}
              </div>
              <div className="four-checkradio">
                <div className="radio-wrap">
                  <input
                    type="radio"
                    name="specific"
                    id="specificDateModal"
                    value={transactionForRadio}
                    onChange={(event) => this.handleInputChange('transactionForRadio', event)}
                  />
                  <label htmlFor="specificDateModal">
                    {t('accountsDashboard.transactionHistoryFiltersModalWindow.specific_date')}
                  </label>
                </div>
                <div className="radio-wrap">
                  <input
                    type="radio"
                    name="specific"
                    id="specificDate2Modal"
                    value={transactionForRadio}
                    onChange={(event) => this.handleInputChange('transactionForRadio', event)}
                  />
                  <label htmlFor="specificDate2Modal">
                    {t('accountsDashboard.transactionHistoryFiltersModalWindow.period')}
                  </label>
                </div>
                <div className="radio-wrap">
                  <input
                    type="radio"
                    name="specific"
                    id="specificDate3Modal"
                    value={transactionForRadio}
                    onChange={(event) => this.handleInputChange('transactionForRadio', event)}
                  />
                  <label htmlFor="specificDate3Modal">
                    {t(
                      'accountsDashboard.transactionHistoryFiltersModalWindow.' +
                        'number_of_Transactions'
                    )}
                  </label>
                </div>
                <div className="radio-wrap">
                  <input
                    type="radio"
                    name="specific"
                    id="transactionsModal"
                    value={transactionForRadio}
                    onChange={(event) => this.handleInputChange('transactionForRadio', event)}
                  />
                  <label htmlFor="transactionsModal">
                    {t(
                      'accountsDashboard.transactionHistoryFiltersModalWindow.' +
                        'transactions_name'
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="row-line">
              <div className="title">
                {t('accountsDashboard.transactionHistoryFiltersModalWindow.specific_date')}
              </div>
              <div className="date-boxs">
                <div className="inputs">
                  <DatePicker
                    placeholderText={t(
                      'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                    )}
                    dateFormat={DATE_FORMAT}
                    maxDate={new Date()}
                    selected={specificDateInput}
                    onChange={(event: Date) => this.handleDateChange(event)}
                  />
                </div>
              </div>
            </div>
            <div className="row-line">
              <div className="title">
                {t('accountsDashboard.transactionHistoryFiltersModalWindow.transaction_type')}
              </div>
              <div className="four-checkradio">
                <div className="checkbox-wrap">
                  <input
                    type="checkbox"
                    className="Debits"
                    id="debitsModal"
                    checked={debitsCheck}
                    onChange={(event) => this.handleCheckChange('debitsCheck', event)}
                  />
                  <label htmlFor="debitsModal">
                    {t('accountsDashboard.transactionHistoryFiltersModalWindow.debits')}
                  </label>
                </div>
                <div className="checkbox-wrap">
                  <input
                    type="checkbox"
                    className="credits"
                    id="creditsModal"
                    checked={creditsCheck}
                    onChange={(event) => this.handleCheckChange('creditsCheck', event)}
                  />
                  <label htmlFor="creditsModal">
                    {t('accountsDashboard.transactionHistoryFiltersModalWindow.credits')}
                  </label>
                </div>
                <div className="checkbox-wrap">
                  <input
                    type="checkbox"
                    className="cheques"
                    id="chequesModal"
                    checked={chequesClearedUnclearedCheck}
                    onChange={(event) =>
                      this.handleCheckChange('chequesClearedUnclearedCheck', event)
                    }
                  />
                  <label htmlFor="chequesModal">
                    {t('accountsDashboard.transactionHistoryFiltersModalWindow.cheques_cleared')}
                  </label>
                </div>
                <div className="checkbox-wrap">
                  <input
                    type="checkbox"
                    className="interestModal"
                    id="interestModal"
                    checked={interestEarnedCheck}
                    onChange={(event) => this.handleCheckChange('interestEarnedCheck', event)}
                  />
                  <label htmlFor="interestModal">
                    {t('accountsDashboard.transactionHistoryFiltersModalWindow.interest_earned')}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('common.btns.apply')}
              href={'#javascript'}
              isButton
              onClick={() => {
                this.props.onApply()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TransactionHistoryFiltersModalWindow)
