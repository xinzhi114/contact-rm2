import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { dashboardLeftCarouselData } from '../../../config'
import './styles.scss'

interface IDashboardLeftCarouselProps {
  t: any
  clickApplyNow?: () => void
}

interface IDashboardLeftCarouselState {
  isOpend: boolean
  currentIndex: number
}

export class DashboardLeftCarousel extends Component<
  IDashboardLeftCarouselProps,
  IDashboardLeftCarouselState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
      currentIndex: 0,
    }

    this.autoScroll()
  }

  // auto scroll
  autoScroll() {
    setInterval(() => {
      this.doScroll()
    }, 5000)
  }

  doScroll() {
    this.setState({
      currentIndex:
        this.state.currentIndex + 1 >= dashboardLeftCarouselData.length
          ? 0
          : this.state.currentIndex + 1,
    })
  }

  render() {
    const { t } = this.props
    const { isOpend, currentIndex } = { ...this.state }

    return (
      <div className={`white-panel dashboard-left-carousel ${isOpend ? 'open' : ''}`}>
        {dashboardLeftCarouselData &&
          dashboardLeftCarouselData.map((item, index) => (
            <div key={index} className={`${currentIndex === index ? '' : 'hide'}`}>
              <React.Fragment>
                <div className="img-bg">
                  <div className="gray-cover" />
                  <img src={item.imgUrl} alt="img" className="bgimg" />
                </div>
                <div className="z-top">
                  <div className="title-bar ">
                    <div className="white-title faster-white-title">
                      {t('home.dashboardLeftCarousel.' + item.titleLeft)}{' '}
                      <span className="green-txt">
                        {t('home.dashboardLeftCarousel.' + item.titleMiddle)}
                      </span>{' '}
                      {t('home.dashboardLeftCarousel.' + item.titleRight)}
                    </div>
                    <a
                      href="#javascript"
                      className="btn btn-light-blue"
                      onClick={(event) => {
                        if (this.props.clickApplyNow) this.props.clickApplyNow()
                        event.preventDefault()
                      }}
                    >
                      {t('home.dashboardLeftCarousel.' + item.buttonText)}
                    </a>
                  </div>
                </div>
              </React.Fragment>
            </div>
          ))}
        <div className="dashboard-scroll-link">
          <ul>
            {dashboardLeftCarouselData &&
              dashboardLeftCarouselData.map((item, index) => (
                <li key={index}>
                  <a
                    href="#javascript"
                    className={`points label-transparent ${currentIndex === index ? 'active' : ''}`}
                    onClick={(event) => {
                      this.setState({ currentIndex: index })
                      event.preventDefault()
                    }}
                  >
                    {t('common.btns.points')}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(DashboardLeftCarousel)
