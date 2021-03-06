import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'

interface IMostActiveAccountsProps {
  t: any
  dataList: {
    accountType: string
    accountNumber: string
    remainingBalance: string
    overdraft: string
  }[]
}

interface IMostActiveAccountsState {
  isOpend: boolean
}

export class MostActiveAccounts extends Component<
  IMostActiveAccountsProps,
  IMostActiveAccountsState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
    }
  }

  render() {
    const { t } = this.props
    const { dataList } = { ...this.props }
    const { isOpend } = { ...this.state }

    return (
      <div className={`white-panel most-active-accounts ${isOpend ? 'open' : ''}`}>
        <div className="title-bar flex-grid">
          <div className="blue-title">{t('home.mostActiveAccounts.my_favourite_accounts')}</div>
          <div className="rights">
            <a
              href="#javascript"
              className="icons btn-question label-transparent"
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              {t('common.btns.question')}
            </a>
          </div>
        </div>
        {!!dataList && (
          <div className="expend-boxs">
            {dataList.map((item, index) => (
              <div className="gray-boxs" key={index}>
                <div className="top-bar">
                  <div className="lefs">
                    <div className="title">{item.accountType}</div>
                    <div className="num">{item.accountNumber}</div>
                  </div>
                  <div className="rights">
                    <span className="blue-point">£</span>
                  </div>
                </div>
                <div className="center-txt">
                  {item.remainingBalance}/ <span className="little-txt">{item.overdraft}</span>
                </div>
                <div className="bottom-txt">{t('home.mostActiveAccounts.remaining_balance')}</div>
              </div>
            ))}
            <div className="bottom-link">
              <a
                href="#javascript"
                className="link-view"
                onClick={(event) => event.preventDefault()}
              >
                {t('home.mostActiveAccounts.view_more')}
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(MostActiveAccounts)
