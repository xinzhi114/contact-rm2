import React, { useContext } from 'react';
import { RadioGroupContext } from './group';
import shortid from 'shortid';
import './styles.scss';
interface IRadioProps {
  value: string
  children: React.ReactNode
}
const Radio: React.FunctionComponent<IRadioProps> = (props) => {
  const { value, children } = props
  const radioGroup = useContext<any>(RadioGroupContext)
  const id = shortid.generate()
  return (
    <div className="radio-group">
      <div className="radio-wrap radio-text-wrap">
        <input
          type="radio"
          id={id}
          name={radioGroup.name}
          checked={value === radioGroup.value}
          onChange={() => {
            radioGroup.onChange(value)
          }}
        />
        <label htmlFor={id}>
          {children}
        </label>
      </div>
    </div>
  )
}

export default Radio;