import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IBaseFormFields } from '../../../../constants/baseForm'
import { IAppState } from '../../../../store/constants'
import BaseForm from '../../../BaseForm'
import './styles.scss'

export interface ILoginFormValue {
  userId: string
  password: string
}

export interface ILoginFormProps {
  formValue: ILoginFormValue
  onChange: (formValue: ILoginFormValue) => void
  onSubmit: () => void
  forceShowPassword?: boolean
}

export const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.loginForm.${key}`)

  const history = useHistory()

  const { formValue, onChange, onSubmit, forceShowPassword } = props

  const loading = useSelector<IAppState>((state) => state.auth.loading) as boolean | null

  const [showPassword, setShowPassword] = useState(false)

  const handleClickForgotUserId = () => history.push('/recoverUserID')
  const handleClickForgotPassword = () => history.push('/resetPasscode')

  const fields: IBaseFormFields = {
    userId: {
      type: 'text',
      value: formValue.userId,
      onChange: (e) =>
        onChange({
          ...formValue,
          userId: (e as React.ChangeEvent<HTMLInputElement>).target.value,
        }),
      wrapperClassName: 'user-id-wrapper',
      label: t('user_id__label'),
      placeholder: t('user_id__placeholder'),
      rightText: showPassword || forceShowPassword ? undefined : t('forgot_user_id'),
      showHelp: false,
      disabled: !!loading,
      onClickRightText: () => handleClickForgotUserId(),
    },
    password: {
      type: 'text',
      inputType: 'password',
      value: formValue.password,
      onChange: (e) =>
        onChange({
          ...formValue,
          password: (e as React.ChangeEvent<HTMLInputElement>).target.value,
        }),

      wrapperClassName: `password-wrapper ${
        showPassword || forceShowPassword ? '' : 'desktop-hide tablet-hide'
      }`,
      label: t('password__label'),
      placeholder: t('password__placeholder'),
      showHelp: false,
      disabled: !!loading,
      rightText: t('forgot_password'),
      onClickRightText: () => handleClickForgotPassword(),
    },
  }

  const handleContinueClick = () => {
    if (showPassword || forceShowPassword) {
      onSubmit()
    } else {
      setShowPassword(true)
    }
  }

  const isContinueDisabled =
    (showPassword || forceShowPassword ? formValue.password === '' : false) ||
    formValue.userId === '' ||
    !!loading

  return (
    <div className="login-form">
      <BaseForm fields={fields} />
      <Button variant="primary" onClick={() => handleContinueClick()} disabled={isContinueDisabled}>
        {_t('common.btns.continue')}
      </Button>
    </div>
  )
}
