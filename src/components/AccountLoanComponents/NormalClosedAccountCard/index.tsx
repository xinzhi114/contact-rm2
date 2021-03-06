import React, { Component } from 'react'
import IconStar from '../IconStar'
import ChangeAccountNameModalWindow from '../ChangeAccountNameModalWindow'
import OutsideClickHandler from 'react-outside-click-handler'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface INormalClosedAccountCardProps {
  t: any
  isEditMode?: boolean
  isActive: boolean
  dataList: {
    id: number
    accountType: string
    isFavourite: boolean
    accountName: string
    customerId: string
    firstName: string
    lastName: string
    deliveryAddress: string
    accountCardInfoNormalClosed?: {
      // all type accounts
      activity: string
      number: string
      sortCode: string
      money: string
      overDraft: string
      closedDate: string
      interestRate: string
    }
    detailsNormalClosed?: {
      // 'normal', 'closed' accounts details
      showAccountAlerts: boolean
      accountsAlertSwitchAccountToList: string[]
      transactionHistory: {
        dateLabel: string
        itemList: {
          iconUrl: string
          title: string
          timeLabel: string
          price: string
          cardSubfix: string
        }[]
      }[]
      accountInformation: {
        fieldName: string
        fieldValue: string
      }[]
      todaysInsight: {
        fieldName: string
        fieldValue: string
      }[]
      quickActions: {
        buttonLabel: string
      }[]
      cards: {
        status: string
        bankName: string
        cardType: string
        cardNumber: string
        expireDate: string
      }[]
    }
  }
  onClick?: any
}

interface INormalClosedAccountCardState {
  isFavourite: boolean
  showPopup: boolean
  showChangeAccountNameModalWindow?: boolean
}

export class NormalClosedAccountCard extends Component<
  INormalClosedAccountCardProps,
  INormalClosedAccountCardState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      isFavourite: this.props.dataList.isFavourite,
      showPopup: false,
      showChangeAccountNameModalWindow: false,
    }
  }

  // click Settings
  clickSettings() {
    this.setState({
      showPopup: !this.state.showPopup,
    })
  }

  // click Favourite
  clickFavourite() {
    this.setState({
      isFavourite: !this.state.isFavourite,
      showPopup: false,
    })
  }

  // click Change Account Name
  clickChangeAccountName() {
    this.setState({
      showPopup: false,
      showChangeAccountNameModalWindow: true,
    })
  }

  // click Outside
  clickOutside() {
    this.setState({
      showPopup: false,
    })
  }

  render() {
    const { t } = this.props
    const { isEditMode, isActive, dataList } = { ...this.props }
    const { isFavourite, showPopup, showChangeAccountNameModalWindow } = { ...this.state }

    return (
      <div
        className={`white-card-panel ${isEditMode ? 'edit-status' : ''} ${
          isActive ? 'current' : ''
        }`}
        onClick={() => this.props.onClick()}
      >
        <div className="top-circle-bg" />
        <div className="bottom-trans" />
        {showChangeAccountNameModalWindow && (
          <ChangeAccountNameModalWindow
            accountName={dataList.accountName}
            onApply={() => this.setState({ showChangeAccountNameModalWindow: false })}
            onClose={() => this.setState({ showChangeAccountNameModalWindow: false })}
          />
        )}

        {!!dataList.accountCardInfoNormalClosed && (
          <React.Fragment>
            {dataList.accountType !== 'closed' && <div className="right-point">£</div>}
            <OutsideClickHandler onOutsideClick={() => this.clickOutside()}>
              <div
                className={`setting-wrap top-setting ${showPopup ? 'open' : ''}`}
                onClick={(event) => {
                  this.clickSettings()
                  event.stopPropagation()
                }}
              >
                <div className="tip-panel" onClick={(event) => event.stopPropagation()}>
                  <ul>
                    <li>
                      <a
                        href="#javascript"
                        className={`icon-txt icon-mark ${isFavourite ? 'active' : ''}`}
                        onClick={(event) => {
                          this.clickFavourite()
                          event.preventDefault()
                        }}
                      >
                        {t('accountsDashboard.normalClosedAccountCard.mark_as')}{' '}
                        {isFavourite ? 'unfavourite' : 'favourite'}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#javascript"
                        className="icon-txt icon-change"
                        onClick={(event) => {
                          this.clickChangeAccountName()
                          event.preventDefault()
                        }}
                      >
                        {t('accountsDashboard.normalClosedAccountCard.change_account_name')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </OutsideClickHandler>
            <div className="top-area">
              <div className="bold-txt">
                {dataList.accountCardInfoNormalClosed.activity}

                {isFavourite && <IconStar />}
              </div>
              <div className={`bottom-txt ${dataList.accountType === 'closed' ? 'mt-40' : ''}`}>
                <div className="bottom-normal">
                  {dataList.accountType === 'current' && (
                    <React.Fragment>
                      <div className="press-bar">
                        <div className="press-under flex-grid">
                          <div className="middle-txt">
                            {t('accountsDashboard.normalClosedAccountCard.available_balance')}/
                            {t('accountsDashboard.normalClosedAccountCard.overdraft')}
                          </div>
                        </div>
                      </div>
                      <div className="price-txt">
                        {dataList.accountCardInfoNormalClosed.money}/
                        <span className="overdraft">
                          {dataList.accountCardInfoNormalClosed.overDraft}
                        </span>
                      </div>
                    </React.Fragment>
                  )}

                  {dataList.accountType === 'savings' && (
                    <React.Fragment>
                      <div className="press-bar">
                        <div className="press-under flex-grid">
                          <div className="middle-txt">
                            {t('accountsDashboard.normalClosedAccountCard.available_balance')}
                          </div>
                        </div>
                      </div>
                      <div className="price-txt">{dataList.accountCardInfoNormalClosed.money}</div>
                    </React.Fragment>
                  )}

                  {dataList.accountType === 'loans' && (
                    <React.Fragment>
                      <div className="press-bar">
                        <div className="press-under flex-grid">
                          <div className="middle-txt">
                            {t('accountsDashboard.normalClosedAccountCard.interest_rate')}
                          </div>
                        </div>
                      </div>
                      <div className="price-txt">
                        {dataList.accountCardInfoNormalClosed.interestRate}
                      </div>
                    </React.Fragment>
                  )}
                </div>
                {dataList.accountType === 'closed' && (
                  <div className="bottom-close flex-grid">
                    <div className="red-block">
                      {t('accountsDashboard.normalClosedAccountCard.closed')}
                    </div>
                    <div className="lefts">{dataList.accountCardInfoNormalClosed.closedDate}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="bottom-area flex-grid">
              <div className="phone">
                <span className="left-label">
                  {t('accountsDashboard.normalClosedAccountCard.account_number')}&nbsp;
                </span>
                {dataList.accountCardInfoNormalClosed.number}
              </div>
              <div className="phone">
                <span className="left-label">
                  {t('accountsDashboard.normalClosedAccountCard.sort_code')}&nbsp;
                </span>
                {dataList.accountCardInfoNormalClosed.sortCode}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(NormalClosedAccountCard)
