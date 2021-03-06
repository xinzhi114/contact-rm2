import React, { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import { BaseTextInput } from '../BaseTextInput'
import './styles.scss'

export type IBaseDateInputProps = IBaseFormFieldProps & {
  value: Date | null
  maxDate?: Date
  minDate?: Date
  onChange?: (newDate: Date | null) => void
}

export type IWrapperInputProps = {
  value?: Date | null
  onClick?: () => void
}

export const BaseDateInput: React.FunctionComponent<IBaseDateInputProps> = (props) => {
  const { value, placeholder, onChange, maxDate, minDate } = props

  const WrapperInput: React.FunctionComponent<IWrapperInputProps> = forwardRef<
    HTMLDivElement,
    IWrapperInputProps
  >(({ onClick }, ref) => (
    <div className="base-date-input-wrapper" onClick={onClick} ref={ref}>
      <img src="/assets/calendar.svg" alt="select date" />
      <BaseTextInput
        value={value ? moment(value).format('DD MMM YYYY') : ''}
        placeholder={placeholder}
      />
    </div>
  ))

  return (
    <div className="base-date-input">
      <ReactDatePicker
        selected={value}
        onChange={(date) => onChange && onChange(date as Date | null)}
        customInput={<WrapperInput />}
        maxDate={maxDate}
        minDate={minDate}
      />
    </div>
  )
}
