import React from 'react'
import { useTranslation } from 'react-i18next'
import OutsideClickHandler from 'react-outside-click-handler'

export interface IMoreActionsPanelProps {
  onOutsideClick: (event: React.MouseEvent) => void
  show: boolean
  print?: boolean
}

export const MoreActionsPanel: React.FunctionComponent<IMoreActionsPanelProps> = (props) => {
  const { t } = useTranslation()
  const { onOutsideClick, show, print } = props

  const actions = [
    {
      iconName: 'unread',
      menuLabel: 'mark_as_unread',
    },
    {
      iconName: 'trash',
      menuLabel: 'trash',
    },
    {
      iconName: 'delete',
      menuLabel: 'delete',
    },
    {
      iconName: 'print',
      menuLabel: 'print',
    },
  ].slice(0, print ? undefined : 3)

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div className={`more-panel ${show ? '' : 'hide'}`}>
        <ul>
          {actions.map((item, index) => (
            <li key={index}>
              <a
                href="#javascript"
                className="icon-btn "
                onClick={(event) => {
                  //   this.clickMenuItemIcon(groupIndex, emailIndex, item.iconName)
                  event.preventDefault()
                }}
              >
                <i className={`icons icon-${item.iconName}`} />
                <span className="txt">
                  {t('helpSupport.contactBankSecureEmailDetails.' + item.menuLabel)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </OutsideClickHandler>
  )
}
