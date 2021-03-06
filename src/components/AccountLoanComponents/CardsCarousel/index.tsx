import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface ICardsCarouselProps {
  t: any
  isEditMode?: boolean
  dataList: {
    status: string
    bankName: string
    cardType: string
    cardNumber: string
    expireDate: string
  }[]
}

interface ICardsCarouselState {
  cardIndex: number
  prevArrowDisabled: boolean
  nextArrowDisabled: boolean
  isOpend: boolean
}

export class CardsCarousel extends Component<ICardsCarouselProps, ICardsCarouselState> {
  constructor(props: any) {
    super(props)

    this.state = {
      cardIndex: 0,
      prevArrowDisabled: true,
      nextArrowDisabled: false,
      isOpend: true,
    }

    if (!this.isMobileView()) {
      this.autoScroll()
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.dataList !== prevProps.dataList) {
      if (this.props.dataList) {
        this.setState({
          cardIndex: 0,
          prevArrowDisabled: true,
          nextArrowDisabled: false,
        })
      }
    }
  }

  // auto scroll
  autoScroll() {
    setInterval(() => {
      this.setState({
        cardIndex:
          this.state.cardIndex + 1 >= this.props.dataList.length ? 0 : this.state.cardIndex + 1,
      })
    }, 5000)
  }

  // click Prev Arrow
  clickPrevArrow() {
    this.setState({
      cardIndex: this.state.cardIndex - 1,
      prevArrowDisabled: this.state.cardIndex <= 1 ? true : false,
      nextArrowDisabled: false,
    })
  }

  // click Next Arrow
  clickNextArrow() {
    this.setState({
      cardIndex: this.state.cardIndex + 1,
      prevArrowDisabled: false,
      nextArrowDisabled: this.state.cardIndex >= this.props.dataList.length - 2 ? true : false,
    })
  }

  // is Mobile view
  isMobileView() {
    return window.innerWidth <= 768
  }

  render() {
    const { t } = this.props
    const { isEditMode, dataList } = { ...this.props }
    const { cardIndex, prevArrowDisabled, nextArrowDisabled, isOpend } = { ...this.state }

    return (
      <div className={`white-panel ${isOpend ? 'open' : ''}`}>
        <div className="title-bar flex-grid">
          <div className="blue-title">
            {isEditMode && <i className="icons icon-four-arrow" />}
            {t('accountsDashboard.cardsCarousel.cards')}
          </div>
          <div className="card-arrow mobile-hide">
            <a
              href="#javascript"
              className={`btn-arrow prev label-transparent ${prevArrowDisabled ? 'disabled' : ''}`}
              onClick={(event) => {
                this.clickPrevArrow()
                event.preventDefault()
              }}
            >
              {t('common.btns.prev_arrow')}
            </a>
            <a
              href="#javascript"
              className={`btn-arrow next label-transparent ${nextArrowDisabled ? 'disabled' : ''}`}
              onClick={(event) => {
                this.clickNextArrow()
                event.preventDefault()
              }}
            >
              {t('common.btns.next_arrow')}
            </a>
          </div>
          <div className="rights desktop-hide mobile-show">
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
        <div className="expend-boxs">
          <div className="card-wrap">
            <ul>
              {dataList &&
                dataList.map((item, index) => (
                  <li key={index} style={{ transform: `translateX(-${cardIndex * 248}px)` }}>
                    <NavLink to={`/accountsDashboardPage/manageCard/${index}`}>
                      <div className={`card-item ${item.status === 'inactive' ? 'gray' : 'blue'}`}>
                        <div className="bg-img" />
                        <div className="top-title flex-grid">
                          <div className="lefts ">
                            <div className="green-txt">{item.bankName}</div>
                            <div className="thin-txt">{item.cardType}</div>
                          </div>
                          <div className="rights">
                            <img src="/assets/yellow-block@2x.png" alt="img" />
                          </div>
                        </div>
                        <div className="number">{item.cardNumber}</div>
                        <div className="bottom-txt">
                          <div className="little">
                            {t('accountsDashboard.cardsCarousel.expiry')}
                          </div>
                          <div className="date">{item.expireDate}</div>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(CardsCarousel)
