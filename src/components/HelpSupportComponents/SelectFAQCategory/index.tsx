import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { FAQRsp } from '../../../common/Api/Domains/rsp/HelpRsp'

export interface ISelectFAQCategoryProps {
  t: any
  currentIndex: number
  faq: FAQRsp[]
  clickContactUs?: any
  selectTab?: any
}
interface ISelectFAQCategoryState {
  tabSelection?: string
}

export class SelectFAQCategory extends Component<ISelectFAQCategoryProps, ISelectFAQCategoryState> {
  constructor(props: any) {
    super(props)

    this.state = {
      tabSelection: this.props.faq[0].name,
    }
  }
  // on change dropdown
  onChangeDropdown = (event: any) => {
    this.setState({
      tabSelection: event,
    })

    this.props.faq.forEach((item, index) => {
      if (item.name === event) {
        this.props.selectTab(index)
      }
    })
  }

  render() {
    const { t } = this.props
    const { currentIndex, faq } = { ...this.props }
    const { tabSelection } = { ...this.state }

    return (
      <div className="white-panel select-faq-category">
        <div className="mobile-select-top">
          <div className="top-select desktop-hide tablet-show">
            <Dropdown onSelect={(event) => this.onChangeDropdown(event)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic-faq-category">
                {tabSelection}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {faq.map((item, index) => (
                  <Dropdown.Item eventKey={item.name} key={index}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="black-title tablet-hide">
          {t('helpSupport.selectFAQCategory.select_FAQ_category')}
        </div>
        <div className="tab-list tablet-hide">
          <ul>
            {faq.map((item, index) => (
              <li key={index}>
                <a
                  href="#javascript"
                  className={`tab-bar ${currentIndex === index ? 'current' : ''}`}
                  onClick={(event) => {
                    this.props.selectTab(index)
                    event.preventDefault()
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom-green">
          <i className="icons icon-question" />
          <p className="blue-txt">{t('helpSupport.selectFAQCategory.please_contact_us')}</p>

          <BaseTextLinkButton
            label={t('helpSupport.selectFAQCategory.contact_us')}
            href={'#javascript'}
            isButton
            onClick={() => {
              this.props.clickContactUs()
            }}
          />
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(SelectFAQCategory)
