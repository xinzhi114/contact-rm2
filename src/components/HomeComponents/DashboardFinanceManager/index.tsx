import React, { Component } from 'react'
import CustomCalendar from '../CustomCalendar'
import IncomeOutgoingsChart from '../../FinanceManagerComponents/IncomeOutgoingsChart'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IDashboardFinanceManagerProps {
  t: any
  data: {
    dateLabelYear: string
    dateLabelDay: string
    dateLabelMonth: string
    eventsList: {
      title: string
      dueTime: string
      amount: string
      accountType: string
      accountId: string
    }[]
  }[]
  dataChart?: any
}

interface IDashboardFinanceManagerState {
  type: 'list' | 'chart' | 'calendar'
}

export class DashboardFinanceManager extends Component<
  IDashboardFinanceManagerProps,
  IDashboardFinanceManagerState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      type: 'list', // 'list'
    }
  }

  render() {
    const { t } = this.props
    const { data, dataChart } = { ...this.props }
    const { type } = { ...this.state }

    return (
      <div className={`white-panel finance-manager open`}>
        {!!data && (
          <React.Fragment>
            <div className="title-bar flex-grid">
              <div className="blue-title">
                {t('home.dashboardFinanceManager.upcoming_activity_events')}
              </div>
              <div className="rights">
                <div className={`two-tab ${!!dataChart ? 'three-icons' : ''}`}>
                  <a
                    href="#javascript"
                    className={`icons btn-list label-transparent ${
                      type === 'list' ? 'current' : ''
                    }`}
                    onClick={(event) => {
                      this.setState({ type: 'list' })
                      event.preventDefault()
                    }}
                  >
                    {t('common.btns.list')}
                  </a>
                  {!!dataChart && (
                    <a
                      href="#javascript"
                      className={`icons btn-finance label-transparent ${
                        type === 'chart' ? 'current' : ''
                      }`}
                      onClick={(event) => {
                        this.setState({ type: 'chart' })
                        event.preventDefault()
                      }}
                    >
                      {t('common.btns.finance')}
                    </a>
                  )}
                  <a
                    href="#javascript"
                    className={`icons btn-calender label-transparent ${
                      type === 'calendar' ? 'current' : ''
                    }`}
                    onClick={(event) => {
                      this.setState({ type: 'calendar' })
                      event.preventDefault()
                    }}
                  >
                    {t('common.btns.calender')}
                  </a>
                </div>
              </div>
            </div>
            {type === 'list' && (
              <div className="finance-list">
                <ul>
                  {data &&
                    data.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.eventsList &&
                          item.eventsList.map((eventItem, eventIndex) => (
                            <li key={eventIndex}>
                              <div className="items">
                                <div className="left-area">
                                  <div className="left-img">
                                    <div className="center-txt">
                                      <div className="num">{item.dateLabelDay}</div>
                                      <div className="oc-txt">{item.dateLabelMonth}</div>
                                    </div>
                                    <img src="/assets/calendar-box.svg" alt="png" />
                                  </div>
                                  <div className="info-txt">
                                    <div className="top-txt">{eventItem.title}</div>
                                    <div className="txt">{eventItem.dueTime}</div>
                                  </div>
                                </div>
                                <div className="right-area">
                                  <div className="price">{eventItem.amount}</div>
                                  <div className="gray-txt">
                                    {eventItem.accountType} {eventItem.accountId}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </React.Fragment>
                    ))}
                </ul>
                <div className="bottom-link">
                  <a
                    href="#javascript"
                    className="link-view"
                    onClick={(event) => event.preventDefault()}
                  >
                    {t('home.dashboardFinanceManager.view_more')}
                  </a>
                </div>
              </div>
            )}
            {type === 'chart' && !!dataChart && (
              <React.Fragment>
                <IncomeOutgoingsChart chartData={dataChart} />
                <div className="bottom-bar">
                  <div className="two-points flex">
                    <div className="items">
                      <span className="points green" />
                      <span className="txt">{t('home.dashboardFinanceManager.income')}</span>
                    </div>
                    <div className="items">
                      <span className="points blue" />
                      <span className="txt">{t('home.dashboardFinanceManager.outgoings')}</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
            {type === 'calendar' && <CustomCalendar dataList={data} />}
          </React.Fragment>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(DashboardFinanceManager)
