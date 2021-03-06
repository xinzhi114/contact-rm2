import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { AlertChannel, AlertItem } from '../../../domain/AlertItem'
import { getAlertSettingIcon } from '../../../containers/ManageAlertsDetails/IconService'
import { formatAmount, getCurrencySymbol, getNumber } from '../../../services/Util'
import { get, set, capitalize, cloneDeep } from 'lodash'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'
import { EventSubscriptionFiltrationService } from '../../../common/Api/Services/EventSubscriptionFiltrationService'
import { EventUpdateReq } from '../../../common/Api/Domains/req/EventUpdateReq'
import { showErrorMsg } from '../../Toast'
export const THRESHOLD_KEY = 'userThresholdValue.thresholdValue'

interface AlertListProps {
  items: AlertItem[]
  onUpdated: (item: AlertItem) => void
}

/**
 * alert list item
 * @param props the props
 * @constructor
 */
export const AlertList = (props: AlertListProps) => {
  const [popup, setPopup] = useState<any>({})
  const [popupAlert, setPopupAlert] = useState<AlertItem>()
  const { t } = useTranslation()
  const getEnabledText = (item: AlertItem) => {
    if (item.active) {
      return capitalize(
        item.channels
          .filter((c) => c.active)
          .map((c) => c.channel.channelName)
          .join(', ')
          .toLowerCase()
      )
    }
    return ''
  }
  const openPopup = (item: AlertItem) => {
    setPopup({ [item.eventConfId]: true })
    setPopupAlert(cloneDeep(item))
  }
  const closePopup = () => {
    setPopup({})
    setPopupAlert(undefined)
  }
  // enabled Save
  const enabledSave = () => {
    if (!popupAlert) {
      return false
    }
    if (!popupAlert.event.valueEditable) {
      return true
    } else if (
      popupAlert.channels.filter((i) => i.active).length > 0 &&
      !get(popupAlert, THRESHOLD_KEY, '')
    ) {
      return false
    }
    return true
  }

  /**
   * popup checkbox changed
   * @param channel the alert channel
   * @param event the event
   */
  const handlePopupCheckChange = (channel: AlertChannel, event: any) => {
    if (!popupAlert) {
      return
    }
    const newAlert = cloneDeep(popupAlert)
    const index = newAlert.channels.findIndex(
      (i) => i.channel.channelId === channel.channel.channelId
    )
    if (index < 0) {
      return
    }
    newAlert.channels[index].active = event.target.checked
    newAlert.active = newAlert.channels.filter((i) => i.active).length > 0
    if (!newAlert.active && newAlert.event.valueEditable) {
      set(newAlert, THRESHOLD_KEY, '')
    }
    setPopupAlert(newAlert)
  }

  /**
   * save popup
   */
  const savePopup = () => {
    if (!popupAlert) {
      return
    }
    setPopup({})
    const newRow = cloneDeep(popupAlert)
    const updateBody: EventUpdateReq = {
      eventConfId: newRow.eventConfId,
      channelConfig: (newRow.channels || []).map((i) => ({
        channelId: i.channel.channelId,
        channelValue: i.active,
      })),
      active: newRow.active,
    }
    if (newRow.event.valueEditable) {
      const numberValue = parseFloat(get(newRow, THRESHOLD_KEY, '0').toString())
      updateBody.thresholdValue = numberValue
      set(newRow, THRESHOLD_KEY, numberValue)
    }
    if (!updateBody.active) {
      delete updateBody.channelConfig
      delete updateBody.thresholdValue
    }
    ASF.getService(EventSubscriptionFiltrationService)
      .updateAlert(updateBody)
      .then(() => {
        // open success message
        props.onUpdated(newRow)
      })
      .catch((e) => showErrorMsg(e))
  }

  /**
   * render popup tip
   * @param item the alert item
   * @param index the alert index
   */
  const renderTip = (item: AlertItem) => {
    if (!popupAlert) {
      return
    }
    if (!popup[item.eventConfId]) {
      return
    }
    return (
      <div className="tip-panel">
        <div className="top-area">
          <div className="black-title">
            {t('manageAlertsDetails.paymentAlertsDetails.receive_alerts')}
          </div>
          <div className="list">
            <ul>
              {popupAlert.channels &&
                popupAlert.channels.map((channel, i2) => {
                  return (
                    <li key={i2}>
                      <div className="checkbox-wrap">
                        <input
                          type="checkbox"
                          className="text-message"
                          id={`alert-setting-${i2}`}
                          checked={channel.active}
                          onChange={(event) => handlePopupCheckChange(channel, event)}
                        />
                        <label htmlFor={`alert-setting-${i2}`}>
                          {capitalize(channel.channel.channelName)}
                        </label>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>

        {popupAlert.event.event === 'CURRENT_ACCOUNT_ALERT_EVENT:WEEKLY_BALANCE_UPDATE' && (
          <div className="top-txt">
            <div className="icon-txt">
              <i className="icons icon-gray-calender" />
              <p className="txt">
                {t('manageAlertsDetails.accountAlertsDetails.notification_will_sent')}
                <span className="bold">{t('manageAlertsDetails.accountAlertsDetails.monday')}</span>
                {t('manageAlertsDetails.accountAlertsDetails.of_each_week')}
              </p>
            </div>
          </div>
        )}
        {popupAlert.event.valueEditable && (
          <div className="otp-boxs">
            <div className="otp-title flex-grid">
              <div className="lefts">
                {t('manageAlertsDetails.accountAlertsDetails.overdraft_value')}
              </div>
            </div>
            <div className={`inputs ${!popupAlert.active ? 'disabled' : ''}`}>
              <input
                id="currency"
                type="text"
                maxLength={15}
                placeholder={get(popupAlert, 'userThresholdValue.currency.currency', '')}
                pattern="[0-9]*"
                value={get(popupAlert, THRESHOLD_KEY, '').toString()}
                onChange={(event) => {
                  const newItem = cloneDeep(popupAlert)
                  set(newItem, THRESHOLD_KEY, getNumber(event.target.value) || '')
                  setPopupAlert(newItem)
                }}
              />
              <label className="label-transparent" htmlFor="currency">
                {t('common.btns.currency')}
              </label>
            </div>
          </div>
        )}
        <div className="bottom-btns flex-grid">
          <BaseTextLinkButton
            classNameContainer={enabledSave() ? '' : 'disabled'}
            label={t('common.btns.save')}
            href={'#javascript'}
            isButton={true}
            onClick={() => {
              savePopup()
            }}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
            href={'#javascript'}
            onClick={() => {
              closePopup()
            }}
          />
        </div>
      </div>
    )
  }
  return (
    <Fragment>
      {props.items &&
        props.items.map((item, index) => (
          <div className="row-line flex-grid" key={index}>
            <div className="lefts">
              <img className="icons" alt="img" src={getAlertSettingIcon(item.event.event)} />
              <div className="right-txt">
                <div className="blue-txt">{item.event.eventDescription}</div>
                <div className="green-txt">{getEnabledText(item)}</div>
                {item.userThresholdValue && (
                  <div className="green-txt">
                    {getCurrencySymbol(get(item, 'userThresholdValue.currency.currency'))}
                    {formatAmount(get(item, THRESHOLD_KEY, 0))}
                  </div>
                )}
              </div>
            </div>
            <div className="rights">
              {popup[item.eventConfId] && (
                <div className="mobile-gray-cover desktop-hide mobile-show" />
              )}
              <div
                className={`setting-wrap alert-setting-wrap ${
                  popup[item.eventConfId] ? 'open' : ''
                }`}
              >
                <div className="check-round-wrap">
                  <input
                    type="checkbox"
                    id={`check-payment-${index}`}
                    checked={item.active}
                    onClick={(event) => {
                      openPopup(item)
                      event.preventDefault()
                    }}
                    onChange={(event) => event.preventDefault()}
                  />
                  <label htmlFor={`check-payment-${index}`} />
                </div>
                {renderTip(item)}
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  )
}

interface IPaymentAlertsDetailsProps {
  dataList: AlertItem[] | null
  loadErrorMsg: string | null
  onUpdated: () => void
}

export const PaymentAlertsDetails: React.FunctionComponent<IPaymentAlertsDetailsProps> = (
  props
) => {
  const { t } = useTranslation()
  const { dataList, loadErrorMsg, onUpdated } = props
  return (
    <div className="card-list-boxs payment-list-boxs">
      <div className="title-line-bar mobile-hide">
        <i className="icons icon-payment-alert" />
        <span className="txt">{t('manageAlerts.alertsBannerTop.payment_alerts')}</span>
      </div>
      <div className="debit-card-list">
        {loadErrorMsg && <p className="tip-txt">{loadErrorMsg}</p>}
        {!loadErrorMsg && !dataList && <p className="tip-txt">{t('common.loading')}</p>}
        {dataList && <AlertList onUpdated={onUpdated} items={dataList} />}
      </div>
    </div>
  )
}
