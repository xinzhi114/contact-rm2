import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import data from '../../../__mocks__/data/dataDashboardHeader'
import { EmailActionsBar } from '../EmailActionsBar'
import { MoreActionsPanel } from '../MoreActionsPanel'
import './styles.scss'

export type IViewEmailDetailsProps = {
  emailItem: {
    title: string
    replyEmail: string
    sn: string
    time: string
    content: string
  }
  onClose: () => void
}

export const ViewEmailDetails: React.FunctionComponent<IViewEmailDetailsProps> = (props) => {
  const { t } = useTranslation()

  const { emailItem, onClose } = props
  const customerName = data.dataList.profile.usernameShort

  const [showPopup, setShowPopup] = useState<boolean>(false)

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
    {
      iconName: 'green-print',
      menuLabel: 'print',
    },
  ]

  const emailAttachments = ['error-show-on-order.jpg', 'full-page-error.jpg'].map((fileName) => ({
    iconSrc: '/assets/icon-photo.svg',
    fileName,
  }))

  return (
    <div className="view-email-details">
      <div className="title-line-bar flex-grid">
        <img
          className="left-arrow"
          src="/assets/black-left-arrow.svg"
          alt="back"
          onClick={() => onClose()}
        />
        <span className="email-title">{emailItem.title}</span>
        <div className="txt more-txt tablet-more">
          <div className="more-wrap">
            <a
              href="#javascript"
              className="icons icon-more label-transparent"
              onClick={(event) => {
                setShowPopup(!showPopup)
                event.preventDefault()
              }}
            >
              {t('common.btns.more')}
            </a>
            <MoreActionsPanel
              onOutsideClick={(event) => {
                if (showPopup) {
                  setShowPopup(false)
                  event.preventDefault()
                }
              }}
              show={showPopup}
              print
            />
          </div>
        </div>
      </div>
      <div className="list-content">
        <div className="gray-bar desktop-more">
          <EmailActionsBar emailActions={emailActions} />
        </div>
        <div className="email-wrapper">
          <div className="email-header-info">
            <span className="reply-email">&lt;{emailItem.replyEmail}&gt;</span>
            <div className="email-time">{emailItem.time}</div>
            <span className="email-sn">
              {t('helpSupport.contactBankSecureEmailDetails.sn')} : {emailItem.sn}
            </span>
          </div>
          <div className="email-content">
            <div className="email-salutation">
              {t('helpSupport.contactBankSecureEmailDetails.hello')} {customerName},
            </div>
            <div className="email-main-content">{emailItem.content}</div>
            <div className="email-signature">
              <span>{t('helpSupport.contactBankSecureEmailDetails.thank_you')},</span>
              <span className="link">
                {t('helpSupport.contactBankSecureEmailDetails.odyssey_team')}
              </span>
            </div>
            {emailAttachments.length > 0 && (
              <div className="email-attachments-wrapper">
                <div className="email-attachments">
                  {emailAttachments.map((attachment, index) => (
                    <div key={index} className="attachment link">
                      <img src={attachment.iconSrc} alt="attachment" />
                      <span>{attachment.fileName}</span>
                    </div>
                  ))}
                </div>
                <div className="attachments-summary">
                  <span className="files-amount">
                    {emailAttachments.length}{' '}
                    {t('helpSupport.contactBankSecureEmailDetails.files_attached')}
                  </span>
                  <div className="download">
                    <img src="/assets/green-download.svg" alt="download" />
                    <span>{t('common.btns.download')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
