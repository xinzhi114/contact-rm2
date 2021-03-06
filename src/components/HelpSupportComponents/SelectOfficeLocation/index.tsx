import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import DashboardRelationshipManager from '../../DashboardRelationshipManager'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { RegionalOfficeRsp } from '../../../common/Api/Domains/rsp/HelpRsp'

export interface ISelectOfficeLocationProps {
  t: any
  individualBusiness: string
  relationshipManager: {
    photoUrl: string
    stars: number
    name: string
    role: string
    state: string
    email: string
    phoneNumber: string
    yourNextAppointment: {
      timeFull: string
      timeRange: string
      subject: string
      iconUrl: string
      topLabel: string
      bottomLabel: string
    }
  }
  currentIndex: number
  offices: RegionalOfficeRsp[]
  selectTab?: any
}
interface ISelectOfficeLocationState {
  tabSelection?: string
}

export class SelectOfficeLocation extends Component<
  ISelectOfficeLocationProps,
  ISelectOfficeLocationState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      tabSelection: this.props.offices[0].title,
    }
  }
  // on change dropdown
  onChangeDropdown = (event: any) => {
    this.setState({
      tabSelection: event,
    })

    this.props.offices.forEach((item, index) => {
      if (item.title === event) {
        this.props.selectTab(index)
      }
    })
  }

  render() {
    const { t } = this.props
    const { individualBusiness, relationshipManager, currentIndex, offices } = { ...this.props }
    const { tabSelection } = { ...this.state }

    return (
      <div className="white-panel select-office-location">
        <div className="mobile-select-top">
          <div className="top-select desktop-hide tablet-show">
            <Dropdown onSelect={(event) => this.onChangeDropdown(event)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic-office-location">
                {tabSelection}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {offices.map((item, index) => (
                  <Dropdown.Item eventKey={item.title} key={index}>
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="black-title tablet-hide">
          {t('helpSupport.selectOfficeLocation.office_location')}
        </div>
        <div className="tab-list tablet-hide">
          <ul>
            {offices.map((item, index) => (
              <li key={index}>
                <a
                  href="#javascript"
                  className={`tab-bar ${currentIndex === index ? 'current' : ''}`}
                  onClick={(event) => {
                    this.props.selectTab(index)
                    event.preventDefault()
                  }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {individualBusiness === 'business' && !!relationshipManager && (
          <DashboardRelationshipManager hideAppointment data={relationshipManager} />
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(SelectOfficeLocation)
