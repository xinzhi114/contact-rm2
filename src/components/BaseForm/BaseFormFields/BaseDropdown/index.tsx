import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'
import { getKeyFromOptions } from '../../../../services/Util'

export type IBaseDropdownCategoryOption = {
  categoryTitle: string
  optionList: (string | { key: string; value: string })[]
}

export type IBaseDropdownTitleOption = { title: string; subTitle: string }

export type IBaseDropdownIconOption = { iconUrl: string; value: string }

export type IBaseDropdownOption =
  | string
  | IBaseDropdownCategoryOption
  | IBaseDropdownIconOption
  | IBaseDropdownTitleOption
  | { key: string; value: string }

export type IBaseDropdownProps = IBaseFormFieldProps & {
  value: string
  className?: string
  options?: IBaseDropdownOption[]
  id?: any
  disableTranslation?: boolean
  hideBorder?: boolean
  placeholder?: string
  onChange?: (newValue: string | null) => void
}

export const BaseDropdown: React.FunctionComponent<IBaseDropdownProps> = (props) => {
  const { t } = useTranslation()

  const {
    value,
    options,
    onChange,
    className,
    id,
    disableTranslation,
    hideBorder,
    placeholder,
    classNameContainer,
  } = props

  const translateValue = (valueToTranslate: string | null) => {
    if (disableTranslation) {
      return valueToTranslate
    }
    // Don't translate values that are just numbers
    if (valueToTranslate) {
      if (valueToTranslate.match(/[a-zA-Z]/g)) {
        return t('common.dynamicLabels.' + valueToTranslate)
      } else {
        return valueToTranslate
      }
    }
  }

  return (
    <div className={`base-dropdown ${classNameContainer ? classNameContainer : ''}`}>
      <Dropdown
        bsPrefix="drop-module"
        onSelect={(event) => onChange && onChange(event)}
        className={className}
      >
        <Dropdown.Toggle variant="success" id={id} className={`${hideBorder ? 'hide-border' : ''}`}>
          {!value && placeholder
            ? (translateValue(placeholder) as string)
            : translateValue(getKeyFromOptions(options, value))}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {!!options &&
            (options as any).map((item: any, subIndex: number) => {
              if (typeof item === 'string' || item.key) {
                return (
                  <div key={subIndex}>
                    <Dropdown.Item
                      eventKey={item.value || item}
                      className={`${item === value ? 'active' : ''}`}
                    >
                      {translateValue(item.key || item)}
                    </Dropdown.Item>
                  </div>
                )
              } else if (typeof item === 'string' || (item as IBaseDropdownIconOption).iconUrl) {
                return (
                  <div key={subIndex}>
                    <Dropdown.Item
                      eventKey={item.value || item}
                      className={`${item === value ? 'active' : ''}`}
                    >
                      <img className="icon-image" src="/assets/icon-pdf.svg" alt="img" />
                      {translateValue(item.value)}
                    </Dropdown.Item>
                  </div>
                )
              } else {
                if (
                  !(item as IBaseDropdownCategoryOption & IBaseDropdownTitleOption).categoryTitle
                ) {
                  const { title, subTitle } = item as IBaseDropdownTitleOption
                  return (
                    <div key={subIndex}>
                      <Dropdown.Item
                        eventKey={title}
                        className={`title-option ${title === value ? 'active' : ''}`}
                      >
                        <span className="inner-title">{title}</span>
                        <span className="inner-sub-title">{subTitle}</span>
                      </Dropdown.Item>
                    </div>
                  )
                } else {
                  const { categoryTitle, optionList } = item as IBaseDropdownCategoryOption
                  return (
                    <div key={subIndex}>
                      <Dropdown.Item className="category-title" disabled>
                        {translateValue(categoryTitle)}
                      </Dropdown.Item>
                      {optionList &&
                        optionList.map((subItem, subItemIndex) => {
                          const subItemValue = typeof subItem === 'string' ? subItem : subItem.value
                          return (
                            <div key={subItemIndex}>
                              <Dropdown.Item
                                eventKey={subItemValue}
                                className={`${subItem === subItemValue ? 'active' : ''}`}
                              >
                                {translateValue(subItemValue)}
                              </Dropdown.Item>
                            </div>
                          )
                        })}
                    </div>
                  )
                }
              }
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
