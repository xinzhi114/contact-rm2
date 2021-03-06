import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IAccountsTabProps {
  t: any
  showTab: boolean
  currentTab: string
  prevArrowDisabled: boolean
  nextArrowDisabled: boolean
  clickTab?: any
  clickPrevArrow?: any
  clickNextArrow?: any
}

const tabArray = ['All', 'Current', 'Savings', 'Loans', 'Closed']
export class AccountsTab extends Component<IAccountsTabProps> {
  // on change dropdown
  onChangeDropdown = (event: any) => {
    this.props.clickTab(event)
  }

  render() {
    const { t } = this.props
    const { showTab, currentTab, prevArrowDisabled, nextArrowDisabled } = { ...this.props }

    return (
      <React.Fragment>
        {showTab && (
          <Dropdown
            className="desktop-hide mobile-show"
            bsPrefix="tab-dropdown"
            onSelect={(event) => this.onChangeDropdown(event)}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {t('common.dynamicLabels.' + currentTab)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {!!tabArray &&
                tabArray.map((item, index) => (
                  <Dropdown.Item eventKey={item} key={index}>
                    {t('common.dynamicLabels.' + item)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        <div className="top-ctrl flex-grid mobile-hide">
          <ul className="flex">
            {!!tabArray &&
              showTab &&
              tabArray.map((item, index) => (
                <li key={index} className={`${item === 'Loans' ? 'hide' : ''}`}>
                  <a
                    href="#javascript"
                    className={`tab-link ${item === currentTab ? 'current' : ''}`}
                    onClick={(event) => {
                      this.props.clickTab(item)
                      event.preventDefault()
                    }}
                  >
                    {t('common.dynamicLabels.' + item)}
                  </a>
                </li>
              ))}
          </ul>
          <div className="right-arrow">
            <a
              href="#javascript"
              className={`btn-arrow prev label-transparent ${prevArrowDisabled ? 'disabled' : ''}`}
              onClick={(event) => {
                this.props.clickPrevArrow()
                event.preventDefault()
              }}
            >
              {t('common.btns.prev_arrow')}
            </a>
            <a
              href="#javascript"
              className={`btn-arrow next label-transparent ${nextArrowDisabled ? 'disabled' : ''}`}
              onClick={(event) => {
                this.props.clickNextArrow()
                event.preventDefault()
              }}
            >
              {t('common.btns.next_arrow')}
            </a>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// @ts-ignore
export default withTranslation()(AccountsTab)
