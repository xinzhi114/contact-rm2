import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

export interface IAlertsBannerBottomProps {
  onStartTour: () => void
}

export const AlertsBannerBottom: React.FunctionComponent<IAlertsBannerBottomProps> = ({
  onStartTour,
}) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAlerts.alertsBannerBottom.${key}`)

  return (
    <div className="three-wrap">
      <div className="items small-items">
        <div className="inner-panel top-panel">
          <div className="bottom-bar">
            <BaseTextLinkButton label={t('alert_FAQ')} href={'/alerts/alertFAQs'} isNavLink>
              <i className="icons icon-arrow" />
            </BaseTextLinkButton>
            <span className="sub-title">{t('view_faq_about_alerts')}</span>
          </div>
        </div>
        <div className="inner-panel">
          <div className="bottom-bar">
            <BaseTextLinkButton
              label={t('view_alert_demo')}
              href={'#javascript'}
              onClick={() => {
                onStartTour()
              }}
            >
              <i className="icons icon-arrow" />
            </BaseTextLinkButton>
            <span className="sub-title">{t('onboard_yourself')}</span>
          </div>
        </div>
      </div>
      <div className="items blue-item">
        <div className="inner-panel">
          <div className="img-area">
            <img src="/assets/alert-photo-03.jpg" alt="img" />
          </div>
          <div className="bottom-bar">
            <div className="white-txt">{t('keep_your_contact')}</div>
            <BaseTextLinkButton label={t('update_profile')} href={'#javascript'} isButton />
          </div>
        </div>
      </div>
    </div>
  )
}
