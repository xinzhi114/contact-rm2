import React, { Component } from 'react'
import * as _ from 'lodash'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { ComposeEmailModal } from '../ComposeEmailModal'
import SuccessModal from '../../Modals/SuccessModal'
import { ViewEmailDetails } from '../ViewEmailDetails'
import { EmailList } from '../EmailList'

export interface IContactBankSecureEmailDataList {
  unreadNumber: number
  unread: {
    groupTitle: string
    emailList: {
      title: string
      replyEmail: string
      sn: string
      time: string
      content: string
      checked?: boolean
      popupShown?: boolean
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
      checked?: boolean
      popupShown?: boolean
    }[]
  }[]
}

export interface ISecureEmailDataList {
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
        isRm?: boolean
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
        isRm?: boolean
      }[]
    }[]
  }[]
}

interface IContactBankSecureEmailDetailsProps {
  t: any
  currentContactBankSecureEmailCategoryIndex: number
  secureEmailDataList: ISecureEmailDataList
  dataList: {
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
        read?: boolean
        isRm?: boolean
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
        read?: boolean
        isRm?: boolean
      }[]
    }[]
  }
  selectSecureEmailCategory?: any
}

interface IContactBankSecureEmailDetailsState {
  dataList: IContactBankSecureEmailDataList
  currentTabIndex: number
  selectedEmailItem: {
    title: string
    replyEmail: string
    sn: string
    time: string
    content: string
  } | null
  showComposeEmailModal: boolean
  showSuccessModal: boolean
  selectAll: boolean
  selectedEmailSns: string[]
  emailSnPopup: string | null
}

