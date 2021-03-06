import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import DashboardRelationshipManager from '../../DashboardRelationshipManager'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface ISelectContactBankOptionsProps {
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
  tabArray: string[]
  currentTabIndex: number
  currentSecureEmailCategoryIndex: number
  dataList: {
    totalNumber: number
    categoryList: {
      categoryName: string
      categoryTotalNumber: number
      unreadNumber: number
      unread: {
        groupTitle: string
        emailList: {
          title: string
          replyEmail: string
          sn: string
          time: string
          content: string
        }[]
      }[]
      readNumber: number
      read: {
        groupTitle: string
        emailList: {
          title: string
          replyEmail: string
          sn: string
          time: string
          content: string
        }[]
      }[]
    }[]
  }
  selectTab?: any
  selectSecureEmailCategory?: any
}
interface ISelectContactBankOptionsState {
  tabSelection?: string
  isOpenSecureEmail?: boolean
}

export class SelectContactBankOptions extends Component<
  ISelectContactBankOptionsProps,
  ISelectContactBankOptionsState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      tabSelection: this.props.tabArray[this.props.currentTabIndex],
      isOpenSecureEmail: false,
    }
  }

  // on change dropdown
  onChangeDropdown = (event: any) => {
    this.setState({
      tabSelection: event,
    })

    this.props.tabArray.forEach((item, index) => {
      if (item === event) {
        this.props.selectTab(index)
      }
    })
  }

  // click Secure Email Arrow
  clickSecureEmailArrow() {
    this.setState({
      isOpenSecureEmail: !this.state.isOpenSecureEmail,
    })
  }

  render() {
    const { t } = this.props
    const {
      individualBusiness,
      relationshipManager,
      tabArray,
      currentTabIndex,
      currentSecureEmailCategoryIndex,
      dataList,
    } = { ...this.props }
    const { tabSelection, isOpenSecureEmail } = { ...this.state }

    return (
      <div
        className={`white-panel select-contact-bank-options ${
          individualBusiness === 'business' ? 'business-account' : ''
        }`}
      >
        <div className="mobile-select-top">
          <div className="top-select desktop-hide tablet-show">
            <Dropdown onSelect={(event) => this.onChangeDropdown(event)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic-contact-bank">
                {tabSelection}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {!!tabArray &&
                  tabArray.map((item, index) => (
                    <Dropdown.Item eventKey={item} key={index}>
                      {t('common.dynamicLabels.' + item)}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="black-title tablet-hide">
          {t('helpSupport.selectContactBankOptions.contact_bank_options')}
        </div>
        <div className="tab-list tablet-hide">
          <ul>
            {tabArray &&
              tabArray.map((item, index) => (
                <React.Fragment key={index}>
                  {item === 'Call' && (
                    <li>
                      <a
                        href="#javascript"
                        className={`tab-bar ${currentTabIndex === index ? 'current' : ''}`}
                        onClick={(event) => {
                          this.setState({
                            isOpenSecureEmail: false,
                          })
                          this.props.selectTab(index)
                          event.preventDefault()
                        }}
                      >
                        {t('common.dynamicLabels.' + item)}
                      </a>
                    </li>
                  )}
                  {item === 'Secure Email' && !!dataList && (
                    <li className={`${isOpenSecureEmail ? 'open' : ''}`}>
                      <div
                        className={`have-right tab-bar ${
                          currentTabIndex === index ? 'current' : ''
                        }`}
                        onClick={(event) => {
                          this.setState({
                            isOpenSecureEmail: true,
                          })
                          this.props.selectTab(index)
                          event.preventDefault()
                        }}
                      >
                        {t('common.dynamicLabels.' + item)}

                        <div className="rights">
                          <span className="num">{dataList.totalNumber}</span>
                          <a
                            href="#javascript"
                            className="icons icon-arrow label-transparent"
                            onClick={(event) => {
                              this.props.selectTab(index)
                              this.clickSecureEmailArrow()
                              event.stopPropagation()
                            }}
                          >
                            {t('common.btns.arrow')}
                          </a>
                        </div>
                      </div>
                      <div className="open-expend">
                        <div className="email-list">
                          <ul>
                            {dataList.categoryList &&
                              dataList.categoryList.map((categoryItem, categoryIndex) => (
                                <li key={categoryIndex}>
                                  <a
                                    href="#javascript"
                                    className={`select-item ${
                                      currentSecureEmailCategoryIndex === categoryIndex
                                        ? 'current'
                                        : ''
                                    }`}
                                    onClick={(event) => {
                                      this.props.selectSecureEmailCategory(categoryIndex)
                                      event.preventDefault()
                                    }}
                                  >
                                    <div className="left-txt">
                                      {t(
                                        'common.dynamicLabelsFromData.' + categoryItem.categoryName
                                      )}
                                    </div>
                                    <div className="right-txt">
                                      {categoryItem.categoryTotalNumber}
                                    </div>
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  )}
                  {item === 'Chat' && (
                    <li>
                      <a
                        href="#javascript"
                        className={`tab-bar disabled ${currentTabIndex === index ? 'current' : ''}`}
                        onClick={(event) => {
                          this.props.selectTab(index)
                          event.preventDefault()
                        }}
                      >
                        {t('common.dynamicLabels.' + item)}
                      </a>
                    </li>
                  )}
                </React.Fragment>
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
export default withTranslation()(SelectContactBankOptions)
