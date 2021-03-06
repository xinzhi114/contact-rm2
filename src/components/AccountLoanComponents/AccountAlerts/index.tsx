import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { accountAlertsSettings } from '../../../config'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import ReinvestTotalPartialAmountModalWindow from '../AccountAlertsModalsComponents/ReinvestTotalPartialAmountModalWindow'
import './styles.scss'

interface IAccountAlertsProps {
  accountName: string
  dataList: string[]
  closeAccountAlerts?: any
}

const AccountAlerts: React.FunctionComponent<IAccountAlertsProps> = (props) => {
  const { t } = useTranslation()

  const [accountName, setAccountName] = useState(props.accountName)
  const [isShowAlerts, setIsShowAlerts] = useState(true)
  const [
    isShowAccountMaturityConfirmModalWindow,
    setIsShowAccountMaturityConfirmModalWindow,
  ] = useState(false)
  const [isShowReinvestTotalAmountModalWindow, setIsShowReinvestTotalAmountModalWindow] = useState(
    false
  )
  const [
    isShowReinvestTotalConfirmedModalWindow,
    setIsShowReinvestTotalConfirmedModalWindow,
  ] = useState(false)
  const [
    isShowReinvestPartialAmountModalWindow,
    setIsShowReinvestPartialAmountModalWindow,
  ] = useState(false)
  const [
    isShowReinvestPartialConfirmedModalWindow,
    setIsShowReinvestPartialConfirmedModalWindow,
  ] = useState(false)

  const [amountToBeReinvested, setAmountToBeReinvested] = useState('')
  const [switchAccountTo, setSwitchAccountTo] = useState('Select')

  useEffect(() => {
    setIsShowAlerts(true)
  }, [props.dataList])

  useEffect(() => {
    setAccountName(props.accountName)
  }, [props.accountName])

  // click Button
  const clickButton = (itemLabel: string) => {
    switch (itemLabel) {
      case 'pay_at_maturity':
        setIsShowAccountMaturityConfirmModalWindow(true)
        setIsShowAlerts(false)
        break
      case 'reinvest_total':
        setIsShowReinvestTotalAmountModalWindow(true)
        break
      case 'reinvest_partial':
        setIsShowReinvestPartialAmountModalWindow(true)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      {isShowAccountMaturityConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={'Account maturity'}
          messageText={`${accountName} has been transferred<br/> to Maturity Account.`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowAccountMaturityConfirmModalWindow(false)
          }}
        />
      )}

      {isShowReinvestTotalAmountModalWindow && (
        <ReinvestTotalPartialAmountModalWindow
          title={'reinvest_total_amount'}
          optionData={props.dataList}
          onConfirm={(dataModal: any) => {
            setAmountToBeReinvested(dataModal.amountToBeReinvested)
            setSwitchAccountTo(dataModal.switchAccountTo)

            setIsShowReinvestTotalAmountModalWindow(false)
            setIsShowReinvestTotalConfirmedModalWindow(true)
            setIsShowAlerts(false)
          }}
          onClose={() => {
            setIsShowReinvestTotalAmountModalWindow(false)
          }}
        />
      )}

      {isShowReinvestPartialAmountModalWindow && (
        <ReinvestTotalPartialAmountModalWindow
          title={'reinvest_partial_amount'}
          optionData={props.dataList}
          onConfirm={(dataModal: any) => {
            setAmountToBeReinvested(dataModal.amountToBeReinvested)
            setSwitchAccountTo(dataModal.switchAccountTo)

            setIsShowReinvestPartialAmountModalWindow(false)
            setIsShowReinvestPartialConfirmedModalWindow(true)
            setIsShowAlerts(false)
          }}
          onClose={() => {
            setIsShowReinvestPartialAmountModalWindow(false)
          }}
        />
      )}

      {isShowReinvestTotalConfirmedModalWindow && (
        <GeneralConfirmModalWindow
          titleText={'Reinvest total confirmed'}
          messageText={`${accountName} has transferred<br/> to ${switchAccountTo}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowReinvestTotalConfirmedModalWindow(false)
          }}
        />
      )}

      {isShowReinvestPartialConfirmedModalWindow && (
        <GeneralConfirmModalWindow
          titleText={'Reinvest partial confirmed'}
          messageText={`£${amountToBeReinvested} of ${accountName} has been<br/> transferred to ${switchAccountTo}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowReinvestPartialConfirmedModalWindow(false)
          }}
        />
      )}

      <div className={`center-blue-bar flex-grid ${isShowAlerts ? '' : 'hide'}`}>
        <div className="lefts">
          <i className="icon-account" />
          <div className="right-txt">
            <div className="white-title">
              {t('accountsDashboard.notificationBar.account_alerts')}
            </div>
            <div className="thin-txt">
              {t('accountsDashboard.notificationBar.your_fixed_isa_account')}
            </div>
          </div>
        </div>
        <div className="rights">
          {accountAlertsSettings &&
            accountAlertsSettings.map((item, index) => (
              <BaseTextLinkButton
                key={index}
                label={t('accountsDashboard.notificationBar.' + item.label)}
                href={'#javascript'}
                isButton
                onClick={() => {
                  clickButton(item.label)
                }}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountAlerts
