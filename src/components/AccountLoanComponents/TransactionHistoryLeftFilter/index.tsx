import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { DATE_FORMAT } from '../../../constants/date'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-bootstrap'
import { FlexDialog } from '../../../components/FlexLayoutComponents/FlexDialog'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseDropdown } from '../../../components/BaseForm/BaseFormFields/BaseDropdown'
import { monthFilterDropdownOptions } from '../../../config'
import moment from 'moment'
import './styles.scss'

interface ITransactionHistoryLeftFilterProps {
  onApply: () => void
  onReset: () => void
}

// const transactionStatusRadio = ['monthly', 'specific_period']
const TransactionHistoryLeftFilter: React.FunctionComponent<ITransactionHistoryLeftFilterProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.transactionLeftFilter.${key}`)

  const { onApply, onReset } = props

  const [transactionStatusMonthly, setTransactionStatusMonthly] = useState(true)
  const [transactionStatusSpecificPeriod, setTransactionStatusSpecificPeriod] = useState(false)

  const [selectMonthFilter, setSelectMonthFilter] = useState('Last 3 months')

  const [fromDate, setFromDate] = useState<Date | undefined>(new Date())
  const [toDate, setToDate] = useState<Date | undefined>(new Date())

  const [clearedType, setClearedType] = useState(true)
  const [unclearedType, setUnclearedType] = useState(true)

  // click Reset
  const clickReset = () => {
    setTransactionStatusMonthly(true)
    setTransactionStatusSpecificPeriod(false)
    setSelectMonthFilter('Last 3 months')
    setFromDate(new Date())
    setToDate(new Date())
    setClearedType(true)
    setUnclearedType(true)
  }

  return (
    <FlexDialog fullHeight className="transaction-history-left-filter">
      <Modal.Body>
        <div>
          <div className="black-title">{t('filters')}</div>

          <div className="items">
            <div className="top-gray-title">{t('transaction_status')}</div>
            <div className="radio-group">
              <div className="radio-wrap">
                <input
                  type="radio"
                  name="specific"
                  id="transactionStatusMonthly"
                  checked={transactionStatusMonthly}
                  onChange={(event) => {
                    setTransactionStatusMonthly(event.target.checked)
                    setTransactionStatusSpecificPeriod(false)
                  }}
                />
                <label htmlFor="transactionStatusMonthly">{t('monthly')}</label>
              </div>
              <div className="radio-wrap">
                <input
                  type="radio"
                  name="specific"
                  id="transactionStatusSpecificPeriod"
                  checked={transactionStatusSpecificPeriod}
                  onChange={(event) => {
                    setTransactionStatusMonthly(false)
                    setTransactionStatusSpecificPeriod(event.target.checked)
                  }}
                />
                <label htmlFor="transactionStatusSpecificPeriod">{t('specific_period')}</label>
              </div>
            </div>
          </div>

          {transactionStatusMonthly && (
            <div className="items">
              <div className="top-gray-title">{t('monthly_filter')}</div>
              <BaseDropdown
                id="dropdown-basic-monthly-filter"
                hideBorder
                value={selectMonthFilter}
                options={monthFilterDropdownOptions}
                onChange={(event: any) => {
                  setSelectMonthFilter(event)
                }}
              />
            </div>
          )}

          {transactionStatusSpecificPeriod && (
            <div className="items">
              <div className="date-group">
                <div className="date-item">
                  <div className="top-gray-title">{t('from')}</div>
                  <div className="control-item date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={new Date(new Date().getTime() - 365 * 24 * 3600 * 1000)}
                        selected={fromDate}
                        onChange={(event: Date) => {
                          setFromDate(event)
                          if (moment(event) > moment(toDate)) {
                            setToDate(event)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="date-item">
                  <div className="top-gray-title">{t('to')}</div>
                  <div className="control-item date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={fromDate}
                        selected={toDate}
                        onChange={(event: Date) => {
                          setToDate(event)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="items">
            <div className="top-gray-title">{t('transaction_type')}</div>
            <div className="check-group">
              <div className="checkbox-wrap">
                <input
                  type="checkbox"
                  id="clearedType"
                  checked={clearedType}
                  onChange={(event) => setClearedType(event.target.checked)}
                />
                <label htmlFor="clearedType">{t('cleared')}</label>
              </div>
              <div className="checkbox-wrap">
                <input
                  type="checkbox"
                  id="unclearedType"
                  checked={unclearedType}
                  onChange={(event) => setUnclearedType(event.target.checked)}
                />
                <label htmlFor="unclearedType">{t('uncleared')}</label>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="bottom-btn">
          <BaseTextLinkButton
            label={_t('common.btns.apply')}
            href={'#javascript'}
            isButton
            onClick={() => {
              onApply()
            }}
          />

          <BaseTextLinkButton
            label={_t('common.btns.reset')}
            href={'#javascript'}
            onClick={() => {
              clickReset()
              onReset()
            }}
          />
        </div>
      </Modal.Footer>
    </FlexDialog>
  )
}

export default TransactionHistoryLeftFilter
