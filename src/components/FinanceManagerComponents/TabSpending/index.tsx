import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import NumberFormat from 'react-number-format'
import SpendingChart from '../SpendingChart'
import SpendingMovedModalWindow from '../SpendingMovedModalWindow'
import AccountProfileMobile from '../AccountProfileMobile'
import { AccountProfile } from '../../../domain/AccountProfile'
import {
  GET_CUR_OPTIONS,
  GET_TIME_LINE_OPTIONS,
  getSpendCategory,
  PFM_CATEGORY_MAP,
  useAccountOptions,
} from '../PFMConfigProvider'
import { Aggregation } from '../../../domain/Aggregation'
import {
  Spending,
  SpendingRow,
  SpendingTransaction,
  SpendingTransactionItem,
} from '../../../domain/Spending'
import { PFMSelect, PFMSelectValues } from '../PFMSelect'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'
import { PFMService } from '../../../common/Api/Services/PFMService'
import { noop, get, isNil } from 'lodash'
import { formatAmount, getCurrencySymbol } from '../../../services/Util'
import { showErrorMsg } from '../../Toast'
import moment from 'moment'
import { DATE_TIME_FMT } from '../../../config'
import { Dropdown } from 'react-bootstrap'

interface ITabSpendingProps {
  t: any
  accountProfile: AccountProfile
  aggregations: Aggregation[]
  spending?: Spending[]
  pfmActions: any
}

interface ITabSpendingState {
  moveContainerRef: HTMLDivElement | null
  spendingTransactions: Record<string, SpendingTransaction>
  expandedIndex?: number
  values: PFMSelectValues
  showSuccess?: boolean
  loading?: boolean
  moveDestination?: string
  itemBeingMoved?: string
  itemCurrentlyIn?: string
  openedTxn?: SpendingTransactionItem
}

// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef<HTMLDivElement, any>(
  ({ children, style, moveContainerNode, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          width: moveContainerNode
            ? `${moveContainerNode.getBoundingClientRect().width}px`
            : 'auto',
        }}
        className={className}
        aria-labelledby={labeledBy}
      >
        {children}
      </div>
    )
  }
)

export class TabSpending extends Component<ITabSpendingProps, ITabSpendingState> {
  constructor(props: any) {
    super(props)

    this.state = {
      moveContainerRef: null,
      expandedIndex: -1,
      showSuccess: false,
      moveDestination: '',
      itemBeingMoved: '',
      itemCurrentlyIn: '',
      values: {
        accountSelection: useAccountOptions(this.props.aggregations),
        timelineSelection: GET_TIME_LINE_OPTIONS()[2].value,
        currencySelection: GET_CUR_OPTIONS()[0].value,
      },
      spendingTransactions: {},
    }
  }

  componentWillUnmount() {
    this.setState = noop
  }
  componentDidMount() {
    this.fetchSpendCategory(true)
  }

  /**
   * fetch spend category
   */
  fetchSpendCategory = (clear = true) => {
    this.props.pfmActions.loadSpending(this.getCategoryParams(), clear)
  }

  /**
   * fetch category transaction
   * @param category the category
   * @param txnKey the category-transaction key
   */
  fetchCategoryTxn = (category: string, txnKey: string) => {
    const { spendingTransactions } = this.state
    const st = this.state.spendingTransactions[txnKey]
    const nextStartCursor = st ? st.nextStartCursor : ''
    const params = this.getTransactionsParams(category, nextStartCursor)

    const setSpendingTransactions = (newTxns: any) => {
      this.setState({ spendingTransactions: newTxns })
    }
    // show loading
    if (st) {
      setSpendingTransactions({
        ...spendingTransactions,
        [txnKey]: {
          ...st,
          loading: true,
        },
      })
    }

    ASF.getService(PFMService)
      .getSpendTransactions(params)
      .then(({ body }: any) => {
        if (!st) {
          setSpendingTransactions({ ...spendingTransactions, [txnKey]: body })
        } else {
          const newTrans = [...st.transactions]
          const newSt = {
            ...body,
            transactions: newTrans.concat(body.transactions),
          }
          setSpendingTransactions({ ...spendingTransactions, [txnKey]: newSt })
        }
      })
      .catch((e) => showErrorMsg(e))
  }

