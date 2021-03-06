import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IAccountProfileMobileProps {
  accountProfile: any
}

export const AccountProfileMobile: React.FunctionComponent<IAccountProfileMobileProps> = (
  props
) => {
  const { t } = useTranslation()
  const { accountProfile } = { ...props }

  if (!accountProfile) {
    return <React.Fragment />
  }
  return (
    <div className="mobile-user-link desktop-hide mobile-show">
      <div className="blue-title">
        {t('financeManager.accountProfileMobile.your')}{' '}
        {t('common.userRoles.' + accountProfile.role)}
      </div>
      <div className="user-module">
        <div className="left-img">
          <img src={accountProfile.photoUrl} alt="img" />
          {accountProfile.state === 'active' && <span className="green-point" />}
        </div>
        <div className="rights">
          <div className="names">{accountProfile.name}</div>
          <div className="pole">{accountProfile.role}</div>
          <div className="star-list">
            {new Array(accountProfile.stars).fill('').map((item, index) => (
              <span key={index} className="icons icon-star" />
            ))}
          </div>
        </div>
      </div>
      <div className="four-links">
        <div className="items">
          <a href="#javascript" className="link-item" onClick={(event) => event.preventDefault()}>
            <img src="assets/vioce-call.svg" alt="img" />
            <span className="blue-txt">{t('financeManager.accountProfileMobile.voice_call')}</span>
          </a>
        </div>
        <div className="items">
          <a href="#javascript" className="link-item" onClick={(event) => event.preventDefault()}>
            <img src="assets/video-call.svg" alt="img" />
            <span className="blue-txt">{t('financeManager.accountProfileMobile.video_call')}</span>
          </a>
        </div>
        <div className="items">
          <a
            href={'mailto:' + accountProfile.email}
            className="link-item"
            onClick={(event) => event.preventDefault()}
          >
            <img src="assets/icon-email-blue.svg" alt="img" />
            <span className="blue-txt">{t('financeManager.accountProfileMobile.email')}</span>
          </a>
        </div>
        <div className="items">
          <a href="#javascript" className="link-item" onClick={(event) => event.preventDefault()}>
            <img src="assets/canlender-line.svg" alt="img" />
            <span className="blue-txt">{t('financeManager.accountProfileMobile.appointment')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AccountProfileMobile
