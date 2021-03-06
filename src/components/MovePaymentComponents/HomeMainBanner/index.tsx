import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { homeMainBannerNavigationList, homeMainBannerData } from '../../../config'
import './styles.scss'

interface IHomeMainBannerProps {
  t: any
  dataList?: {
    approveTransactionsPending: number
    onlineTransactionStatusPending: number
  }
  individualBusiness: string
}

interface IHomeMainBannerState {
  currentIndex: number
}

export class HomeMainBanner extends Component<IHomeMainBannerProps, IHomeMainBannerState> {
  constructor(props: any) {
    super(props)

    this.state = {
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
        this.state.currentIndex + 1 >= homeMainBannerData.length ? 0 : this.state.currentIndex + 1,
    })
  }

  render() {
    const { t, dataList, individualBusiness } = this.props

    return (
      <div className="move-payment-home-main-banner-boxs">
        <div className="black-title">
          {t('movePayment.homeMainBanner.select_transactions_to_continue')}
        </div>
        <div className="account-menu-wrap">
          <div className="row">
            {!!homeMainBannerNavigationList && (
              <React.Fragment>
                {homeMainBannerNavigationList &&
                  homeMainBannerNavigationList.map((sectionItem, sectionIndex) => (
                    <div className="col col-lg-12 col-12" key={sectionIndex}>
                      <div className="black-title">
                        {t('movePayment.homeMainBanner.' + sectionItem.sectionTitle)}
                      </div>
                      <div className="menu-list">
                        {sectionItem.optionsList &&
                          sectionItem.optionsList.map((optionItem, optionIndex) => (
                            <div
                              className={`items ${
                                individualBusiness === 'business' ||
                                (individualBusiness === 'individual' &&
                                  optionItem.individualBusiness !== 'business')
                                  ? ''
                                  : 'hide'
                              }`}
                              key={optionIndex}
                            >
                              <NavLink to={optionItem.pageUrl} className={`gray-inner`}>
                                <div className="lefts">
                                  <div className="top-icons">
                                    <img src={optionItem.iconUrl} alt="icons" />
                                  </div>
                                  <div className="menu-name">
                                    {t('movePayment.homeMainBanner.' + optionItem.title)}
                                  </div>
                                  <div className="gray-txt">
                                    {t('movePayment.homeMainBanner.' + optionItem.description)}
                                  </div>
                                </div>
                                {!!dataList && (
                                  <div className="rights">
                                    {optionItem.title === 'approve_transactions' && (
                                      <span className="btn btn-gray">
                                        {dataList.approveTransactionsPending} panding
                                      </span>
                                    )}
                                    {optionItem.title === 'transaction_status' && (
                                      <span className="btn btn-gray">
                                        {dataList.onlineTransactionStatusPending} panding
                                      </span>
                                    )}
                                  </div>
                                )}
                              </NavLink>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(HomeMainBanner)
