import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import IncomeOutgoingsChart from '../IncomeOutgoingsChart'
import AccountProfileMobile from '../AccountProfileMobile'
import { Aggregation } from '../../../domain/Aggregation'
import { InComeOutGoing } from '../../../domain/InComeOutGoing'
import { AccountProfile } from '../../../domain/AccountProfile'
import { PFMSelect, PFMSelectValues } from '../PFMSelect'
import { GET_CUR_OPTIONS, GET_TIME_LINE_OPTIONS, useAccountOptions } from '../PFMConfigProvider'
import { getCurrencySymbol } from '../../../services/Util'
import { get, map } from 'lodash'

interface ITabIncomeOutgoingsProps {
  t: any
  aggregations: Aggregation[]
  incomeAndOutgoing?: InComeOutGoing
  pfmActions: any
  accountProfile?: AccountProfile
}

interface ITabIncomeOutgoingsState {
  values: PFMSelectValues
}

export class TabIncomeOutgoings extends Component<
  ITabIncomeOutgoingsProps,
  ITabIncomeOutgoingsState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      values: {
        accountSelection: useAccountOptions(this.props.aggregations),
        timelineSelection: GET_TIME_LINE_OPTIONS()[0].value,
        currencySelection: GET_CUR_OPTIONS()[0].value,
      },
    }
  }

  componentDidMount() {
    this.fetchIncomeAndOutgoing()
  }

  /**
   * fetch income and outgoing records
   */
  fetchIncomeAndOutgoing = () => {
    const { accountSelection, timelineSelection } = this.state.values
    const accountParts = accountSelection.split('-')
    this.props.pfmActions.loadIncomeAndOutgoing({
      accountType: accountParts[0],
      accountNumber: accountParts[1],
      tenure: timelineSelection,
    })
  }

  // on change dropdown
  onChangeDropdown = (fieldName: string, event: any) => {
    this.setState({ values: { ...this.state.values, [fieldName]: event } }, () => {
      if (fieldName !== 'currencySelection') {
        this.fetchIncomeAndOutgoing()
      }
    })
  }

  // get Chart Data
  getChartData() {
    const { currencySelection } = this.state.values
    const symbol = getCurrencySymbol(currencySelection)
    const dataArr = get(this.props.incomeAndOutgoing, 'plots.' + currencySelection, [])
    return {
      symbol,
      isEmpty: dataArr.length <= 0,
      dataList: [map(dataArr, (i) => i.income), map(dataArr, (i) => i.expense)],
      xTitles: map(dataArr, (i) => i.date),
    }
  }

  render() {
    const { t } = this.props
    const { accountProfile, incomeAndOutgoing, aggregations } = { ...this.props }

    return (
      <div className="finance-tab-contents tab-income-outgoing">
        <div className="top-title">{t('financeManager.tabIncomeOutgoings.progressions')}</div>
        <PFMSelect
          onSelect={this.onChangeDropdown}
          aggregations={aggregations}
          showExtraLabels
          {...this.state.values}
        />
        {!incomeAndOutgoing && <div className="tip-txt">{t('common.loading')}</div>}
        {incomeAndOutgoing && <IncomeOutgoingsChart chartData={this.getChartData()} />}

        <div className="right-points flex mobile-right-points desktop-hide mobile-show">
          <div className="group">
            <span className="point income-color" />
            <span className="txt">{t('financeManager.tabIncomeOutgoings.income')}</span>
          </div>
          <div className="group">
            <span className="point outgoings-color" />
            <span className="txt">{t('financeManager.tabIncomeOutgoings.outgoings')}</span>
          </div>
        </div>
        <AccountProfileMobile accountProfile={accountProfile} />
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TabIncomeOutgoings)
