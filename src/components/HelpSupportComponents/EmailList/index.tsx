import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {
  IContactBankSecureEmailDataList,
  ISecureEmailDataList,
} from '../ContactBankSecureEmailDetails'
import { EmailTopBar } from '../EmailTopBar'
import { MoreActionsPanel } from '../MoreActionsPanel'

export interface IEmailListProps {
  dataList: IContactBankSecureEmailDataList
  secureEmailDataList: ISecureEmailDataList
  currentContactBankSecureEmailCategoryIndex: number
  clickMenuIcon: (emailSn: string) => void
  emailSnPopup: string | null
  selectedEmailSns: string[]
  currentTabIndex: number
  handleComposeEmailClick: (event: React.MouseEvent) => void
  changePage: (forward: boolean) => void
  openEmail: (
    emailItem: {
      title: string
      replyEmail: string
      sn: string
      time: string
      content: string
    } | null
  ) => void
  handleCheckboxChange: (emailSn: string) => void
  clearSelect: () => void
  clickSelectAll: () => void
  selectAll: boolean
  selectSecureEmailCategory?: any
}

export const EmailList: React.FunctionComponent<IEmailListProps> = (props) => {
  const { t } = useTranslation()

  const {
    dataList,
    secureEmailDataList,
    currentContactBankSecureEmailCategoryIndex,
    clickMenuIcon,
    emailSnPopup,
    selectedEmailSns,
    currentTabIndex,
    changePage,
    openEmail,
    handleComposeEmailClick,
    selectSecureEmailCategory,
    clearSelect,
    clickSelectAll,
    selectAll,
    handleCheckboxChange,
  } = props

  const getEmailList = () => {
    let emailList = [...dataList.unread.slice(), ...dataList.read.slice()]
    emailList = emailList.reduce((prev: any, curr, index) => {
      const next = [...prev]
      const current = {
        ...curr,
        emailList: curr.emailList.map((email) => ({
          ...email,
          read: index < dataList.unread.length,
        })),
      }

      const existingIndex = next.findIndex((category) => category.groupTitle === current.groupTitle)
      if (existingIndex === -1) {
        next.push(current)
      } else {
        next[existingIndex].emailList.push(...current.emailList)
      }
      return next
    }, [])

    // Remove emails out of current page
    let totalEmails = 0
    emailList = emailList
      .map((group) => {
        let newEmailList = group.emailList.slice()
        if (totalEmails > currentPageRange[1]) {
          newEmailList = []
        } else {
          newEmailList = newEmailList.filter(
            (_email, index) =>
              totalEmails + index + 1 >= currentPageRange[0] &&
              totalEmails + index + 1 <= currentPageRange[1]
          )
        }
        totalEmails += group.emailList.length
        return {
          ...group,
          emailList: newEmailList,
        }
      })
      .filter((group) => group.emailList.length > 0)

    return emailList
  }

  const maxPage = (() => {
    return Math.ceil((props.dataList.readNumber + props.dataList.unreadNumber) / 5) - 1
  })()

  const currentPageRange = (() => {
    const upperRange = (currentTabIndex + 1) * 5
    const totalEmails = props.dataList.readNumber + props.dataList.unreadNumber
    return [currentTabIndex * 5 + 1, upperRange > totalEmails ? totalEmails : upperRange]
  })()

  return (
    <React.Fragment>
      <div className="title-line-bar flex-grid">
        <div className="drop-down desktop-hide tablet-show">
          <Dropdown
            bsPrefix="select-email-dropdown"
            onSelect={(event) => selectSecureEmailCategory && selectSecureEmailCategory(event)}
          >
            {!!secureEmailDataList &&
              secureEmailDataList.categoryList &&
              secureEmailDataList.categoryList.map((item, index) => (
                <div key={index}>
                  {currentContactBankSecureEmailCategoryIndex === index && (
                    <Dropdown.Toggle
                      variant="success"
                      id={`dropdown-basic-email-category-${index}`}
                    >
                      {item.categoryName} ({item.categoryTotalNumber})
                    </Dropdown.Toggle>
                  )}
                </div>
              ))}

            <Dropdown.Menu>
              {!!secureEmailDataList &&
                secureEmailDataList.categoryList.map((item, index) => (
                  <Dropdown.Item eventKey={index.toString()} key={index}>
                    {item.categoryName} ({item.categoryTotalNumber})
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <span className="txt txt-title tablet-hide desktop-show">
          {t('helpSupport.contactBankSecureEmailDetails.view_inbox')}
        </span>
        <a
          href="#javascript"
          className="btn btn-green mobile-hide desktop-show"
          onClick={(event) => handleComposeEmailClick(event)}
        >
          {t('helpSupport.contactBankSecureEmailDetails.compose_email')}
        </a>
        <Button
          className="btn btn-green compose-email-btn mobile-show desktop-hide"
          onClick={(event) => handleComposeEmailClick(event)}
        >
          <img src="/assets/plus.svg" alt="add" />
        </Button>
      </div>
      <div className="list-content">
        <EmailTopBar
          clearSelect={() => clearSelect()}
          changePage={(forward) => changePage(forward)}
          clickSelectAll={() => clickSelectAll()}
          currentContactBankSecureEmailCategoryIndex={currentContactBankSecureEmailCategoryIndex}
          currentPageRange={currentPageRange}
          currentTabIndex={currentTabIndex}
          dataList={dataList}
          maxPage={maxPage}
          selectAll={selectAll}
          selectedEmailSns={selectedEmailSns}
        />
        <div className="list-items">
          {getEmailList().map((groupItem, groupIndex) => (
            <div key={groupIndex} className={`${groupItem.emailList.length === 0 ? 'hide' : ''}`}>
              {groupItem.groupTitle !== '' && (
                <div className="gray-bar">
                  <div className="gray-txt">{groupItem.groupTitle}</div>
                </div>
              )}
              <div className="select-list">
                {groupItem.emailList.map((emailItem: any, emailIndex) => (
                  <div className="row-line" key={emailIndex}>
                    <div
                      className={`left-checkbox ${
                        selectedEmailSns.includes(emailItem.sn) ? 'active' : ''
                      }`}
                    >
                      <div className="checkbox-wrap">
                        <input
                          type="checkbox"
                          className="cheques"
                          id={`check-email-${currentContactBankSecureEmailCategoryIndex}-${currentTabIndex}-${groupIndex}-${emailIndex}`}
                          checked={selectedEmailSns.includes(emailItem.sn) || false}
                          onChange={() => handleCheckboxChange(emailItem.sn)}
                        />
                        <label
                          htmlFor={`check-email-${currentContactBankSecureEmailCategoryIndex}-${currentTabIndex}-${groupIndex}-${emailIndex}`}
                        />
                      </div>
                    </div>
                    <div className="right-txt">
                      <div className="email-txt-header" onClick={() => openEmail(emailItem)}>
                        <div className={`blue-link ${emailItem.read ? 'read' : ''}`}>
                          {emailItem.title}
                          <div className="right-time">{emailItem.time}</div>
                        </div>
                        <div className="email-txt">
                          &lt;{emailItem.replyEmail}&gt;
                          <span className="sn-num">
                            {t('helpSupport.contactBankSecureEmailDetails.sn')} : {emailItem.sn}
                          </span>
                          {emailItem.isRm && (
                            <span className="rm">
                              {t('helpSupport.contactBankSecureEmailDetails.rm')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="txt">
                        {emailItem.content}
                        <div className="more-wrap">
                          <a
                            href="#javascript"
                            className="icons icon-more label-transparent"
                            onClick={(event) => {
                              clickMenuIcon(emailItem.sn)
                              event.preventDefault()
                            }}
                          >
                            {t('common.btns.more')}
                          </a>
                          <MoreActionsPanel
                            onOutsideClick={(event) => {
                              if (emailSnPopup === emailItem.sn) {
                                clickMenuIcon(emailItem.sn)
                                event.preventDefault()
                              }
                            }}
                            show={emailSnPopup === emailItem.sn}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
