import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface ICardLeftProfileProps {
  t: any
  dataList: {
    bankName: string
    cardType: string
    fieldList: {
      label: string
      value: string
    }[]
    manageDebitCard: {
      type: string
      iconUrl: string
      title: string
      description: string
      rightGrayText: string
      actived: boolean
    }[]
  }[]
  cardDisableColor: string
  currentIndex: number
  onClickPrevArrow?: any
  onClickNextArrow?: any
}

interface ICardLeftProfileState {
  prevArrowDisabled: boolean
  nextArrowDisabled: boolean
}

export class CardLeftProfile extends Component<ICardLeftProfileProps, ICardLeftProfileState> {
  constructor(props: any) {
    super(props)

    this.state = {
      prevArrowDisabled: props.currentIndex <= 0 ? true : false,
      nextArrowDisabled: props.currentIndex >= props.dataList.length - 1 ? true : false,
    }
  }

  // click Prev Arrow
  clickPrevArrow() {
    this.props.onClickPrevArrow(this.props.currentIndex - 1)

    this.setState({
      prevArrowDisabled: this.props.currentIndex <= 1 ? true : false,
      nextArrowDisabled: false,
    })
  }

  // click Next Arrow
  clickNextArrow() {
    this.props.onClickNextArrow(this.props.currentIndex + 1)

    this.setState({
      prevArrowDisabled: false,
      nextArrowDisabled: this.props.currentIndex >= this.props.dataList.length - 2 ? true : false,
    })
  }

  render() {
    const { t } = this.props
    const { dataList, cardDisableColor, currentIndex } = { ...this.props }
    const { prevArrowDisabled, nextArrowDisabled } = { ...this.state }

    return (
      <div className="left-panel card-area">
        <div className="card-scroll">
          <a
            href="#javascript"
            className={`icons btn-left label-transparent ${prevArrowDisabled ? 'disabled' : ''}`}
            onClick={(event) => {
              this.clickPrevArrow()
              event.preventDefault()
            }}
          >
            {t('common.btns.prev_arrow')}
          </a>

          {dataList &&
            dataList.map((item, index) => (
              <div
                key={index}
                className={`card-item ${
                  item.fieldList[3].value === 'inactive' ? cardDisableColor : 'blue'
                } ${currentIndex !== index ? 'desktop-hide' : ''}`}
              >
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
                <div className="number">{item.fieldList[0].value}</div>
                <div className="bottom-txt">
                  <div className="little">{t('accountsDashboard.cardLeftProfile.expiry')}</div>
                  <div className="date">{item.fieldList[2].value}</div>
                </div>
              </div>
            ))}
          <a
            href="#javascript"
            className={`icons btn-right label-transparent ${nextArrowDisabled ? 'disabled' : ''}`}
            onClick={(event) => {
              this.clickNextArrow()
              event.preventDefault()
            }}
          >
            {t('common.btns.next_arrow')}
          </a>
        </div>
        {!!dataList && (
          <div className="card-detail">
            <div className="blue-title">{t('accountsDashboard.cardLeftProfile.card_details')}</div>
            <div className="row-line">
              {dataList[currentIndex].fieldList &&
                dataList[currentIndex].fieldList.map((item, index) => (
                  <div className="items" key={index}>
                    <div className="label-txt">
                      {t('accountsDashboard.cardLeftProfile.' + item.label)}
                    </div>
                    <div className={`values ${item.label === 'status' ? 'status' : ''}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(CardLeftProfile)
