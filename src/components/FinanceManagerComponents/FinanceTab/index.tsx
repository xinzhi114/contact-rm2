import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import { AccountProfile } from '../../../domain/AccountProfile'
import { useRM } from '../../DashboardRelationshipManager'
import { ProfileIcon } from '../../ProfileIcon'

export interface IFinanceTabProps {
  clickTab?: any
  currentTabIndex: string
  tabArray: string[]
  accountProfile?: AccountProfile
}

export const FinanceTab: React.FunctionComponent<IFinanceTabProps> = (props) => {
  const onMobileTabChangeDropdown = (event: any) => {
    props.clickTab(event)
  }
  const { t } = useTranslation()
  const { currentTabIndex, tabArray, accountProfile } = props
  const rm = useRM()

  if (!accountProfile || !rm) {
    return <div />
  }
  return (
    <div className="finance-tabs flex-grid">
      <ul className="flex ul-list">
        {tabArray &&
          tabArray.map((item, index) => (
            <li key={index}>
              <a
                href="#javascript"
                className={`tab-link ${item === currentTabIndex ? 'current' : ''}`}
                onClick={(event) => {
                  props.clickTab(item)
                  event.preventDefault()
                }}
              >
                {t('common.dynamicLabels.' + item)}
              </a>
            </li>
          ))}
      </ul>
      {accountProfile && (
        <div className="right-users">
          <div className="left-star">
            <div className="pole-txt">{rm.role}</div>
            <div className="names">{rm.name}</div>
            <div className="star-list">
              <ul>
                {new Array(accountProfile.stars).fill('').map((item, index) => (
                  <li key={index}>
                    <i className="icons icon-star" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="user-photo-fm" onClick={(event) => event.preventDefault()}>
            <ProfileIcon name={rm.name} photoUrl={rm.photoURL} size={55} fontSize={16} />
            {accountProfile.state === 'active' && <span className="green-point" />}
          </div>

          <a
            href="#javascript"
            className="icons icon-more label-transparent"
            onClick={(event) => event.preventDefault()}
          >
            {t('common.btns.more')}
          </a>
        </div>
      )}
      <div className="mobile-tab-finance mobile-show desktop-hide">
        <Dropdown
          bsPrefix="white-drop drop-module finance-manager-mobile-tab-dropdown"
          onSelect={(event) => {
            onMobileTabChangeDropdown(event)
          }}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic-tab">
            {t('common.dynamicLabels.' + currentTabIndex)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {!!tabArray &&
              tabArray.map((item, index) => (
                <Dropdown.Item
                  eventKey={item}
                  key={index}
                  className={`${item === currentTabIndex ? 'active' : ''}`}
                >
                  <span className="txt">{t('common.dynamicLabels.' + item)}</span>{' '}
                  <i className={`${item === currentTabIndex ? ' icon-checkmark' : 'hide'}`} />
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
export default FinanceTab
