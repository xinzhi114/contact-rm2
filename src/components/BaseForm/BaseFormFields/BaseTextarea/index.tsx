import React, { useState } from 'react'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'

export type IBaseTextareaProps = IBaseFormFieldProps & {
  value: string
  pattern?: string
  maxlength?: number
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const BaseTextarea: React.FunctionComponent<IBaseTextareaProps> = (props) => {
  const {
    value,
    maxlength,
    placeholder,
    onChange,
    classNameContainer,
    className,
    children,
    id,
  } = props

  const [focused, setFocused] = useState(false)

  return (
    <div
      className={`base-textarea textareas ${focused ? 'focused' : ''} ${
        classNameContainer ? classNameContainer : ''
      }`}
    >
      <textarea
        id={id}
        placeholder={placeholder}
        className={className}
        maxLength={maxlength}
        value={value}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        onChange={(e) => {
          if (onChange) {
            onChange(e)
          }
        }}
      />
      {children}
    </div>
  )
}
