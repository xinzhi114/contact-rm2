import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TransactionHistoryFiltersModalWindow from '../TransactionHistoryFiltersModalWindow'
import TransactionHistoryDownloadModalWindow from '../TransactionHistoryDownloadModalWindow'
import * as _ from 'lodash'
import { withTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import TabBordered from '../../../components/TabBordered'
import './styles.scss'

interface ITransactionHistoryProps {
  t: any
  isEditMode?: boolean
  accountType?: string
  individualBusiness: string
  dataList?: {
    transactions: {
      dateLabel: string
      itemList: {
        iconUrl: string
        title: string
        timeLabel: string
        price: string
        cardSubfix: string
        changedLabel: string
        changedTypeRed: boolean
      }[]
    }[]
    spendingCategories: {
      iconUrl: string
      title: string
      timeLabel: string
      price: string
      cardSubfix: string
    }[]
    pendingTransactions: {
      dateLabel: string
      itemList: {
        iconUrl: string
        title: string
        timeLabel: string
        price: string
        cardSubfix: string
        changedLabel: string
        changedTypeRed: boolean
      }[]
    }[]
  }
  showDownload?: boolean
}

interface ITransactionHistoryState {
  isOpend?: boolean
  isSearchOpened?: boolean
  searchText?: string
  currentTab: string
  showFilterModalWindow?: boolean
  showDownloadModalWindow?: boolean
  shownItemListTransactions?: {
    dateLabel: string
    itemList: {
      iconUrl: string
      title: string
      timeLabel: string
      price: string
      cardSubfix: string
      changedLabel: string
      changedTypeRed: boolean
    }[]
  }[]
  shownItemListSpendingCategories?: {
    iconUrl: string
    title: string
    timeLabel: string
    price: string
    cardSubfix: string
  }[]
  shownItemListPendingTransactions?: {
    dateLabel: string
    itemList: {
      iconUrl: string
      title: string
      timeLabel: string
      price: string
      cardSubfix: string
      changedLabel: string
      changedTypeRed: boolean
    }[]
  }[]
}

const tabArrayTransactionHistory = [
  {
    label: 'Transactions',
    showControl: '',
  },
  {
    label: 'Spending categories',
    showControl: '',
  },
  {
    label: 'Pending transactions',
    showControl: '',
  },
]
export class TransactionHistory extends Component<
  ITransactionHistoryProps,
  ITransactionHistoryState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
      isSearchOpened: false,
      searchText: '',
      currentTab: 'Transactions',
      showFilterModalWindow: false,
      showDownloadModalWindow: false,
      shownItemListTransactions: this.props.dataList?.transactions || [],
      shownItemListSpendingCategories: this.props.dataList?.spendingCategories || [],
      shownItemListPendingTransactions: this.props.dataList?.pendingTransactions || [],
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.dataList !== prevProps.dataList) {
      if (this.props.dataList) {
        this.setState({
          searchText: '',
          shownItemListTransactions: this.props.dataList.transactions,
          shownItemListSpendingCategories: this.props.dataList.spendingCategories,
          shownItemListPendingTransactions: this.props.dataList.pendingTransactions,
          currentTab: 'Transactions',
        })
      }
    }
  }

  // handle Input Change of Search input box
  handleInputChange(fieldName: string, event: any) {
    const searchText = event.target.value.toString()

    this.searchForResult(searchText)
  }

  // search for result
  searchForResult(searchText: string) {
    if (
      !this.props.dataList ||
      (!this.props.dataList.transactions &&
        !this.props.dataList.spendingCategories &&
        !this.props.dataList.pendingTransactions)
    ) {
      return
    }

    let dataListTransactions = _.cloneDeep(this.props.dataList.transactions || [])
    dataListTransactions = dataListTransactions.filter((item) => {
      item.itemList = item.itemList.filter((subItem) => {
        return subItem.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      })

      return item.itemList.length > 0
    })

    let dataListPendingTransactions = _.cloneDeep(this.props.dataList.pendingTransactions || [])
    dataListPendingTransactions = dataListPendingTransactions.filter((item) => {
      item.itemList = item.itemList.filter((subItem) => {
        return subItem.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      })

      return item.itemList.length > 0
    })

    this.setState({
      searchText,
      shownItemListTransactions:
        searchText === '' ? this.props.dataList.transactions : dataListTransactions,
      shownItemListPendingTransactions:
        searchText === '' ? this.props.dataList.pendingTransactions : dataListPendingTransactions,
    })
  }

  render() {
    const { t } = this.props
    const { isEditMode, accountType, individualBusiness, showDownload } = { ...this.props }
    const {
      isOpend,
      isSearchOpened,
      searchText,
      currentTab,
      showFilterModalWindow,
      showDownloadModalWindow,
      shownItemListTransactions,
      shownItemListSpendingCategories,
      shownItemListPendingTransactions,
    } = {
      ...this.state,
    }

    return (
      <div className={`transation-panel white-panel ${isOpend ? 'open' : ''}`}>
        {showFilterModalWindow && (
          <TransactionHistoryFiltersModalWindow
            onApply={() => this.setState({ showFilterModalWindow: false })}
            onClose={() => this.setState({ showFilterModalWindow: false })}
          />
        )}

        {showDownloadModalWindow && (
          <TransactionHistoryDownloadModalWindow
            onApply={() => this.setState({ showDownloadModalWindow: false })}
            onClose={() => this.setState({ showDownloadModalWindow: false })}
          />
        )}

        <div className={`search-filter-wrap ${isSearchOpened || true ? 'search-status' : ''}`}>
          {accountType !== 'current' && (
            <div className="gray-title flex-grid">
              <div className="left">
                <span className="top-title">
                  {isEditMode && <i className="icons icon-four-arrow" />}
                  {t('accountsDashboard.transactionHistory.transaction_history')}
                </span>
                {showDownload && (
                  <BaseTextLinkButton
                    label={t('accountsDashboard.transactionHistory.download')}
                    href={'#javascript'}
                    isButton
                    onClick={() => {
                      this.setState({
                        showDownloadModalWindow: true,
                      })
                    }}
                  />
                )}
              </div>
              <div className="rights">
                <a
                  href="#javascript"
                  className="icons btn-arrow label-transparent"
                  onClick={(event) => {
                    this.setState({ isOpend: !isOpend })
                    event.preventDefault()
                  }}
                >
                  {t('common.btns.arrow')}
                </a>
              </div>
            </div>
          )}
          {accountType === 'current' && (
            <TabBordered
              individualBusiness={individualBusiness}
              tabArray={tabArrayTransactionHistory}
              currentTab={currentTab}
              clickTab={(tabName: string) => this.setState({ currentTab: tabName })}
            />
          )}
          {(currentTab === 'Transactions' || currentTab === 'Pending transactions') && (
            <div className="search-bar mt-10">
              <div className="seach-module">
                <BaseTextInput
                  id="searchTransaction"
                  placeholder={t('eStatements.eStatementsRight.search_transaction')}
                  value={searchText || ''}
                  onChange={(event) => this.handleInputChange('searchText', event)}
                >
                  <span className="icons icon-search">&nbsp;</span>
                  <a
                    href="#javascript"
                    className="icons btn-filter label-transparent"
                    onClick={(event) => {
                      this.setState({ showFilterModalWindow: true })
                      event.preventDefault()
                    }}
                  >
                    {t('common.btns.filter')}
                  </a>
                </BaseTextInput>
              </div>
            </div>
          )}
        </div>
        {currentTab === 'Transactions' && accountType === 'current' && (
          <React.Fragment>
            {!!shownItemListTransactions && shownItemListTransactions.length === 0 && (
              <div className="search-none">
                <div className="center-mains">
                  <img src="/assets/gray-big-search.svg" alt="svg" />
                  <p className="txt">
                    {t('accountsDashboard.transactionHistory.no_search_results')}"{searchText}",{' '}
                    {t('accountsDashboard.transactionHistory.try_extending_txt')}
                  </p>

                  <BaseTextLinkButton
                    label={t('accountsDashboard.transactionHistory.advance_search')}
                    href={'#javascript'}
                    isButton
                  />
                </div>
              </div>
            )}
            {!!shownItemListTransactions && shownItemListTransactions.length !== 0 && (
              <div className="expend-boxs">
                {shownItemListTransactions.map((item, index) => (
                  <div className="group" key={index}>
                    <div className="gray-txt mb10">{item.dateLabel}</div>
                    {item.itemList &&
                      item.itemList.map((subItem, subIndex) => (
                        <div className="list-row" key={subIndex}>
                          <div className="left-area">
                            <div className="img-boxs">
                              <img src={subItem.iconUrl} alt="png" />
                            </div>
                            <div className="right-txt">
                              <a
                                href="#javascript"
                                className="blue-txt"
                                onClick={(event) => event.preventDefault()}
                              >
                                {subItem.title}
                              </a>
                              <div className="gray-time">{subItem.timeLabel}</div>
                            </div>
                          </div>
                          <div className="middle-area">
                            <div className={`number ${subItem.changedTypeRed ? 'red' : 'green'}`}>
                              {subItem.changedLabel}
                            </div>
                          </div>
                          <div className="right-area">
                            <div className="number-txt">
                              <div
                                className="number"
                                dangerouslySetInnerHTML={{ __html: subItem.price }}
                              />
                              <div className="gray-num">XXXX - {subItem.cardSubfix}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
                <div className="bottom-link">
                  <NavLink to="/accountsDashboardPage/transactionHistory" className="link-view">
                    {t('accountsDashboard.transactionHistory.view_all')}
                  </NavLink>
                </div>
              </div>
            )}
          </React.Fragment>
        )}

        {currentTab === 'Spending categories' && accountType === 'current' && (
          <React.Fragment>
            {!!shownItemListSpendingCategories && shownItemListSpendingCategories.length !== 0 && (
              <div className="expend-boxs">
                <div className="group mt-10">
                  {shownItemListSpendingCategories.map((item, index) => (
                    <div className="list-row border-bottom" key={index}>
                      <div className="left-area">
                        <div className="img-boxs">
                          <img src={item.iconUrl} alt="png" />
                        </div>
                        <div className="right-txt">
                          <a
                            href="#javascript"
                            className="blue-txt strong-txt"
                            onClick={(event) => event.preventDefault()}
                          >
                            {item.title}
                          </a>
                          <div className="gray-time">{item.timeLabel}</div>
                        </div>
                      </div>
                      <div className="right-area">
                        <div className="number-txt">
                          <div
                            className="number"
                            dangerouslySetInnerHTML={{ __html: item.price }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bottom-link">
                  <NavLink to="/financeManager" className="link-view">
                    Go to Finance Manager
                  </NavLink>
                </div>
              </div>
            )}
          </React.Fragment>
        )}

        {(currentTab === 'Pending transactions' ||
          accountType === 'savings' ||
          accountType === 'closed' ||
          accountType === '') && (
          <React.Fragment>
            {!!shownItemListPendingTransactions && shownItemListPendingTransactions.length !== 0 && (
              <div className="expend-boxs mt-10">
                {shownItemListPendingTransactions.map((item, index) => (
                  <div className="group" key={index}>
                    <div className="gray-txt mb10">{item.dateLabel}</div>
                    {item.itemList &&
                      item.itemList.map((subItem, subIndex) => (
                        <div className="list-row" key={subIndex}>
                          <div className="left-area">
                            <div className="img-boxs">
                              <img src={subItem.iconUrl} alt="png" />
                            </div>
                            <div className="right-txt">
                              <a
                                href="#javascript"
                                className="blue-txt"
                                onClick={(event) => event.preventDefault()}
                              >
                                {subItem.title}
                              </a>
                              <div className="gray-time">{subItem.timeLabel}</div>
                            </div>
                          </div>
                          <div className="right-area">
                            <div className="number-txt">
                              <div
                                className="number"
                                dangerouslySetInnerHTML={{ __html: subItem.price }}
                              />
                              <div className="gray-num">XXXX - {subItem.cardSubfix}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
                <div className="bottom-link">
                  <NavLink to="/accountsDashboardPage/transactionHistory" className="link-view">
                    {t('accountsDashboard.transactionHistory.view_all')}
                  </NavLink>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TransactionHistory)
