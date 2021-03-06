import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export type IPasswordRequirement = {
  key: string
  pass: boolean
}

export interface IPasswordRequirementsProps {
  password: string
  onSuggestClick: () => void
}

export const PasswordRequirements: React.FunctionComponent<IPasswordRequirementsProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.formSteps.setPassword.passwordRequirements.${key}`)

  const { password, onSuggestClick } = props

  const nestedRequirements: IPasswordRequirement[] = [
    {
      key: 'lower_case',
      pass: password.match(/[a-z]/g) !== null,
    },
    {
      key: 'numbers',
      pass: password.match(/[0-9]/g) !== null,
    },
    {
      key: 'special_chars',
      pass: password.match(/[~:#%^&*$/?]/g) !== null,
    },
  ]

  const topRequirements: IPasswordRequirement[] = [
    {
      key: 'required_length',
      pass: password.length >= 8 && password.length <= 24,
    },
    {
      key: 'character_sets',
      pass: !nestedRequirements.some((requirement) => !requirement.pass),
    },
  ]

  const renderRequirements = (requirements: IPasswordRequirement[]) => {
    return requirements.map((item, index) => (
      <div key={index} className={`requirement-item ${item.pass ? 'pass' : ''}`}>
        {t(item.key)}
      </div>
    ))
  }

  return (
    <div className="password-requirements">
      <div className="title">{t('title')}</div>
      <div className="requirements">
        <div className="requirements-list">{renderRequirements(topRequirements)}</div>
        <div className="requirements-list nested">{renderRequirements(nestedRequirements)}</div>
        <div className="suggest-password" onClick={() => onSuggestClick()}>
          {t('suggest_strong_password')}
        </div>
      </div>
    </div>
  )
}
