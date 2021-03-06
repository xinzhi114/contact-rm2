import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import { AccountAlert } from '../../../domain/AlertItem'

export interface IAlertsSelectAccountProps {
  currentIndex: number
  accountAlerts: AccountAlert[] | null
  selectAccount?: (account: number) => void
}

export const AlertsSelectAccount: React.FunctionComponent<IAlertsSelectAccountProps> = (props) => {
  const { t } = useTranslation()
  const { currentIndex, accountAlerts, selectAccount } = props

  // on change dropdown
  const onChangeDropdown = (event: any) => {
    if (selectAccount) {
      selectAccount(parseInt(event, 10))
    }
  }

  const getName = (item: AccountAlert) => {
    return `${item.accountType} - ${item.accountId}`
  }
  return (
    <div className="white-panel alert-select-content">
      <div className="top-select visa-select desktop-hide tablet-show">
        <div className="drop-module">
          <Dropdown
            bsPrefix="select-account-dropdown"
            onSelect={(event) => onChangeDropdown(event)}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic-account">
              <i className="icons icon-visa desktop-hide tablet-show" />
              {accountAlerts ? getName(accountAlerts[currentIndex]) : '-'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {accountAlerts &&
                accountAlerts.map((item, index) => (
                  <Dropdown.Item eventKey={index + ''} key={index}>
                    {getName(item)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="black-title tablet-hide">
        {t('manageAlertsDetails.alertsSelectAccount.select_account')}
      </div>
      <div className="tab-list tablet-hide">
        <ul>
          {accountAlerts &&
            accountAlerts.map((item, index) => (
              <li key={index}>
                <a
                  href="#javascript"
                  className={`tab-bar ${currentIndex === index ? 'current' : ''}`}
                  onClick={(event) => {
                    if (selectAccount) {
                      selectAccount(index)
                    }
                    event.preventDefault()
                  }}
                >
                  {getName(item)}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
