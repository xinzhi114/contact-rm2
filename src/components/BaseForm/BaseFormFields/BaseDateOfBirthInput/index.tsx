import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import { BaseTextInput } from '../BaseTextInput'
import './styles.scss'

export type IBaseDateOfBirthInputProps = IBaseFormFieldProps & {
  value: [string, string, string]
  onChange?: (newValue: string[]) => void
}

export const BaseDateOfBirthInput: React.FunctionComponent<IBaseDateOfBirthInputProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`common.labels.${key}`)

  const { value, onChange } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...value]
    newValue[index] = event.target.value
    if (onChange) {
      onChange(newValue)
    }
    if (index < 2 && newValue[index].length === 2) {
      document
        .querySelectorAll<HTMLInputElement>('.base-date-of-birth-input .inputs input')
        [index + 1].focus()
    }
  }

  return (
    <div className="base-date-of-birth-input">
      {(['day', 'month', 'year'] as const).map((field, index) => (
        <React.Fragment key={index}>
          <BaseTextInput
            value={value[index]}
            onChange={(event) => handleChange(event, index)}
            placeholder={t(field)}
            formatAs={field}
          />
          {index < 2 && <div className="separator">/</div>}
        </React.Fragment>
      ))}
    </div>
  )
}
