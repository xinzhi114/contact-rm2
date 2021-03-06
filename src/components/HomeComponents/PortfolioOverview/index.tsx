import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IPortfolioOverviewProps {
  t: any
  individualBusiness: string
  dataList: {
    carousel: {
      companyName: string
      price: string
      changeType: string
      changeFromLastMonth: string
      productList: {
        iconUrl: string
        price: string
        title: string
      }[]
    }[]
  }
}

interface IPortfolioOverviewState {
  isOpend: boolean
  currentIndex: number
  prevArrowDisabled: boolean
  nextArrowDisabled: boolean
}

export class PortfolioOverview extends Component<IPortfolioOverviewProps, IPortfolioOverviewState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
      currentIndex: 0,
      prevArrowDisabled: true,
      nextArrowDisabled: false,
    }
  }

  // click Prev Arrow
  clickPrevArrow() {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
      prevArrowDisabled: this.state.currentIndex <= 1 ? true : false,
      nextArrowDisabled: false,
    })
  }

  // click Next Arrow
  clickNextArrow() {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      prevArrowDisabled: false,
      nextArrowDisabled:
        this.state.currentIndex < this.props.dataList.carousel.length - 2 ? false : true,
    })
  }

  // set arrow state
  setArrowState(currentIndex: number) {
    this.setState({
      prevArrowDisabled: currentIndex <= 0 ? true : false,
      nextArrowDisabled: currentIndex < this.props.dataList.carousel.length - 1 ? false : true,
    })
  }

  render() {
    const { t } = this.props
    const { individualBusiness, dataList } = { ...this.props }
    const { isOpend, currentIndex, prevArrowDisabled, nextArrowDisabled } = { ...this.state }

    return (
      <div className={`white-panel portfolio-overview ${isOpend ? 'open' : ''}`}>
        {!!dataList && (
          <React.Fragment>
            <div className="title-bar flex-grid">
              <div className="blue-title">
                {individualBusiness === 'individual'
                  ? t('home.portfolioOverview.your_financial_overview')
                  : t('home.portfolioOverview.your_portfolio')}
                {individualBusiness !== 'individual' && (
                  <div className="sub-title">{dataList.carousel[currentIndex].companyName}</div>
                )}
              </div>
              <div className="rights">
                <a
                  href="#javascript"
                  className="icons btn-info-icon label-transparent"
                  onClick={(event) => event.preventDefault()}
                >
                  {t('common.btns.info_icon')}
                </a>
              </div>
            </div>
            <div className="navigation-arrow">
              <a
                href="#javascript"
                className={`dot-arrow prev label-transparent ${
                  prevArrowDisabled ? 'disabled' : ''
                }`}
                onClick={(event) => {
                  this.clickPrevArrow()
                  event.preventDefault()
                }}
              >
                {t('common.btns.prev_arrow')}
              </a>
              <a
                href="#javascript"
                className={`dot-arrow next label-transparent ${
                  nextArrowDisabled ? 'disabled' : ''
                }`}
                onClick={(event) => {
                  this.clickNextArrow()
                  event.preventDefault()
                }}
              >
                {t('common.btns.next_arrow')}
              </a>
            </div>
            {dataList.carousel &&
              dataList.carousel.map((item, index) => (
                <div className={`${currentIndex === index ? '' : 'hide'}`} key={index}>
                  <div className={`por-toptxt`}>
                    <div className="top-bar flex-grid">
                      <div className="little-gray">
                        {individualBusiness === 'individual'
                          ? 'Your Personal finance total '
                          : 'YOUR NET WEALTH'}
                      </div>
                      <a
                        href="#javascript"
                        className="icons btn-info-icon label-transparent"
                        onClick={(event) => event.preventDefault()}
                      >
                        {t('common.btns.info_icon')}
                      </a>
                    </div>
                    <div className="money-bar">
                      <div className="money-txt" dangerouslySetInnerHTML={{ __html: item.price }} />
                      <div className="right-txt">
                        <div className="top-add">
                          {item.changeType === 'inscrease' ? '+' : '-'}£{item.changeFromLastMonth}
                          {item.changeType === 'inscrease' && <i className="icons icon-arrow-up" />}
                        </div>
                        <div className="txt">{t('home.portfolioOverview.from_last_month')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="some-gray-block">
                    {item.productList &&
                      item.productList.map((subItem, subIndex) => (
                        <NavLink
                          to={`/accountsDashboard/${subItem.title}`}
                          className="item-wrap"
                          key={subIndex}
                        >
                          <div className="items">
                            <div className="top-img">
                              <img src={subItem.iconUrl} alt="img" />
                            </div>
                            <div className="txt-area">
                              <div
                                className="money-txt"
                                dangerouslySetInnerHTML={{ __html: subItem.price }}
                              />
                              <span className="gray-txt">
                                <span className="txt">{subItem.title}</span>
                                <span className="icons btn-arrow-right" />
                              </span>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                  </div>
                </div>
              ))}
            <div className="scroll-link">
              <ul>
                {dataList.carousel &&
                  dataList.carousel.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#javascript"
                        className={`points label-transparent ${
                          currentIndex === index ? 'active' : ''
                        }`}
                        onClick={(event) => {
                          this.setState({ currentIndex: index })
                          this.setArrowState(index)
                          event.preventDefault()
                        }}
                      >
                        {t('common.btns.points')}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(PortfolioOverview)
