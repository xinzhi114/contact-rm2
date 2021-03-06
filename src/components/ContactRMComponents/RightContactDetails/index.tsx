import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { ComposeEmailModal } from '../../../components/HelpSupportComponents/ComposeEmailModal'
import './styles.scss'
import { useRM } from '../../DashboardRelationshipManager'

interface IRightContactDetailsProps {
  relationshipManager: {
    photoUrl: string
    stars: number
    name: string
    role: string
    state: string
    email: string
    phoneNumber: string
    description: string
    availableToday: string[]
  }
  contactDetails: {
    address: string
    mapUrl: string
  }
}

const RightContactDetails: React.FunctionComponent<IRightContactDetailsProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.contactDetailsTab.${key}`)

  const [
    isShowRequestClosureComposeEmailModalWindow,
    setIsShowRequestClosureComposeEmailModalWindow,
  ] = useState(false)
  const [showTips, setShowTips] = useState(true)

  const { relationshipManager, contactDetails } = { ...props }
  const rm = useRM()

  if (!rm) {
    return (
      <div className="contact-rm-right-contact-details">
        <div className="right-contents contact-details-module">
          <div className="line-title">
            <span>{_t('common.loading')}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-rm-right-contact-details">
      {isShowRequestClosureComposeEmailModalWindow && (
        <ComposeEmailModal
          onClose={() => {
            setIsShowRequestClosureComposeEmailModalWindow(false)
          }}
        />
      )}

      {!!relationshipManager && !!contactDetails && (
        <React.Fragment>
          <div className="right-contents contact-details-module">
            <div className="line-title">
              <i className="icons icon-user-line" />
              <span className="title">{t('contact_details')}</span>
            </div>
            <div className="module-content">
              <div className="line-group">
                <div className="titles">{t('contact_number')}</div>
                <div className="row-line flex-grid mt0">
                  <div className="lefts">
                    <div className="img-module flex">
                      <div className="icons icon-phone" />
                      <div className="right-txt">
                        <div className="gray-txt">{t('phone_number')}</div>
                        <div className="txt">{rm.phoneNumber}</div>
                      </div>
                    </div>
                  </div>
                  <div className="rights">
                    {showTips && (
                      <div className="gray-boxs">
                        <a
                          href="#javascript"
                          className="icons icon-close label-transparent"
                          onClick={() => setShowTips(false)}
                        >
                          {_t('common.btns.close')}
                        </a>
                        <div
                          className="txt"
                          dangerouslySetInnerHTML={{
                            __html: t('voice_video_call_only_available_on_mobile_app'),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="line-group">
                <div className="titles">{t('email')}</div>
                <div className="row-line flex-grid">
                  <div className="lefts">
                    <div className="img-module flex">
                      <div className="icons icon-email" />
                      <div className="right-txt">
                        <div className="gray-txt">{t('email_address')}</div>
                        <div className="txt">{rm.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="rights">
                    <BaseTextLinkButton
                      label={t('compose_email')}
                      isButton
                      onClick={() => {
                        setIsShowRequestClosureComposeEmailModalWindow(true)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="line-group">
                <div className="titles">{t('address')}</div>
                <div className="row-line flex-grid">
                  <div className="lefts">
                    <div className="img-module flex">
                      <div className="icons icon-business" />
                      <div className="green-txt">
                        <div className="block" dangerouslySetInnerHTML={{ __html: rm.address }} />
                      </div>
                    </div>
                  </div>
                  <div className="rights">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                        rm.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-green"
                    >
                      {t('view_on_map')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default RightContactDetails
