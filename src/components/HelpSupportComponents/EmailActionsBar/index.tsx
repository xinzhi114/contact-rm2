import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export interface IEmailActionsBarProps {
  emailActions: {
    iconName: string
    menuLabel: string
  }[]
}

export const EmailActionsBar: React.FunctionComponent<IEmailActionsBarProps> = (props) => {
  const { t } = useTranslation()

  const { emailActions } = props

  return (
    <ul className="email-actions">
      {emailActions.map((item, index) => (
        <li key={index}>
          <a
            href="#javascript"
            className="icon-btn "
            onClick={(event) => {
              // this.clickMenuItemIcon(groupIndex, emailIndex, item.iconName)
              event.preventDefault()
            }}
          >
            <img src={`/assets/${item.iconName}.svg`} alt="email option" />
            <img
              src={`/assets/${item.iconName.replace('green', 'black')}.svg`}
              alt="email option"
              className="mobile-action"
            />
            <span>{t('helpSupport.contactBankSecureEmailDetails.' + item.menuLabel)}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
