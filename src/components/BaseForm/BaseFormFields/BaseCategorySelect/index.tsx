import React from 'react'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'

export type IBaseCategoryOption = { key: string; value: string; icon: string }

export type IBaseCategorySelectProps = IBaseFormFieldProps & {
  value: string[]
  options: IBaseCategoryOption[]
  onChange?: (newCategories: string[]) => void
}

export const BaseCategorySelect: React.FunctionComponent<IBaseCategorySelectProps> = (props) => {
  const { value, options, onChange } = props

  const handleOptionClick = (option: string) => {
    // Uncomment to allow the selection of multiple categories
    // const newValue = value.slice()
    // if (newValue.includes(option)) {
    //   newValue.splice(newValue.indexOf(option), 1)
    // } else {
    //   newValue.push(option)
    // }
    // if (onChange) {
    //   onChange(newValue)
    // }
    if (onChange) {
      onChange([option])
    }
  }

  return (
    <div className="base-category-select">
      {options.map((option, index) => (
        <div
          className={`option ${value.includes(option.key) ? 'selected' : ''} ${
            index === 0 ? 'first' : ''
          }`}
          key={index}
          onClick={() => handleOptionClick(option.key)}
        >
          <img src={option.icon} alt={option.value} className="desktop-hide tablet-show" />
          {option.value}
        </div>
      ))}
      <div className="add-option">+</div>
    </div>
  )
}
