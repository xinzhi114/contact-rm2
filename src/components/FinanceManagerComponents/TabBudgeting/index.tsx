import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import NumberFormat from 'react-number-format'
import CreateEditBudgetModalWindow, { IBudgetModalData } from '../CreateEditBudgetModalWindow'
import AccountProfileMobile from '../AccountProfileMobile'
import { AccountProfile } from '../../../domain/AccountProfile'
import { Budget, BudgetRow } from '../../../domain/Budget'
import { PFMSelect, PFMSelectValues } from '../PFMSelect'
import {
  GET_CUR_OPTIONS,
  GET_TIME_LINE_OPTIONS,
  getAccountOptions,
  getSpendCategory,
  PFM_CATEGORY_MAP,
  useAccountOptions,
} from '../PFMConfigProvider'
import { Aggregation } from '../../../domain/Aggregation'
import { InComeOutGoing } from '../../../domain/InComeOutGoing'
import { get } from 'lodash'
import { formatAccNumber, getCurrencySymbol } from '../../../services/Util'
import moment from 'moment'
import { DATE_FMT } from '../../../config'
import { showErrorMsg } from '../../Toast'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'
import { PFMService } from '../../../common/Api/Services/PFMService'

interface ITabBudgetingProps {
  t: any
  accountProfile: AccountProfile
  budget?: Budget
  aggregations: Aggregation[]
  incomeAndOutgoing?: InComeOutGoing
  pfmActions: any
}

interface ITabBudgetingState {
  showCreateEditBudgetModalWindow?: boolean
  values: PFMSelectValues
  budgetModalData?: IBudgetModalData
  isEdit?: boolean
  deleteRow?: BudgetRow
  popupRow?: BudgetRow
  loading?: boolean
}

export class TabBudgeting extends Component<ITabBudgetingProps, ITabBudgetingState> {
  constructor(props: any) {
    super(props)

    this.state = {
      showCreateEditBudgetModalWindow: false,
      budgetModalData: undefined,
      isEdit: false,
      values: {
        accountSelection: useAccountOptions(this.props.aggregations),
        timelineSelection: GET_TIME_LINE_OPTIONS()[0].value,
        currencySelection: GET_CUR_OPTIONS()[0].value,
      },
    }
  }

  componentDidMount() {
    this.fetchBudgets()
  }

  onChangeDropdown = (fieldName: string, event: any) => {
    this.setState({ values: { ...this.state.values, [fieldName]: event } }, () => {
      if (fieldName !== 'currencySelection') {
        this.fetchBudgets(true)
      }
    })
  }

  // open Create Edit Budget Modal Window
  openCreateEditBudgetModalWindow(isEdit: boolean, itemData: BudgetRow) {
    this.setState({
      showCreateEditBudgetModalWindow: true,
      budgetModalData: {
        category: itemData.category,
        account: this.state.values.accountSelection,
        frequency: itemData.frequence || this.state.values.timelineSelection,
        amount: itemData.budgetLimit,
        currency: this.state.values.currencySelection,
      },
      isEdit,
    })
    this.closeAllEditDeletePopups()
  }

  /**
   * fetch budgets
   */
  fetchBudgets = (clear = true) => {
    const { accountSelection, timelineSelection } = this.state.values
    const accountParts = accountSelection.split('-')
    this.props.pfmActions.loadBudget(
      {
        accountType: accountParts[0],
        accountNumber: accountParts[1],
        tenure: timelineSelection,
      },
      clear
    )
  }

  /**
   * get budgets
   */
  getBudgets = (): BudgetRow[] => {
    const rows: BudgetRow[] = get(
      this.props.budget,
      `budgets.${this.state.values.currencySelection}`,
      []
    )
    const finalRows: BudgetRow[] = []
    Object.keys(PFM_CATEGORY_MAP).forEach((key) => {
      const row = rows.find((r) => r.category === key)
      finalRows.push(
        row || {
          budgetLeft: 0,
          budgetLimit: 0,
          budgetSpent: 0,
          budgetSpentPercentage: 0,
          category: key,
        }
      )
    })
    return finalRows
  }

  openEditDeletePopup = (row: BudgetRow) => this.setState({ popupRow: row })
  closeAllEditDeletePopups = () => this.setState({ popupRow: undefined })

  // submit Create Edit Budget Modal Window
  submitCreateEditBudgetModalWindow() {
    this.setState({ showCreateEditBudgetModalWindow: false })
    this.fetchBudgets(false)
  }

