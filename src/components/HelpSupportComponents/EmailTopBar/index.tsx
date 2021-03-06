import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseCheckbox } from '../../BaseForm/BaseFormFields/BaseCheckbox'
import { IContactBankSecureEmailDataList } from '../ContactBankSecureEmailDetails'
import { EmailActionsBar } from '../EmailActionsBar'

export interface IEmailTopBarProps {
  selectedEmailSns: string[]
  selectAll: boolean
  clickSelectAll: () => void
  clearSelect: () => void
  dataList: IContactBankSecureEmailDataList
  currentPageRange: number[]
  currentContactBankSecureEmailCategoryIndex: number
  currentTabIndex: number
  maxPage: number
  changePage: (forward: boolean) => void
}

export const EmailTopBar: React.FunctionComponent<IEmailTopBarProps> = (props) => {
  const { t } = useTranslation()

  const {
    selectedEmailSns,
    selectAll,
    clickSelectAll,
    clearSelect,
    dataList,
    currentPageRange,
    currentContactBankSecureEmailCategoryIndex,
    currentTabIndex,
    maxPage,
    changePage,
  } = props

  const emailActions = [
    {
      iconName: 'green-unread',
      menuLabel: 'mark_as_unread',
    },
    {
      iconName: 'green-trash',
      menuLabel: 'trash',
    },
    {
      iconName: 'green-delete',
      menuLabel: 'delete',
    },
  ]

  // Trash tab
  if (currentContactBankSecureEmailCategoryIndex === 2) {
    emailActions.splice(0, 2)
    emailActions.unshift({
      iconName: 'green-inbox',
      menuLabel: 'move_to_inbox',
    })
  }

  return (
    <div className="gray-bar">
      <div className={selectedEmailSns.length > 0 ? 'active' : ''}>
        <BaseCheckbox value={[selectAll]} options={['']} onChange={() => clickSelectAll()} />
        <img
          className="remove-selection"
          src="/assets/black-close.svg"
          alt="deselect"
          onClick={() => {
            clearSelect()
          }}
        />
        {selectedEmailSns.length > 0 && (
          <span className="email-selected">
            {selectedEmailSns.length}{' '}
            {t('helpSupport.contactBankSecureEmailDetails.email_selected')}
          </span>
        )}
      </div>
      <div className="right-content">
        {selectedEmailSns.length === 0 ? (
          <>
            <span className="txt">
              ({dataList.unreadNumber} {t('helpSupport.contactBankSecureEmailDetails.unread')} /{' '}
              {dataList.readNumber} {t('helpSupport.contactBankSecureEmailDetails.read')}){' '}
              {currentPageRange[0]} - {currentPageRange[1]} from{' '}
              {dataList.readNumber + dataList.unreadNumber}
            </span>
            <div className="pagination-arrows">
              <img
                src="/assets/pagination-back-arrow.svg"
                alt="back"
                onClick={() => {
                  if (currentTabIndex > 0) {
                    changePage(false)
                  }
                }}
                className={`back ${currentTabIndex === 0 ? 'disabled' : ''}`}
              />
              <img
                src="/assets/pagination-forward-arrow.svg"
                alt="forward"
                onClick={() => {
                  if (currentTabIndex < maxPage) {
                    changePage(true)
                  }
                }}
                className={`forward ${currentTabIndex === maxPage ? 'disabled' : ''}`}
              />
            </div>
          </>
        ) : (
          <EmailActionsBar emailActions={emailActions} />
        )}
      </div>
    </div>
  )
}
