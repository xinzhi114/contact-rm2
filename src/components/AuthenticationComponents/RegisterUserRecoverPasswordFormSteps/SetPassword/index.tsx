import React, { useEffect, useState } from 'react'
import { IRegisterUserRecoverPasswordFormStepsEnum } from '../../../../config/registerUserRecoverPassword'
import { useTranslation } from 'react-i18next'
import {
  RegisterUserRecoverPasswordFormValue,
  SetPasswordFormValue,
} from '../../../../constants/reviewableForm/registerUserRecoverPassword'
import { ReviewFormStepComponent } from '../../../../constants/reviewableForm/reviewableForm'
import './styles.scss'
import { IBaseFormFields } from '../../../../constants/baseForm'
import BaseForm from '../../../BaseForm'
import { PasswordRequirements } from './PasswordRequirements'
import { Button } from 'react-bootstrap'
import generator from 'generate-password'
import {
  RegisterOTPEvaluateRsp,
  RegisterRsp,
} from '../../../../common/Api/Domains/rsp/RegistrationRsp'
import { storageService } from '../../../../services/Util'
import {
  REGISTER_CONFIRM_RSP_LOCAL_KEY,
  REGISTER_OTP_RSP_LOCAL_KEY,
  REGISTER_RSP_LOCAL_KEY,
} from '../RegisterCommon'
import { ASF } from '../../../../common/Api/Services/ApiServiceFactory'
import { CustomerRegistrationService } from '../../../../common/Api/Services/CustomerRegistrationService'
import { showErrorMsg } from '../../../Toast'
import { useIsMounted } from '../../../App/UseIsMounted'

export const SetPassword: ReviewFormStepComponent<
  SetPasswordFormValue,
  RegisterUserRecoverPasswordFormValue,
  IRegisterUserRecoverPasswordFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.formSteps.setPassword.${key}`)
  const isMounted = useIsMounted()
  const { formValue, onChange, formStepsEnum, onEditClick } = props

  const [showPasswords, setShowPasswords] = useState<[boolean, boolean]>([false, false])
  const [loading, setLoading] = useState(false)
  const [otpContext, setOtpContext] = useState<RegisterOTPEvaluateRsp>()
  const [registerContext, setRegisterContext] = useState<RegisterRsp>()

  useEffect(() => {
    storageService.getData<RegisterOTPEvaluateRsp>(REGISTER_OTP_RSP_LOCAL_KEY).then((rsp) => {
      setOtpContext(rsp)
    })
    storageService.getData<RegisterRsp>(REGISTER_RSP_LOCAL_KEY).then((rsp) => {
      setRegisterContext(rsp)
    })
  }, [])

  const passwordStrength = [/[a-z]/, /[0-9]/, /[~:#%^&$*/?]/].filter(
    (matchRegex) => matchRegex.exec(formValue.password) !== null
  ).length

  const fields: IBaseFormFields = {
    password: {
      type: 'text',
      inputType: showPasswords[0] ? undefined : 'password',
      value: formValue.password,
      onChange: (newValue) =>
        onChange({
          ...formValue,
          password: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
        }),
      label: t('password__label'),
      placeholder: t('password__placeholder'),
      showHelp: false,
      rightText: (
        <img
          src="/assets/icon-expand.svg"
          alt="expand"
          onClick={() => setShowPasswords([!showPasswords[0], !showPasswords[0]])}
        />
      ),
      appendChildren:
        formValue.password.length >= 8 && formValue.password.length <= 24 ? (
          <div className="password-strength">
            <div className="indicators">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`indicator ${index <= passwordStrength ? 'active' : ''} strength-${
                    passwordStrength === 1 ? 'weak' : passwordStrength === 2 ? 'good' : 'strong'
                  }`}
                />
              ))}
            </div>
            <span>
              {passwordStrength === 1
                ? t('weak')
                : passwordStrength === 2
                ? t('good')
                : t('strong')}
            </span>
          </div>
        ) : undefined,
    },
    confirmPassword: {
      type: 'text',
      inputType: showPasswords[1] ? undefined : 'password',
      value: formValue.confirmPassword,
      onChange: (newValue) =>
        onChange({
          ...formValue,
          confirmPassword: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
        }),
      label: t('confirm_password__label'),
      placeholder: t('confirm_password__placeholder'),
      showHelp: false,
      rightText: (
        <img
          src="/assets/icon-expand.svg"
          alt="expand"
          onClick={() => setShowPasswords([!showPasswords[1], !showPasswords[1]])}
        />
      ),
    },
  }

  const handleSuggestPassword = () => {
    const password = generator.generate({
      length: 16,
      numbers: true,
      uppercase: false,
      symbols: true,
      strict: true,
      exclude: '!@$()+_-=}{[]|;".><,`',
    })
    onChange({ password, confirmPassword: '' })
    setShowPasswords([true, true])
  }

  /**
   * on submit
   */
  const onSubmit = () => {
    if (!otpContext || !registerContext) {
      onEditClick(formStepsEnum.SUBMIT)
      return
    }

    setLoading(true)
    ASF.getService(CustomerRegistrationService)
      .confirm(
        {
          tempUUID: registerContext.tempToken,
          password: formValue.password,
          confirmPassword: formValue.confirmPassword,
        },
        otpContext.otpResponse['x-mfaToken']
      )
      .then((rsp) => {
        if (isMounted.current) {
          storageService.storeData(REGISTER_CONFIRM_RSP_LOCAL_KEY, rsp.body).then(() => {
            onEditClick(formStepsEnum.SUBMIT)
          })
        }
      })
      .catch((e) => showErrorMsg(e))
      .finally(() => {
        if (isMounted.current) {
          setLoading(false)
        }
      })
  }

  return (
    <div className="set-password-step">
      <div className="top-section">
        <span className="section-title">{t('title')}</span>
        <BaseForm fields={fields} />
      </div>
      <div className="requirements-section">
        <PasswordRequirements
          password={formValue.password}
          onSuggestClick={() => handleSuggestPassword()}
        />
      </div>
      <div className="submit-section">
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={
            passwordStrength < 3 || formValue.password !== formValue.confirmPassword || loading
          }
        >
          {loading ? _t('common.loading') : t('save_my_password')}
        </Button>
      </div>
    </div>
  )
}
