import React, { Component } from 'react'
import './styles.scss'
import NumberFormat from 'react-number-format'
import AccountProfileMobile from '../AccountProfileMobile'
import { AccountProfile } from '../../../domain/AccountProfile'
import { Aggregation, AggregationAccount } from '../../../domain/Aggregation'
import { withTranslation } from 'react-i18next'
import { getCurrencySymbol } from '../../../services/Util'
import AccountChart from '../AccountChart'
import { getAccountColor, PFM_COLORS } from '../PFMConfigProvider'

interface ITabAccountAggregationProps {
  accountProfile?: AccountProfile
  aggregations: Aggregation[]
  t: any
}

interface ITabAccountAggregationState {
  closed: any
}

export class TabAccountAggregation extends Component<
  ITabAccountAggregationProps,
  ITabAccountAggregationState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      closed: {},
    }
  }
  componentDidMount() {
    if (this.isMobileView()) {
      this.collapseBottomThreeBoxes()
    }
  }

  collapseBox = (index: number) => {
    const closed = { ...this.state.closed }
    this.setState({ closed: { ...closed, [index]: !closed[index] } })
  }
  collapseBottomThreeBoxes = () => {
    let closed = { 0: false }
    for (let i = 1; i < 20; i++) {
      closed = { ...closed, [i]: true }
    }
    this.setState({ closed })
  }

  isExpanded = (index: number) => {
    return !this.state.closed[index]
  }
  isMobileView() {
    return window.innerWidth <= 768
  }
  symbol = (item: Aggregation) => {
    return getCurrencySymbol(item.currency)
  }
  render() {
    const { aggregations, accountProfile, t } = { ...this.props }

    if (!aggregations) {
      return <div className="tip-txt">{t('common.loading')}</div>
    }

    /**
     * render sub lint
     */
    const renderSubLine = (
      acc: AggregationAccount,
      index: number,
      color: string,
      symbol: string,
      product: string,
      balance: number
    ) => {
      return (
        <div className="points-example flex-grid" key={index}>
          <div className="lefts">
            <span className="points" style={{ backgroundColor: `${color}` }} />
            <span className="txt">{product}</span>
          </div>
          <div className="price">
            <NumberFormat
              value={balance}
              displayType={'text'}
              thousandSeparator
              prefix={symbol}
            />
          </div>
        </div>
      )
    }
    return (
      <div className="finance-tab-contents tab-account-aggregation">
        <div className="border-boxs">
          {aggregations &&
            aggregations.map((item, index) => (
              <div className="items" key={index}>
                <div className="inner">
                  <div className="title-bar flex-grid">
                    <span className="blue-points1 mobile-show desktop-hide">
                      {this.symbol(item)}
                    </span>
                    <div className="title">{item.accountType}</div>
                    <span className="blue-points2 desktop-show mobile-hide">
                      {this.symbol(item)}
                    </span>
                    <i
                      className={`icon-expand mobile-show desktop-hide ${
                        this.isExpanded(index) ? 'expanded' : ''
                      }`}
                      onClick={() => this.collapseBox(index)}
                    />
                  </div>
                  {this.isExpanded(index) && (
                    <div className="chat-boxs">
                      <AccountChart index={index} aggregation={item} />
                      <span className="chat-num">
                        <NumberFormat
                          value={item.aggregatedBalance}
                          displayType={'text'}
                          thousandSeparator
                          prefix={'$'}
                        />
                      </span>
                    </div>
                  )}
                  {this.isExpanded(index) && (
                    <div className="gray-list">
                      {item.accounts &&
                        item.accounts.map((subItem, subIndex) => (
                          <div className="gray-item" key={subIndex}>
                            <div className="titles flex-grid">
                              {subItem.accountName}
                              <span className="parent">{subItem.percentage}%</span>
                            </div>
                            {renderSubLine(
                              subItem,
                              0,
                              getAccountColor(0),
                              getCurrencySymbol(item.currency),
                              subItem.product,
                              subItem.balance
                            )}
                            {!!subItem.overdraft &&
                              renderSubLine(
                                subItem,
                                1,
                                PFM_COLORS.RoyalRed,
                                getCurrencySymbol(item.currency),
                                this.props.t('accountsDashboard.normalClosedAccountCard.overdraft'),
                                subItem.overdraft
                              )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <AccountProfileMobile accountProfile={accountProfile} />
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TabAccountAggregation)
