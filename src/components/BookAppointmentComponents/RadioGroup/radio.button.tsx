import React, { useState, useContext, useEffect } from 'react';
import { RadioGroupContext } from './group';
import './styles.scss';
interface IRadioProps {
  value: string
  children: React.ReactNode
}
const Radio: React.FunctionComponent<IRadioProps> = (props) => {
  const { value, children } = props
  const radioGroup = useContext<any>(RadioGroupContext)

  return (
    <label className="radio-group">
      <div className={`radio-wrap radio-button-wrap ${value === radioGroup.value ? 'radio-button-active' : 'radio-button'}`}>
        <input
          type="radio"
          name={radioGroup.name}
          checked={value === radioGroup.value}
          onChange={(event) => {
            radioGroup.onChange(value)
          }}
          />
        <span>{children}</span>
      </div>
    </label>
  )
}

export default Radio;