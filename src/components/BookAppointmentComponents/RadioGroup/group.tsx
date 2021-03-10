import React, { useState, useEffect, createContext } from 'react';
import './styles.scss';
interface IRadioGroupProps {
  name: string
  onChange: (val: string) => void
  value: string
  children: React.ReactNode[]
}

export const RadioGroupContext = createContext({})
const RadioGroup: React.FunctionComponent<IRadioGroupProps> = (props) => {
  const [groupValue, setGroupValue] = useState<any>()
  const { name, onChange, children, value } = props

  const getCheckedValue = (children: React.ReactNode[]) => {
    var value = null;
    var matched = false;
    children.forEach((radio: any) => {
      console.log(radio);
      if (radio && radio.props && radio.props.checked) {
        value = radio.props.value;
        matched = true;
      }
    });
    value = matched ? value : undefined; 
    setGroupValue(value)
  }

  const onRadioChange = (val: string) => {
    setGroupValue(val)
    onChange(val)
  }

  useEffect(() => {
    setGroupValue(value)
  }, [])
  return (
    <div className="customer_radio_row flex">
      <RadioGroupContext.Provider value={{name, value: groupValue, onChange: onRadioChange}}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  )
}

export default RadioGroup;