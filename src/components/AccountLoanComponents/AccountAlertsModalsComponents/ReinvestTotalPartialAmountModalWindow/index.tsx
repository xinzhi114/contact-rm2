import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'

interface IReinvestTotalPartialAmountModalWindowProps {
  title: string
  optionData: string[]
  onClose?: any
  onConfirm?: any
}

const ReinvestTotalPartialAmountModalWindow: React.FunctionComponent<IReinvestTotalPartialAmountModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const [title] = useState(props.title)
  const [optionData] = useState(props.optionData)

  const [amountToBeReinvested, setAmountToBeReinvested] = useState('')
  const [switchAccountTo, setSwitchAccountTo] = useState('Select')
  const [accept, setAccept] = useState(false)

  // is Enabled Confirm
  const isEnabledConfirm = () => {
    let pass = true

    if (title === 'reinvest_partial_amount') {
      if (amountToBeReinvested === '') {
        pass = false
      }
    }

    if (switchAccountTo === 'Select' || accept === false) {
      pass = false
    }

    return pass
  }

  return (
    <div className="modal-default reinvest-amount-modal">
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
          <div className="blue-title">{t('accountsDashboard.notificationBar.' + title)}</div>
        </div>

        <div className="modal-info">
          {title === 'reinvest_partial_amount' && (
            <div className="row-line">
              <div className="items">
                <div className="label-txt">
                  {t('accountsDashboard.notificationBar.amount_to_be_reinvested')}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="amountToBeReinvested"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency
                    pattern="[0-9]{0,15}"
                    value={amountToBeReinvested}
                    onChange={(event) =>
                      setAmountToBeReinvested(
                        formValidationSvc.validateInputEnteringPattern(event, amountToBeReinvested)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <div className="row-line">
            <div className="items">
              <div className="label-txt">
                {t('accountsDashboard.notificationBar.switch_account_to')}
              </div>
              <div className="control-item">
                <BaseDropdown
                  id="dropdown-basic-switch-account"
                  value={switchAccountTo}
                  options={optionData}
                  onChange={(event: any) => {
                    setSwitchAccountTo(event)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="checkbox-wrap">
              <input
                type="checkbox"
                id="acceptCheck"
                checked={accept}
                onChange={(event) => setAccept(event.target.checked)}
              />
              <label htmlFor="acceptCheck">
                {t('accountsDashboard.notificationBar.terms_conditions')}
              </label>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${isEnabledConfirm() ? '' : 'disabled'}`}
            label={t('common.btns.confirm')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onConfirm({
                amountToBeReinvested,
                switchAccountTo,
              })
            }}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
            href={'#javascript'}
            onClick={(event: any) => {
              props.onClose()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
export default ReinvestTotalPartialAmountModalWindow
