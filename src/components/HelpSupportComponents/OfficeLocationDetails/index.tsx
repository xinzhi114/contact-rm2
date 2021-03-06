import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { RegionalOfficeRsp } from '../../../common/Api/Domains/rsp/HelpRsp'

export interface IOfficeLocationDetailsProps {
  t: any
  office: RegionalOfficeRsp
}

export class OfficeLocationDetails extends Component<IOfficeLocationDetailsProps, {}> {
  render() {
    const { t } = this.props
    const { office } = { ...this.props }

    return (
      <div className="card-list-boxs office-location-right-content">
        <React.Fragment>
          <div className="title-line-bar mobile-hide">
            <img className="icons" alt="img" src={'/assets/filter-build@2x.png'} />
            <span className="txt">{office.title}</span>
          </div>

          <div className="list-content">
            <div className="row-line">
              <div className="title">{t('helpSupport.officeLocationDetails.office_location')}</div>
              <div className="group flex-grid">
                <div className="left-txt">
                  <div className="green-txt">{office.addressLine1}</div>
                  <div className="green-txt">{office.addressLine2}</div>
                </div>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green"
                >
                  {t('helpSupport.officeLocationDetails.view_map')}
                </a>
              </div>
            </div>

            <div className="row-line">
              <div className="title">
                {t('helpSupport.officeLocationDetails.office_working_days')}
              </div>
              <div className="group flex-grid">
                <div className="left-txt">
                  <div className="black-txt">{office.workDate}</div>
                  <div className="green-txt">{office.workRange}</div>
                  <div className="green-txt">{office.tip}</div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(OfficeLocationDetails)
