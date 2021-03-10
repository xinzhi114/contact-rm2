import React, { useState, useEffect, createContext } from 'react';
import './styles.scss';
interface IRadioGroupProps {
  name: string
  onChange: (val: string) => void
  value: string
  children: React.ReactNode[],
  direction?: string
}

export const RadioGroupContext = createContext({})
const RadioGroup: React.FunctionComponent<IRadioGroupProps> = (props) => {
  const [groupValue, setGroupValue] = useState<any>()
  const { name, onChange, children, value, direction } = props

  const onRadioChange = (val: string) => {
    setGroupValue(val)
    onChange(val)
  }

  useEffect(() => {
    setGroupValue(value)
  }, [])
  return (
    <div className={`radio_group_row flex-${direction || 'row'}`}>
      <RadioGroupContext.Provider value={{name, value: groupValue, onChange: onRadioChange}}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  )
}

export default RadioGroup;