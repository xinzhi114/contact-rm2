import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'

export type IBaseCheckboxOption = string | JSX.Element

export type IBaseCheckboxType = 'checkbox' | 'radio'

export type IBaseCheckboxProps = IBaseFormFieldProps & {
  value: boolean[]
  onChange?: (newValue: boolean[]) => void
  checkboxType?: IBaseCheckboxType
  options?: IBaseCheckboxOption[]
  preventDefault?: boolean
}

export const BaseCheckbox: React.FunctionComponent<IBaseCheckboxProps> = (props) => {
  const { t } = useTranslation()
  const {
    id,
    value,
    onChange,
    checkboxType,
    className,
    options,
    disableTranslation,
    preventDefault,
  } = props

  const getOption = (option: IBaseCheckboxOption) => {
    if (typeof option !== 'string') {
      return option
    }
    return disableTranslation && option !== '' ? option : t(option)
  }

  const handleChange = (newChecked: boolean, index: number) => {
    if (onChange) {
      let newValue = value.slice()
      if (checkboxType === 'radio') {
        if (newChecked) {
          newValue = newValue.map(() => false)
          newValue[index] = newChecked
        }
      } else {
        newValue[index] = newChecked
      }
      onChange(newValue)
    }
  }

  return (
    <React.Fragment>
      {!!options
        ? options.map((option, index) => (
            <div
              className="base-checkbox checkbox-wrap"
              key={index}
              onClick={(event) => {
                if (preventDefault) {
                  event.preventDefault()
                  event.stopPropagation()
                }
                handleChange(!value[index], index)
              }}
            >
              <Form.Check
                type="checkbox"
                checked={value[index]}
                id={id}
                readOnly
                className={`${checkboxType === 'radio' ? 'radio-checkbox' : ''} ${
                  className ? className : ''
                }`}
                label={<span className="option-text">{getOption(option)}</span>}
              />
            </div>
          ))
        : null}
    </React.Fragment>
  )
}