  deleteBudget = () => {
    if (!this.state.deleteRow) {
      return
    }

    this.setState({ loading: true })
    const { accountSelection, currencySelection } = this.state.values
    const accParts = accountSelection.split('-')
    const body = {
      accountType: accParts[0],
      accountNumber: accParts[1],
      currency: currencySelection,
      budgetCategory: this.state.deleteRow.category,
    }

    ASF.getService(PFMService)
      .removeBudget(body)
      .then(() => {
        this.fetchBudgets(false)
        this.setState({ deleteRow: undefined })
      })
      .catch((e: string) => showErrorMsg(e))
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    const { budget, t, aggregations, accountProfile } = this.props
    const {
      showCreateEditBudgetModalWindow,
      budgetModalData,
      isEdit,
      popupRow,
      deleteRow,
      values,
    } = this.state

    const hasBudget = (row: BudgetRow) => !!row.budgetFromDate
    const getCT = (row: BudgetRow) => getSpendCategory(row.category)
    const symbol = getCurrencySymbol(values.currencySelection)
    return (
      <div className="finance-tab-contents tab-budgeting">
        {showCreateEditBudgetModalWindow && budgetModalData && (
          <CreateEditBudgetModalWindow
            isEdit={isEdit || false}
            budgetModalData={budgetModalData}
            accountFrequencyDropdownOptions={getAccountOptions(this.props.aggregations)}
            onSubmit={() => this.submitCreateEditBudgetModalWindow()}
            onClose={() => this.setState({ showCreateEditBudgetModalWindow: false })}
          />
        )}
        <div className="top-title">{t('financeManager.tabBudgeting.progressions')}</div>
        <PFMSelect
          onSelect={this.onChangeDropdown}
          aggregations={aggregations}
          {...this.state.values}
        />
        {!budget && <div className="tip-txt">{t('common.loading')}</div>}
        {budget && (
          <div className="all-accounts">
            <div className="gray-group">
              {this.getBudgets().map((item, index) => (
                <div className="items" key={index}>
                  <div className={`gray-inner ${hasBudget(item) ? '' : 'before-create'}`}>
                    <div className="top-area">
                      <div className="lefts">
                        <div className="icon-txt">
                          <span className="icons">
                            <img src={getCT(item).icon} alt="img" />
                          </span>
                          <div className="right-txt">
                            <div className="title">{getCT(item).title}</div>
                            <div className="price">
                              {moment(item.budgetFromDate).format(DATE_FMT)}
                              {' - '}
                              {moment(item.budgetToDate).format(DATE_FMT)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rights">
                        <span className="blue-price">
                          <NumberFormat
                            value={item.budgetLimit}
                            displayType={'text'}
                            thousandSeparator
                            prefix={symbol}
                          />
                        </span>
                        <a
                          href="#javascript"
                          className="icons icon-more label-transparent"
                          onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            this.openEditDeletePopup(item)
                          }}
                        >
                          {t('common.btns.more')}
                        </a>
                        {!hasBudget(item) && (
                          <div className="no-txt">{t('financeManager.tabBudgeting.no_budget')}</div>
                        )}

                        <div className="day-txt">
                          {item.budgetDaysLeft} {t('financeManager.tabBudgeting.days_left')}
                        </div>
                      </div>
                    </div>
                    <div className="bottom-area">
                      <div className="prog-boxs">
                        {hasBudget(item) && (
                          <span className="account-number">
                            {formatAccNumber(values.accountSelection.split('-')[1])}
                          </span>
                        )}
                        <div className="prog-bar">
                          <div className="blue-bg">
                            {item.budgetSpentPercentage > 0 && (
                              <div
                                className="color-green"
                                style={{ width: `${Math.max(item.budgetSpentPercentage + 1, 6)}%` }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="prog-top">
                          <div className={`left-green ${hasBudget(item) ? '' : 'hide'}`}>
                            {item.budgetSpent > 0 && (
                              <NumberFormat
                                value={item.budgetSpent}
                                displayType={'text'}
                                thousandSeparator
                                prefix={symbol}
                              />
                            )}
                            <span className="parent">({item.budgetSpentPercentage}%)</span>
                          </div>
                          <div className="black-txt">
                            {!!item.budgetLeft && (
                              <NumberFormat
                                value={item.budgetLeft}
                                displayType={'text'}
                                thousandSeparator
                                prefix={symbol}
                              />
                            )}{' '}
                            {t('financeManager.tabBudgeting.left')}
                          </div>
                          {!hasBudget(item) && (
                            <a
                              href="#javascript"
                              className="add-link"
                              onClick={() => {
                                this.openCreateEditBudgetModalWindow(false, item)
                              }}
                            >
                              +{t('financeManager.tabBudgeting.create_budget')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {deleteRow && deleteRow.category === item.category && (
                    <div className="modal-default delete-budget">
                      <div className="modal-mains">
                        <div className="title-area">
                          <div className="blue-title flex-grid">
                            {t('financeManager.tabBudgeting.delete_budget')}
                            <a
                              href="#javascript"
                              className="right-close"
                              onClick={() => this.setState({ deleteRow: undefined })}
                            >
                              <img src="/assets/black-close.svg" alt="img" className="img-icon" />
                            </a>
                          </div>
                        </div>
                        <div className="modal-info">
                          <div className="top-line">
                            <img className="icon" src={getCT(deleteRow).icon} alt="delete" />
                            <span className="bold-txt">{getCT(deleteRow).title}</span>
                          </div>
                          <div className="txt">
                            {t('financeManager.tabBudgeting.sure_delete_this')}
                          </div>
                        </div>
                        <div className="bottom-btns">
                          <BaseTextLinkButton
                            label={t('financeManager.tabBudgeting.yes')}
                            href={'#javascript'}
                            isButton
                            loading={this.state.loading}
                            onClick={(event: any) => {
                              event.stopPropagation()
                              this.deleteBudget()
                            }}
                          />

                          <BaseTextLinkButton
                            label={t('common.btns.cancel')}
                            href={'#javascript'}
                            onClick={() => this.setState({ deleteRow: undefined })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {popupRow && popupRow.category === item.category && (
                    <div className="edit-delete">
                      <div
                        className="edit"
                        onClick={() => {
                          this.openCreateEditBudgetModalWindow(true, item)
                        }}
                      >
                        <i className="icon-edit" />
                        <span className="txt">{t('financeManager.tabBudgeting.edit_budget')}</span>
                      </div>
                      <div
                        className="delete"
                        onClick={() => {
                          this.setState({ deleteRow: item })
                          this.closeAllEditDeletePopups()
                        }}
                      >
                        <i className="icon-delete" />
                        <span className="txt">
                          {t('financeManager.tabBudgeting.delete_budget')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <AccountProfileMobile accountProfile={accountProfile} />
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TabBudgeting)