  /**
   * get filter params
   */
  getCategoryParams = () => {
    const { accountSelection, timelineSelection } = this.state.values
    const accountParts = accountSelection.split('-')
    return {
      accountType: accountParts[0],
      accountNumber: accountParts[1],
      tenure: timelineSelection,
    }
  }

  /**
   * get transactions by cateogry
   * @param category the category name
   * @param nextStartCursor the next start cursor
   */
  getTransactionsParams = (category: string, nextStartCursor = '') => {
    const { currencySelection } = this.state.values
    return {
      ...this.getCategoryParams(),
      currency: currencySelection,
      spendCategory: category,
      nextStartCursor,
    }
  }

  // on change dropdown
  onChangeDropdown = (fieldName: string, event: any) => {
    this.setState({ values: { ...this.state.values, [fieldName]: event } }, () => {
      if (fieldName !== 'currencySelection') {
        this.fetchSpendCategory(true)
      }
    })
  }

  // click Arrow
  clickArrow(index: number, event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ expandedIndex: this.state.expandedIndex === index ? -1 : index }, () => {
      if (
        !isNil(this.state.expandedIndex) &&
        this.state.expandedIndex >= 0 &&
        this.props.spending
      ) {
        const r = this.getRows()[this.state.expandedIndex]
        const txnKey = this.getTxnKey(r)
        // index changed
        this.setState({ loading: false })
        if (!this.state.spendingTransactions[txnKey]) {
          this.fetchCategoryTxn(r.category, this.getTxnKey(r))
        }
      }
    })
  }

  // click Spending Item Arrow
  clickArrowSubIndex(txn: SpendingTransactionItem, event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ openedTxn: this.state.openedTxn === txn ? undefined : txn })
  }

  onMoveContainerRefChange(node: HTMLDivElement | null) {
    if (node && node !== this.state.moveContainerRef) {
      this.setState({
        moveContainerRef: node,
      })
    }
  }

  onDropdownListRef(node: HTMLUListElement | null) {
    if (node) {
      node.onscroll = () => {
        if (this.state.moveContainerRef) {
          const dropdownMenu = this.state.moveContainerRef.querySelector('.dropdown-menu')
          if (dropdownMenu) {
            const rect1 = dropdownMenu.getBoundingClientRect()
            const rect2 = node.getBoundingClientRect()
            const overlap = !(
              rect1.right < rect2.left ||
              rect1.left > rect2.right ||
              rect1.bottom < rect2.top ||
              rect1.top > rect2.bottom
            )
            if (!overlap || rect1.y < rect2.y) {
              this.setState({ itemCurrentlyIn: '' })
            }
          }
        }
      }
    }
  }

  /**
   * move transaction to other category
   */
  onShiftSpendingItem = (dest: string | null, source: string, transactionId: number) => {
    if (!dest) {
      return
    }
    this.setState({ loading: true })
    ASF.getService(PFMService)
      .moveTransactions({
        transactionId,
        newCategory: dest,
      })
      .then(() => {
        this.setState({
          openedTxn: undefined,
          itemCurrentlyIn: undefined,
          expandedIndex: -1,
          showSuccess: true,
          itemBeingMoved: getSpendCategory(source).title,
          moveDestination: getSpendCategory(dest).title,
          spendingTransactions: {},
        })
        // fetch data
        this.fetchSpendCategory(false)
      })
      .catch(showErrorMsg)
      .finally(() => this.setState({ loading: false }))
  }

  /**
   * get spending rows
   */
  getRows = (): SpendingRow[] => {
    if (!this.props.spending) {
      return []
    }
    return get(this.props.spending, 'spends.' + this.state.values.currencySelection, [])
  }

  /**
   * get txn key
   * @param row the spending row
   */
  getTxnKey = (row: SpendingRow) => {
    const { values } = this.state
    return `${values.accountSelection}-${values.currencySelection}-${row.category}`
  }

  /**
   * load more transaction
   * @param row the spending row
   */
  loadMoreTxn = (row: SpendingRow) => {
    this.fetchCategoryTxn(row.category, this.getTxnKey(row))
  }

  /**
   * render txn list
   */
  renderTxnList = (item: SpendingRow) => {
    const { t } = this.props
    // get spend transactions
    const st = this.state.spendingTransactions[this.getTxnKey(item)]
    const isEnabled = (txn: SpendingTransactionItem) =>
      this.state.openedTxn && this.state.openedTxn.transactionId === txn.transactionId
    return (
      <div className="lists">
        <ul
          ref={(node) => {
            this.onDropdownListRef(node)
          }}
        >
          {st &&
            st.transactions.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className={`${isEnabled(subItem) ? 'activesubitem' : ''}`}
                onClick={(event) => this.clickArrowSubIndex(subItem, event)}
              >
                <div className="lefts">
                  <div className="txt-area">
                    <div className="top-txt">{subItem.transactionName}</div>
                    <div className="gray-txt">
                      {getCurrencySymbol(this.state.values.currencySelection)}
                      {formatAmount(subItem.amount)}
                    </div>
                  </div>
                </div>
                <div className="rights">
                  <div className="top-txt">
                    <NumberFormat
                      value={subItem.amount}
                      displayType={'text'}
                      thousandSeparator
                      prefix={getCurrencySymbol(this.state.values.currencySelection)}
                    />
                  </div>
                  <div className="gray-txt">{moment(subItem.timeStamp).format(DATE_TIME_FMT)}</div>
                </div>
                <i className="icons icon-arrow" />
                {isEnabled(subItem) && this.state.loading && (
                  <div className="move-container">
                    <div className="tip-txt">{t('common.loading')}</div>
                  </div>
                )}
                {isEnabled(subItem) && !this.state.loading && (
                  <div
                    className="move-container"
                    ref={(node) => this.onMoveContainerRefChange(node)}
                  >
                    <div className="txt">{t('financeManager.tabSpending.move_to')}</div>

                    <Dropdown
                      bsPrefix="drop-module finance-manager-move-to-dropdown"
                      onSelect={(event) =>
                        this.onShiftSpendingItem(event, item.category, subItem.transactionId)
                      }
                      onClick={(event: any) => {
                        event.stopPropagation()
                        this.setState({
                          itemCurrentlyIn:
                            this.state.itemCurrentlyIn === item.category
                              ? undefined
                              : item.category,
                        })
                      }}
                      show={this.state.itemCurrentlyIn === item.category}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic-category">
                        {t('financeManager.tabSpending.select_spend_category')}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        popperConfig={{ strategy: 'fixed' }}
                        as={CustomMenu}
                        moveContainerNode={this.state.moveContainerRef}
                        flip={false}
                      >
                        <div className="top-area hide">
                          <span className="txt-title mobile-show-flex desktop-hide">
                            {t('financeManager.tabSpending.move_spending')}
                          </span>
                        </div>
                        <div className="txt-title-to mobile-show desktop-hide hide">
                          {t('financeManager.tabSpending.to')}
                        </div>
                        {Object.keys(PFM_CATEGORY_MAP)
                          .filter((k) => k !== item.category)
                          .map((category, itemIndex) => (
                            <div key={itemIndex}>
                              <Dropdown.Item className="" eventKey={category}>
                                <div
                                  className={`item ${
                                    this.state.itemCurrentlyIn === category ? 'current-item' : ''
                                  }`}
                                >
                                  <i className={`icon icon-${category}`} />
                                  <span className="txt">{PFM_CATEGORY_MAP[category].title}</span>
                                  <i
                                    className={`${
                                      this.state.itemCurrentlyIn === category ? '' : 'hide'
                                    } icon-checkmark`}
                                  />
                                </div>
                              </Dropdown.Item>
                            </div>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </li>
            ))}
        </ul>
        {(!st || st.loading) && <div className="tip-txt">{t('common.loading')}</div>}
        {st && st.hasMoreResult && !st.loading && (
          <div className="view-more">
            <BaseTextLinkButton
              label={t('financeManager.tabSpending.view_more')}
              onClick={() => this.loadMoreTxn(item)}
            />
          </div>
        )}
      </div>
    )
  }
  render() {
    const { t } = this.props
    const { accountProfile, spending, aggregations } = { ...this.props }
    const { expandedIndex } = this.state

    let extraMarginClass = ''
    if (!isNil(expandedIndex) && expandedIndex >= 0) {
      const row = Math.floor(expandedIndex / 2)
      switch (row) {
        case 2:
          extraMarginClass = 'more-panel-open-third-row'
          break
        case 3:
          extraMarginClass = 'more-panel-open-forth-row'
          break
        case 4:
          extraMarginClass = 'more-panel-open-fifth-row'
          break
        case 5:
          extraMarginClass = 'more-panel-open-last-row'
          break
      }
    }

    const isExpanded = (index: number) => {
      return expandedIndex === index
    }
    const sp = (item: SpendingRow) => {
      return getSpendCategory(item.category)
    }
    // current currency symbol
    const symbol = getCurrencySymbol(this.state.values.currencySelection)
    return (
      <div className={`finance-tab-contents tab-spending ${extraMarginClass}`}>
        <div className="top-title">{t('financeManager.tabSpending.progressions')}</div>
        <PFMSelect
          onSelect={this.onChangeDropdown}
          aggregations={aggregations}
          {...this.state.values}
        />
        {!spending && <div className="tip-txt">{t('common.loading')}</div>}
        {spending && this.getRows().length <= 0 && (
          <div className="no-transactions-txt">
            {t('financeManager.incomeOutgoingsChart.no_transactions_for')}
          </div>
        )}
        {spending && (
          <div className="chart-panel">
            {<SpendingChart expandedIndex={expandedIndex} rows={this.getRows()} />}
            <div className="right-gray-list">
              {this.getRows().map((item, index) => (
                <div className={`gray-group flex ${isExpanded(index) ? 'open' : ''}`} key={index}>
                  <div className="lefts" onClick={(event) => this.clickArrow(index, event)}>
                    <div
                      className="left-point"
                      style={{ backgroundColor: `${sp(item).tintColor}` }}
                    />
                    <div className="icon-txt">
                      <span className="icons ">
                        <img src={sp(item).icon} alt="img" />
                      </span>
                      <div className="right-txt">
                        <div className="title">{sp(item).title}</div>
                        <div className="price">
                          <NumberFormat
                            value={item.spent}
                            displayType={'text'}
                            thousandSeparator
                            prefix={symbol}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rights" onClick={(event) => this.clickArrow(index, event)}>
                    <div className="drop-parent">
                      <span className="parent-list">
                        {item.percentage}%
                        <i className="icons icon-arrow" />
                      </span>
                    </div>
                  </div>
                  {isExpanded(index) && (
                    <div className="more-panel">
                      <div className="title-bar">
                        <h4 className="blue-title">
                          {t('financeManager.tabSpending.amount_spent')}
                        </h4>
                        <div className="green-txt">
                          <NumberFormat
                            value={item.spent}
                            displayType={'text'}
                            thousandSeparator
                            prefix={symbol}
                          />
                        </div>
                      </div>
                      {this.renderTxnList(item)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {this.state.showSuccess && (
          <React.Fragment>
            <SpendingMovedModalWindow
              extraText1={this.state.moveDestination}
              extraText2={this.state.itemBeingMoved}
              onDismiss={() => this.setState({ showSuccess: false })}
            />
          </React.Fragment>
        )}
        <AccountProfileMobile accountProfile={accountProfile} />
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TabSpending)
