import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { DATE_FORMAT } from '../../../constants/date'
import './styles.scss'
import { AlertHistory } from '../../../domain/AlertHistory'
import { getAlertSettingIcon } from '../../../containers/ManageAlertsDetails/IconService'
import { getNumber } from '../../../services/Util'
import moment from 'moment'

interface IAlertHistoryDetailsProps {
  dataList: AlertHistory[] | null
  loadErrorMsg: string | null
  fetchHistory: (query: any) => void
}

const periodDropdownOptions = ['Last 7 Days', 'Last 15 Days', 'Last 30 Days']

export const AlertHistoryDetails: React.FunctionComponent<IAlertHistoryDetailsProps> = (props) => {
  const { t } = useTranslation()
  const { dataList, loadErrorMsg } = props

  const [periodSelection, setPeriodSelection] = useState<string>('Last 7 Days')
  const [customStartDateInput, setCustomStartDateInput] = useState<Date | null>(null)
  const [customEndDateInput, setCustomEndDateInput] = useState<Date | null>(null)

  useEffect(() => {
    if (!dataList) {
      fetchHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getReadableDays = () => {
    return getNumber(periodSelection)
  }

  const fetchHistory = (
    overridePeriodSelection?: string,
    overrideStartDate?: Date,
    overrideEndDate?: Date
  ) => {
    const period = overridePeriodSelection ? overridePeriodSelection : periodSelection
    const startDate = overrideStartDate ? overrideStartDate : customStartDateInput
    const endDate = overrideEndDate ? overrideEndDate : customEndDateInput
    const day = getNumber(period)
    const query: any = {}
    if (day !== undefined) {
      query.startDate = moment().subtract(day, 'day').toISOString()
    } else {
      if (!startDate || !endDate) {
        return
      }
      if (startDate) {
        query.startDate = moment(startDate).toISOString()
      }
      if (endDate) {
        query.endDate = moment(endDate).toISOString()
      }
    }
    props.fetchHistory({ ...query, pageNo: 0, limit: 100, sortBy: 'historyId' })
  }

  // on change dropdown
  const onChangeDropdown = (event: any) => {
    setPeriodSelection(event)
    fetchHistory(event)
  }

  // handle Date Change
  const handleDateChange = (
    fieldName: 'customStartDateInput' | 'customEndDateInput',
    date: Date
  ) => {
    const today = new Date()
    if (date.getFullYear() < today.getFullYear() - 1 || date.getFullYear() > today.getFullYear()) {
      date = today
    }

    if (fieldName === 'customStartDateInput') {
      setCustomStartDateInput(date)
      fetchHistory(undefined, date)
    } else {
      setCustomEndDateInput(date)
      fetchHistory(undefined, undefined, date)
    }
  }

  return (
    <div className="card-list-boxs alert-history-list">
      <div className="debit-card-list">
        <div className="row-line flex-grid head-bar">
          <div className="lefts">
            <i className="icons icon-history" />
            <div className="right-txt">
              <div className="blue-txt">{t('manageAlerts.alertsBannerTop.alert_history')}</div>
              <div className="bottom-txt">
                {t('manageAlertsDetails.alertHistoryDetails.alert_history_got_triggered', {
                  day: getReadableDays(),
                })}
              </div>
            </div>
          </div>
          <div className="rights">
            <div className="drop-module">
              <Dropdown
                bsPrefix="select-period-dropdown"
                onSelect={(event) => onChangeDropdown(event)}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic-period">
                  {t('common.dynamicLabels.' + periodSelection)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {!!periodDropdownOptions &&
                    periodDropdownOptions.map((item, index) => (
                      <Dropdown.Item eventKey={item} key={index}>
                        {t('common.dynamicLabels.' + item)}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {periodSelection === 'Custom date range' && (
              <div className="custom-date">
                <div className="row-line">
                  <div className="title">
                    {t('manageAlertsDetails.alertHistoryDetails.start_date')}
                  </div>
                  <div className="date-boxs">
                    <div className="inputs">
                      <span className="icons icon-calender" />
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        selected={customStartDateInput}
                        popperPlacement="bottom-start"
                        maxDate={new Date()}
                        onChange={(event: Date) => handleDateChange('customStartDateInput', event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row-line">
                  <div className="title">
                    {t('manageAlertsDetails.alertHistoryDetails.end_date')}
                  </div>
                  <div className="date-boxs right-align">
                    <div className="inputs">
                      <span className="icons icon-calender" />
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        selected={customEndDateInput}
                        popperPlacement="bottom-end"
                        minDate={customStartDateInput}
                        maxDate={new Date()}
                        onChange={(event: Date) => handleDateChange('customEndDateInput', event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {loadErrorMsg && (
          <div className="no-history-boxs">
            <p className="center-txt error">{loadErrorMsg}</p>
          </div>
        )}
        {!loadErrorMsg && !dataList && (
          <div className="no-history-boxs">
            <p className="center-txt">{t('common.loading')}</p>
          </div>
        )}
        {dataList && dataList.length === 0 && (
          <div className="no-history-boxs">
            <p className="center-txt">
              {t('manageAlertsDetails.alertHistoryDetails.no_alerts_triggered')}{' '}
              <span className="text-lowercase">{periodSelection}</span>
            </p>
          </div>
        )}
        {dataList && dataList.length > 0 && (
          <div className="history-wrap">
            {dataList.map((item, index) => (
              <div className="row-line flex-grid" key={index}>
                <div className="lefts">
                  <img className="icons" alt="img" src={getAlertSettingIcon(item.event.event)} />
                  <div className="right-txt">
                    <div className="blue-txt">{item.event.eventDescription}</div>
                    <div className="bottom-txt">
                      {item.message} | {item.channel.channelName}
                    </div>
                  </div>
                </div>
                <div className="rights">
                  <div className="gray-txt">
                    {moment(item.createdOn).format('MMM DD YYYY, hh:mm A')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