export class ContactBankSecureEmailDetails extends Component<
  IContactBankSecureEmailDetailsProps,
  IContactBankSecureEmailDetailsState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      dataList: this.props.dataList,
      currentTabIndex: 0,
      showComposeEmailModal: false,
      showSuccessModal: false,
      selectedEmailItem: null,
      selectAll: false,
      selectedEmailSns: [],
      emailSnPopup: null,
    }
  }

  // componentWillReceiveProps(nextProps: any) {
  //   if (nextProps.dataList) {
  //     this.setState({
  //       dataList: _.cloneDeep(nextProps.dataList),
  //     })
  //   }
  // }

  clearSelect() {
    this.setState({
      selectAll: false,
      selectedEmailSns: [],
    })
  }

  clickSelectAll() {
    if (this.state.selectAll) {
      this.clearSelect()
    } else {
      const dataList = this.props.dataList
      this.setState({
        selectAll: true,
        selectedEmailSns: [...dataList.unread, ...dataList.read].reduce(
          (arr, group) => [...arr, ...group.emailList.map((email) => email.sn)],
          [] as string[]
        ),
      })
    }
  }

  handleComposeEmailClick(event: React.MouseEvent) {
    event.preventDefault()
    this.setState({
      showComposeEmailModal: true,
    })
  }

  // handle checkbox change
  handleCheckboxChange(emailSn: string) {
    // event.preventDefault()
    // event.stopPropagation()
    let newSelectAll = false
    const newSelectedSns = this.state.selectedEmailSns.slice()
    if (newSelectedSns.includes(emailSn)) {
      newSelectedSns.splice(newSelectedSns.indexOf(emailSn), 1)
    } else {
      newSelectedSns.push(emailSn)
      if (newSelectedSns.length === this.currentEmailsInPage) {
        newSelectAll = true
      }
    }
    this.setState({
      selectedEmailSns: newSelectedSns,
      selectAll: newSelectAll,
    })
  }

  // click Menu icon
  clickMenuIcon(emailSn: string) {
    if (this.state.emailSnPopup !== emailSn) {
      this.setState({
        emailSnPopup: emailSn,
      })
    } else {
      this.setState({
        emailSnPopup: null,
      })
    }
  }

  // click Menu Item icon
  clickMenuItemIcon(groupIndex: number, emailIndex: number, menuType: string) {
    switch (menuType) {
      case 'unread':
        this.clickUnreadIcon(groupIndex, emailIndex)
        break
      case 'trash':
      case 'delete':
        this.clickDelete(groupIndex, emailIndex)
        break
      default:
        break
    }
  }

  // click Unread icon
  clickUnreadIcon(groupIndex: number, emailIndex: number) {
    const dataList = _.cloneDeep(this.state.dataList)

    if (
      dataList[this.state.currentTabIndex === 0 ? 'unread' : 'read'][groupIndex].emailList[
        emailIndex
      ].popupShown
    ) {
      dataList[this.state.currentTabIndex === 0 ? 'unread' : 'read'][groupIndex].emailList[
        emailIndex
      ].popupShown = false
    } else {
      dataList.unread.forEach((groupItem) => {
        groupItem.emailList.forEach((emailItem) => {
          emailItem.popupShown = false
        })
      })

      dataList.read.forEach((groupItem) => {
        groupItem.emailList.forEach((emailItem) => {
          emailItem.popupShown = false
        })
      })

      dataList[this.state.currentTabIndex === 0 ? 'unread' : 'read'][groupIndex].emailList[
        emailIndex
      ].popupShown = true
    }

    this.setState({
      dataList,
    })
  }

  // close Menu Popup
  closeMenuPopup() {
    const dataList = _.cloneDeep(this.state.dataList)

    dataList.unread.forEach((groupItem) => {
      groupItem.emailList.forEach((emailItem) => {
        emailItem.popupShown = false
      })
    })

    dataList.read.forEach((groupItem) => {
      groupItem.emailList.forEach((emailItem) => {
        emailItem.popupShown = false
      })
    })

    this.setState({
      dataList,
    })
  }

  // click Delete
  clickDelete(groupIndex: number, emailIndex: number) {
    const dataList = _.cloneDeep(this.state.dataList)

    dataList[this.state.currentTabIndex === 0 ? 'unread' : 'read'].forEach(
      (groupItem, groupIndexDelete) => {
        if (groupIndex === groupIndexDelete) {
          groupItem.emailList.splice(emailIndex, 1)
        }
      }
    )

    this.setState({
      dataList,
    })
  }

  openEmail(
    item: {
      title: string
      replyEmail: string
      sn: string
      time: string
      content: string
    } | null
  ) {
    this.setState({
      selectedEmailItem: item,
    })
  }

  get currentPageRange() {
    const upperRange = (this.state.currentTabIndex + 1) * 5
    const totalEmails = this.props.dataList.readNumber + this.props.dataList.unreadNumber
    return [this.state.currentTabIndex * 5 + 1, upperRange > totalEmails ? totalEmails : upperRange]
  }

  get currentEmailsInPage() {
    return this.currentPageRange[1] - this.currentPageRange[0] + 1
  }

  render() {
    const { t } = this.props
    const {
      secureEmailDataList,
      currentContactBankSecureEmailCategoryIndex,
      selectSecureEmailCategory,
    } = { ...this.props }
    const {
      dataList,
      currentTabIndex,
      selectedEmailItem,
      selectAll,
      selectedEmailSns,
      emailSnPopup,
    } = { ...this.state }

    return (
      <div
        className={`card-list-boxs contact-bank-secure-email-right-content ${
          selectedEmailItem !== null ? 'viewing-email' : ''
        }`}
      >
        {!!dataList &&
          (selectedEmailItem === null ? (
            <EmailList
              dataList={dataList}
              secureEmailDataList={secureEmailDataList}
              currentContactBankSecureEmailCategoryIndex={
                currentContactBankSecureEmailCategoryIndex
              }
              clickMenuIcon={(emailSn) => this.clickMenuIcon(emailSn)}
              emailSnPopup={emailSnPopup}
              currentTabIndex={currentTabIndex}
              selectSecureEmailCategory={(e: string | null) => selectSecureEmailCategory(e)}
              handleComposeEmailClick={(e) => this.handleComposeEmailClick(e)}
              changePage={(forward) => {
                this.setState({
                  currentTabIndex: currentTabIndex + (forward ? 1 : -1),
                  selectedEmailSns: [],
                  selectAll: false,
                })
              }}
              handleCheckboxChange={(emailSn) => this.handleCheckboxChange(emailSn)}
              openEmail={(emailSn) => this.openEmail(emailSn)}
              selectedEmailSns={selectedEmailSns}
              clickSelectAll={() => this.clickSelectAll()}
              selectAll={selectAll}
              clearSelect={() => this.clearSelect()}
            />
          ) : (
            <ViewEmailDetails
              emailItem={selectedEmailItem}
              onClose={() => this.setState({ selectedEmailItem: null })}
            />
          ))}
        {this.state.showComposeEmailModal && (
          <ComposeEmailModal
            onClose={(success: boolean) =>
              this.setState({ showComposeEmailModal: false, showSuccessModal: success })
            }
          />
        )}
        {this.state.showSuccessModal && (
          <SuccessModal
            title={t('helpSupport.contactBankSecureEmailDetails.secure_message_sent')}
            successText={t('helpSupport.contactBankSecureEmailDetails.secure_message_sent_success')}
            onClose={() => this.setState({ showSuccessModal: false })}
          />
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(ContactBankSecureEmailDetails)
