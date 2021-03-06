import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { dashboardRightCarouselData } from '../../../config'
import './styles.scss'

interface IDashboardRightCarouselProps {
  t: any
  clickApplyNow?: () => void
}

interface IDashboardRightCarouselState {
  isOpend: boolean
  currentIndex: number
}

export class DashboardRightCarousel extends Component<
  IDashboardRightCarouselProps,
  IDashboardRightCarouselState
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
        this.state.currentIndex + 1 >= dashboardRightCarouselData.length
          ? 0
          : this.state.currentIndex + 1,
    })
  }

  render() {
    const { t } = this.props
    const { isOpend, currentIndex } = { ...this.state }

    return (
      <div className={`white-panel dashboard-right-carousel ${isOpend ? 'open' : ''}`}>
        {dashboardRightCarouselData &&
          dashboardRightCarouselData.map((item, index) => (
            <div key={index} className={`${currentIndex === index ? '' : 'hide'}`}>
              <React.Fragment>
                <div className="img-bg">
                  <div className="gray-cover" />
                  <img src={item.imgUrl} alt="img" />
                </div>
                <div className="z-top">
                  <div className="title-bar flex-grid">
                    <div className="white-title">
                      {t('home.dashboardRightCarousel.' + item.title)}
                    </div>
                  </div>
                  <div className="expend-boxs">
                    <div className="inner-area">
                      <p className="long-txt">
                        {t('home.dashboardRightCarousel.' + item.description)}
                      </p>
                      <div className="bottom-area">
                        {item.bottomLeftText !== '' && (
                          <div className="white-txt">
                            {t('home.dashboardRightCarousel.' + item.bottomLeftText)}
                          </div>
                        )}
                        <a
                          href="#javascript"
                          className="btn btn-white"
                          onClick={(event) => {
                            if (this.props.clickApplyNow) this.props.clickApplyNow()
                            event.preventDefault()
                          }}
                        >
                          {t('home.dashboardRightCarousel.' + item.buttonText)}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </div>
          ))}
        <div className="dashboard-scroll-link">
          <ul>
            {dashboardRightCarouselData &&
              dashboardRightCarouselData.map((item, index) => (
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
export default withTranslation()(DashboardRightCarousel)
