import React from 'react'
import {
  AllListItemTypes,
  IListItem,
  IListItemIcon,
  IListItemWithSubTitle,
  IListItemWithValue,
} from '../../../constants/layout'
import './styles.scss'

export interface IFlexListProps {
  items: IListItem[]
  wrap?: boolean
  className?: string
}

export const FlexList: React.FunctionComponent<IFlexListProps> = (props) => {
  const { items, wrap, className } = props

  return (
    <div className={`flex-list ${wrap ? 'wrap' : ''} ${className ? className : ''}`}>
      {items.map((item, index) => {
        const itemToCheck = item as AllListItemTypes
        if (itemToCheck.value !== undefined) {
          const { label, bold, value } = item as IListItemWithValue
          return (
            <div
              className={`item ${bold ? 'bold-item' : ''} ${index === 0 ? 'first' : ''}`}
              key={index}
            >
              <span className="label">{label}</span>
              <span className="value">{value}</span>
            </div>
          )
        }
        if (itemToCheck.title !== undefined) {
          const { label, title, subTitle } = item as IListItemWithSubTitle
          return (
            <div className={`item sub-title-item ${index === 0 ? 'first' : ''}`} key={index}>
              <span className="label">{label}</span>
              <span className="title">{title}</span>
              <span className="sub-title">{subTitle}</span>
            </div>
          )
        }
        if (itemToCheck.icon !== undefined) {
          const { icon, alt, flip } = item as IListItemIcon
          return (
            <div
              className={`item icon-item ${index === 0 ? 'first' : ''} ${flip ? 'flip' : ''}`}
              key={index}
            >
              <img src={icon} alt={alt} />
            </div>
          )
        }
        return <></>
      })}
    </div>
  )
}
