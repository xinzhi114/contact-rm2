import React, { useState } from 'react'
import moment from 'moment'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'

export type IBaseTextInputType = 'password'

export type IBaseTextInputFormatAs =
  | 'payee-name'
  | 'amount'
  | 'sort-code'
  | 'postcode'
  | 'account-number'
  | 'reference'
  | 'iban'
  | 'bic'
  | 'otp'
  | 'day'
  | 'month'
  | 'year'

export type IBaseTextInputProps = IBaseFormFieldProps & {
  value: string
  showCurrency?: boolean | string
  pattern?: string
  inputType?: IBaseTextInputType
  formatAs?: IBaseTextInputFormatAs
  showError?: boolean
  errorMessageLabel?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
}

export const BaseTextInput: React.FunctionComponent<IBaseTextInputProps> = (props) => {
  const {
    value,
    showCurrency,
    placeholder,
    pattern,
    formatAs,
    showError,
    errorMessageLabel,
    inputType,
    onKeyDown,
    onChange,
    onClick,
    disabled,
    classNameContainer,
    className,
    children,
    id,
  } = props

  const [focused, setFocused] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value
    let match: RegExpMatchArray | null
    switch (formatAs) {
      case 'payee-name':
        match = newValue.match(/^[a-zA-Z-. ]{0,35}/)
        newValue = match ? match[0] : value
        break
      case 'account-number':
        match = newValue.match(/^[0-9]{0,8}/)
        newValue = match ? match[0] : value
        break
      case 'amount':
        match = newValue.match(/^[0-9]{1,12}([.])?[0-9]{0,2}/)
        newValue = match ? match[0] : value
        break
      case 'reference':
        match = newValue.match(/^[\s\S]{0,50}/)
        newValue = match ? match[0] : value
        break
      case 'iban':
        // Remove all except numbers
        match = newValue.match(/^[0-9a-zA-Z]{0,34}/)
        newValue = match ? match[0] : value
        break
      case 'bic':
        // Remove all except numbers
        match = newValue.match(/^[0-9a-zA-Z]{0,11}/)
        newValue = match ? match[0] : value
        break
      case 'sort-code':
        match = newValue.match(/^([0-9]{1,2})?(-)?([0-9]{0,2})?(-)?([0-9]{1,2})?/)
        newValue = match ? match[0] : value
        if (newValue.length < 8) {
          newValue = newValue.replace(/[0-9]{3}$/, (v) => `${v.slice(0, 2)}-${v.slice(2, 3)}`)
          newValue = newValue.replace(/-$/, '')
        }
        break
      case 'postcode':
        match = newValue.toUpperCase().match(/^[A-Z0-9]{0,9}$/)
        newValue = match ? match[0] : value
        break
      case 'otp':
        match = newValue.match(/^[0-9]{0,8}$/)
        newValue = match ? match[0] : value
        break
      case 'day':
        match = newValue.match(/^[0-9]{0,2}$/)
        newValue = match ? match[0] : value
        if (newValue !== '') {
          const day = Number(newValue)
          if (day > 31 || day < 0) {
            newValue = value
          }
        }
        break
      case 'month':
        match = newValue.match(/^[0-9]{0,2}$/)
        newValue = match ? match[0] : value
        if (newValue !== '') {
          const month = Number(newValue)
          if (month > 12 || month < 0) {
            newValue = value
          }
        }
        break
      case 'year':
        match = newValue.match(/^[0-9]{0,4}$/)
        newValue = match ? match[0] : value
        if (newValue !== '') {
          const year = Number(newValue)
          if (year > moment().year() || year < 0) {
            newValue = value
          }
        }
        break
    }
    if (onChange) {
      event.target.value = newValue
      onChange(event)
    }
  }

  return (
    <React.Fragment>
      <div
        className={`inputs ${focused ? 'focused' : ''} ${showError ? 'error' : ''}${
          classNameContainer ? classNameContainer : ''
        } ${showCurrency || false ? 'have-tit' : ''}`}
        onClick={() => onClick && onClick()}
      >
        {showCurrency && (
          <span className="tit-left">{typeof showCurrency === 'string' ? showCurrency : '£'}</span>
        )}
        <input
          type={inputType || 'text'}
          id={id}
          className={className}
          placeholder={placeholder}
          value={value}
          pattern={pattern}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            handleChange(e)
          }}
          onKeyDown={(e) => {
            if (onKeyDown) {
              onKeyDown(e)
            }
          }}
          disabled={!!disabled}
        />
        {children}
      </div>
      {showError && <div className="input-label-txt red">{errorMessageLabel}</div>}
    </React.Fragment>
  )
}
