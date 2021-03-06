import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
// @ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { withTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseCheckbox } from '../../../components/BaseForm/BaseFormFields/BaseCheckbox'
import './styles.scss'
import {
  typeOfTransactionDropdownOptions,
  yearsOfEStatementsDropdownOptions,
  monthListArray,
} from '../../../config'

interface IEStatementsLeftFilterProps {
  t: any
  tabName: string
  dataList: {
    accountList: {
      accountType: string
      accountNumber: string
    }[]
    statementOfInterest: {
      description: string
      lastUpdated: string
    }
  }
  onApply?: any
}

interface IEStatementsLeftFilterState {
  specificDateInput?: Date
  accountSelection?: string
  typeOfTransaction?: string
  yearSelection?: string
  monthYearSelect?: boolean[]
  transactionName?: string
  downloadTypeSelect?: string
}

export class EStatementsLeftFilter extends Component<
  IEStatementsLeftFilterProps,
  IEStatementsLeftFilterState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      specificDateInput: undefined,
      accountSelection: 'Select Account',
      typeOfTransaction: 'Transaction type',
      yearSelection: 'Select Year',
      monthYearSelect: [true, false],
      transactionName: '',
      downloadTypeSelect: '',
    }
  }

  // handle Date Change
  handleDateChange(fieldName: string, date: any) {
    this.setState({
      [fieldName]: date,
    })
  }

  // handle Input Change
  handleInputChange(fieldName: string, event: any) {
    this.setState({
      [fieldName]: event.target.value.toString(),
    })
  }

  // on change dropdown
  onChangeDropdown = (fieldName: string, event: any) => {
    this.setState({
      [fieldName]: event,
    })
  }

  // on select month year
  onSelectMonthYear(type: boolean[]) {
    this.setState({
      monthYearSelect: type,
    })
  }

  // on select download type
  onSelectDownloadType(type: string) {
    this.setState({
      downloadTypeSelect: type,
    })

    this.props.onApply()
  }

  // click Download
  clickDownload() {
    this.props.onApply()
  }

  render() {
    const { t, tabName, dataList } = this.props
    const {
      specificDateInput,
      accountSelection,
      typeOfTransaction,
      yearSelection,
      monthYearSelect,
      transactionName,
      downloadTypeSelect,
    } = { ...this.state }

    return (
      <div className="filter-box-eStatements">
        <div className="modal-mains">
          <div className="lefts">
            <div className="title-area">
              <div className="blue-title flex-grid">{t('common.dynamicLabels.' + tabName)}</div>
            </div>
            <div className="modal-info">
              {tabName === 'Account statement' && (
                <div className="row-line">
                  <div className="date-boxs">
                    <Dropdown
                      bsPrefix="drop-module eStatements-account-dropdown"
                      onSelect={(event) => this.onChangeDropdown('accountSelection', event)}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic-selection-account">
                        {t('common.dynamicLabels.' + accountSelection)}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {!!dataList &&
                          dataList.accountList &&
                          dataList.accountList.map((item, index) => (
                            <Dropdown.Item
                              eventKey={item.accountType}
                              key={index}
                              className={`${item.accountType === accountSelection ? 'active' : ''}`}
                            >
                              {t('common.dynamicLabels.' + item.accountType)}
                              <div className="gray-txt">{item.accountNumber}</div>
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )}
              {tabName === 'Statement of interest for specific period' && (
                <div className="row-line">
                  <div className="row-line inner">
                    <div className="title">{t('eStatements.eStatementsLeftFilter.from')}</div>
                    <div className="date-boxs calender-boxs">
                      <div className="inputs">
                        <DateRangePicker
                          format="dd/MM/y"
                          onChange={(event: any) =>
                            this.handleDateChange('specificDateInput', event)
                          }
                          value={specificDateInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tabName === 'Statement of interest for specific period' && (
                <div className="row-line">
                  <div className="date-boxs ">
                    <BaseTextInput
                      id="transactionName"
                      placeholder="Transaction name"
                      value={transactionName || ''}
                      onChange={(event) => this.handleInputChange('transactionName', event)}
                    >
                      <span className="icons icon-search" />
                    </BaseTextInput>
                  </div>
                </div>
              )}

              {tabName === 'Statement of interest for specific period' && (
                <div className="row-line">
                  <div className="date-boxs ">
                    <Dropdown
                      bsPrefix="drop-module eStatements-typeOfTransaction-dropdown"
                      onSelect={(event) => this.onChangeDropdown('typeOfTransaction', event)}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic-type">
                        {t('common.dynamicLabels.' + typeOfTransaction)}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {!!typeOfTransactionDropdownOptions &&
                          typeOfTransactionDropdownOptions.map((item, index) => (
                            <Dropdown.Item
                              eventKey={item}
                              key={index}
                              className={`${item === typeOfTransaction ? 'active' : ''}`}
                            >
                              {t('common.dynamicLabels.' + item)}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )}

              {(tabName === 'Account statement' || tabName === 'Statement of Interest') && (
                <div className="row-line">
                  <div className="date-boxs">
                    <Dropdown
                      bsPrefix="drop-module eStatements-year-dropdown"
                      onSelect={(event) => this.onChangeDropdown('yearSelection', event)}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic-year">
                        {yearSelection === 'Year'
                          ? t('common.dynamicLabels.' + yearSelection)
                          : yearSelection}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {!!yearsOfEStatementsDropdownOptions &&
                          yearsOfEStatementsDropdownOptions.map((item, index) => (
                            <Dropdown.Item
                              eventKey={item.optionLabel}
                              key={index}
                              className={`${item.optionLabel === yearSelection ? 'active' : ''}`}
                            >
                              {item.optionLabel}
                              {item.isNotAvailiable && (
                                <span>{t('eStatements.eStatementsLeftFilter.not_available')}</span>
                              )}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )}

              <BaseCheckbox
                value={monthYearSelect || [false, false]}
                onChange={(newValue) => this.onSelectMonthYear(newValue)}
                checkboxType="radio"
                options={[t('common.dynamicLabels.Monthly'), t('common.dynamicLabels.Yearly')]}
                disableTranslation
                className="desktop-show"
              />
            </div>

            {monthYearSelect && monthYearSelect[0] && (
              <div className="bottom-btns">
                <div className="gray-txt">
                  {t('eStatements.eStatementsLeftFilter.click_on_desired_month_to_start_download')}
                </div>
                <div className="month-list">
                  {monthListArray.map((item, index) => (
                    <div className="month-file-item" key={index}>
                      <a
                        href="#javascript"
                        className={`gray-item ${downloadTypeSelect === 'PDF' ? 'active' : ''}`}
                        onClick={(event) => {
                          this.onSelectDownloadType('PDF')
                          event.preventDefault()
                        }}
                      >
                        <i className="icons pdf-icon" />
                        <span className="txt">{item}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {monthYearSelect && monthYearSelect[1] && (
              <div className="bottom-btns">
                <BaseTextLinkButton
                  label={t('common.btns.download2020eStatementPDF')}
                  href={'#javascript'}
                  isButton
                  onClick={() => {
                    this.clickDownload()
                  }}
                />
              </div>
            )}
          </div>
          <div className="rights">
            <div className="green-box">
              <div className="email-box">
                <img src="/assets/icon-email.svg" alt="svg" className="email-img" />
              </div>
              <div className="interest-box">
                {t('eStatements.eStatementsLeftFilter.statements_of_interest')}
              </div>
              <div className="p-txt">{dataList?.statementOfInterest.description}</div>
              <div className="bottom-btn">
                <BaseTextLinkButton
                  label={t('common.btns.subscribe')}
                  href={'#javascript'}
                  isButton
                />
                <div className="gray-txt">
                  {t('manageAlerts.alertsBannerBottom.last_updated')}{' '}
                  {dataList?.statementOfInterest.lastUpdated}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(EStatementsLeftFilter)
