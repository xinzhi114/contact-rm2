import React from 'react'
import { NavLink } from 'react-router-dom'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'
import { globalT } from '../../../../i18n'

export type IBaseTextLinkButtonProps = IBaseFormFieldProps & {
  label: string
  href?: string
  isNavLink?: boolean
  isButton?: boolean
  tabIndex?: number
  onClick?: any
  loading?: boolean
}

export const BaseTextLinkButton: React.FunctionComponent<IBaseTextLinkButtonProps> = (props) => {
  const {
    label,
    href,
    isNavLink,
    isButton,
    tabIndex,
    onClick,
    classNameContainer,
    children,
    loading,
  } = props

  return (
    <React.Fragment>
      <React.Fragment>
        {isNavLink && (
          <NavLink
            className={`${isButton ? 'btn btn-green' : 'green-link'} ${
              classNameContainer ? classNameContainer : ''
            }`}
            to={href ? href : '/'}
            tabIndex={tabIndex}
          >
            {label}
            {children}
          </NavLink>
        )}
      </React.Fragment>
      <React.Fragment>
        {!isNavLink && (
          <a
            className={`${isButton ? 'btn btn-green' : 'green-link'} ${
              classNameContainer ? classNameContainer : ''
            } ${loading ? 'disabled' : ''} `}
            href={href ? href : '#javascript'}
            tabIndex={tabIndex}
            onClick={(e) => {
              if (onClick) {
                onClick(e)
              }
              e.preventDefault()
            }}
          >
            {loading ? globalT('common.loading') : label}
            {children}
          </a>
        )}
      </React.Fragment>
    </React.Fragment>
  )
}
