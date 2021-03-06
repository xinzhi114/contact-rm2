import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IContactUsProps {
  t: any
  dataList: {
    phoneNumber: string
    email: string
  }
  showArrow: boolean
  onClickArrow?: any
}

export class ContactUs extends Component<IContactUsProps> {
  render() {
    const { t } = this.props
    const { dataList, showArrow } = { ...this.props }

    return (
      <div className="contact-boxs mobile-contact ">
        <div className="big-title flex-grid">
          {t('accountsDashboard.contactUs.contact_us')}
          <div className={`rights desktop-hide ${showArrow ? 'mobile-show' : ''}`}>
            <a
              href="#javascript"
              className="icons btn-arrow label-transparent"
              onClick={(event) => {
                this.props.onClickArrow(event)
                event.preventDefault()
              }}
            >
              {t('common.btns.arrow')}
            </a>
          </div>
        </div>
        {!!dataList && (
          <div className="expend-boxs">
            <div className="green-txt">{t('accountsDashboard.contactUs.to_discuss_account')}</div>
            <div className="three-link">
              <a
                href="#javascript"
                className="icon-link"
                onClick={(event) => event.preventDefault()}
              >
                <i className="icons icon-mobile" />
                <span className="txt">{dataList.phoneNumber}</span>
              </a>
              <a href={'mailto:' + dataList.email} className="icon-link">
                <i className="icons icon-email" />
                <span className="txt">{dataList.email}</span>
              </a>
              <a
                href="#javascript"
                className="icon-link"
                onClick={(event) => event.preventDefault()}
              >
                <i className="icons icon-message" />
                <span className="txt">{t('accountsDashboard.contactUs.message_center')}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(ContactUs)
