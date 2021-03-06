import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import formValidationSvc from '../../../services/formValidationSvc'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IPINNumberFormProps {
  onSave?: any
  onCancel?: any
}

const PINNumberForm: React.FunctionComponent<IPINNumberFormProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.cardRightBox.${key}`)

  const [oldPIN, setOldPIN] = useState('')
  const [newPIN, setNewPIN] = useState('')
  const [confirmNewPIN, setConfirmNewPIN] = useState('')

  // is Enable Save
  const isEnableSave = () => {
    return (
      oldPIN.length === 6 &&
      newPIN.length === 6 &&
      confirmNewPIN.length === 6 &&
      newPIN === confirmNewPIN
    )
  }

  // show Confirm Error
  const showConfirmError = () => {
    let error = false

    if (newPIN.length !== 0 && confirmNewPIN.length !== 0 && newPIN !== confirmNewPIN) {
      error = true
    }

    return error
  }

  return (
    <div className={`pin-number-form`}>
      <div className="row-line">
        <div className="items">
          <div className="label-txt">{t('old_pin')}</div>
          <div className="control-item">
            <BaseTextInput
              id="oldPIN"
              pattern="[0-9]{0,6}"
              value={oldPIN}
              onChange={(event) =>
                setOldPIN(formValidationSvc.validateInputEnteringPattern(event, oldPIN))
              }
            >
              <span className="icons icon-eye" />
            </BaseTextInput>
          </div>
        </div>
      </div>

      <div className="row-line">
        <div className="items">
          <div className="label-txt">{t('new_pin')}</div>
          <div className="control-item">
            <BaseTextInput
              id="newPIN"
              pattern="[0-9]{0,6}"
              value={newPIN}
              onChange={(event) =>
                setNewPIN(formValidationSvc.validateInputEnteringPattern(event, newPIN))
              }
            >
              <span className="icons icon-eye" />
            </BaseTextInput>
          </div>
          <div className="description-txt">{t('debit_card_pin_must_be')}</div>
        </div>
        <div className="items">
          <div className="label-txt">{t('confirm_new_pin')}</div>
          <div className="control-item">
            <BaseTextInput
              showError={showConfirmError()}
              errorMessageLabel={''}
              id="confirmNewPIN"
              pattern="[0-9]{0,6}"
              value={confirmNewPIN}
              onChange={(event) =>
                setConfirmNewPIN(
                  formValidationSvc.validateInputEnteringPattern(event, confirmNewPIN)
                )
              }
            >
              <span className="icons icon-eye" />
            </BaseTextInput>
          </div>
        </div>
      </div>

      <div className="bottom-btns">
        <BaseTextLinkButton
          classNameContainer={`btn-save ${isEnableSave() ? '' : 'disabled'}`}
          label={_t('common.btns.save')}
          href={'#javascript'}
          isButton={true}
          onClick={() => {
            props.onSave()
          }}
        />

        <BaseTextLinkButton
          label={_t('common.btns.cancel')}
          href={'#javascript'}
          onClick={() => {
            props.onCancel()
          }}
        />
      </div>
    </div>
  )
}

export default PINNumberForm
