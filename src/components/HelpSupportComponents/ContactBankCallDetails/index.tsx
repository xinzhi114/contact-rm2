import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { ContactCallRsp } from '../../../common/Api/Domains/rsp/HelpRsp'

interface IContactBankCallDetailsProps {
  t: any
  call?: ContactCallRsp[]
}

export class ContactBankCallDetails extends Component<IContactBankCallDetailsProps, {}> {
  render() {
    const { t } = this.props
    const { call } = { ...this.props }

    return (
      <div className="card-list-boxs contact-bank-call-right-content">
        {!call && <p className="tip-txt left">{t('common.loading')}</p>}
        {call && (
          <React.Fragment>
            <div className="title-line-bar mobile-hide">
              <img className="icons" alt="img" src="/assets/icon-phone.png" />
              <span className="txt">
                {t('helpSupport.contactBankCallDetails.call_customer_service')}
              </span>
            </div>

            <div className="list-content">
              {call.map((item, index) => (
                <div className="row-line" key={index}>
                  <div className="title">{item.title}</div>
                  <div className="group-wrap">
                    <div className="items">
                      <div className="label-txt">
                        {t('helpSupport.contactBankCallDetails.telephone')}
                      </div>
                      <div className="values">{item.phone}</div>
                    </div>
                    <div className="items">
                      <div className="label-txt">
                        {t('helpSupport.contactBankCallDetails.availability_time')}
                      </div>
                      <div className="values">{item.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(ContactBankCallDetails)
