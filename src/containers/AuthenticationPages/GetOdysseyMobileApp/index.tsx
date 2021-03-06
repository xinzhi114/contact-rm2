import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { LoginCarousel } from '../../../components/AuthenticationComponents/LoginComponents/LoginCarousel'
import { LoginFooter } from '../../../components/AuthenticationComponents/LoginComponents/LoginFooter'
import { LoginTopBar } from '../../../components/AuthenticationComponents/LoginComponents/LoginTopBar'
import { OnlineBankingSecuredSuccessModal } from '../../../components/AuthenticationComponents/Modals/OnlineBankingSecuredSuccessModal'
import { OrderDigiPassModal } from '../../../components/AuthenticationComponents/Modals/OrderDigiPassModal'
import { OrderDigiPassSuccessModal } from '../../../components/AuthenticationComponents/Modals/OrderDigiPassSuccessModal'
import { YourUniqueCodeModal } from '../../../components/AuthenticationComponents/Modals/YourUniqueCodeModal'
import './styles.scss'

type IStep = {
  content: JSX.Element
  actionText?: string
  onClick?: () => void
}

export const GetOdysseyMobileApp: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`getMobileApp.${key}`)

  const history = useHistory()

  const [showTablet, setShowTablet] = useState<boolean>(false)
  const [digiPassOrdered, setDigiPassOrdered] = useState<boolean>(false)

  // Modals
  const [showOrderDigiPassModal, setShowOrderDigiPassModal] = useState<boolean>(false)
  const [showOrderDigiPassSuccessModal, setShowOrderDigiPassSuccessModal] = useState<boolean>(false)
  const [showYourUniqueCodeModal, setShowYourUniqueCodeModal] = useState<boolean>(false)
  const [showOnlineBankingSecuredSuccessModal, setShowOnlineBankingSecuredSuccessModal] = useState<
    boolean
  >(false)

  const steps: IStep[] = [
    {
      content: (
        <>
          {t('we_can_send_you')} <span className="bold">{t('app_store')}</span>
          {` ${t('or')} `}
          <span className="bold">{t('play_store')}</span> {t('to_download_the_app')}
        </>
      ),
      actionText: 'send_message_action',
    },
    {
      content: (
        <>
          {t('open_app_and_select')} <span className="bold">{t('login_to_existing_account')}</span>
        </>
      ),
    },
    {
      content: (
        <>
          {t('use_the_app_to_scan_your')} <span className="bold">{t('unique_code')}</span>
        </>
      ),
      actionText: 'show_my_code_action',
      onClick: () => setShowYourUniqueCodeModal(true),
    },
  ]

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setShowTablet(e.matches)
    }
    setShowTablet(mql.matches)
    mql.addEventListener('change', handleResize)
    return () => {
      mql.removeEventListener('change', handleResize)
    }
  }, [])

  return (
    <div className="get-odyssey-mobile-app">
      <LoginTopBar title={t('get_odyssey_mobile_app')} onBackClick={() => history.push('/')} />
      <Row>
        <Col xs={6} className="info-col">
          <img
            src="/assets/logo-dummy.svg"
            alt="logo"
            className="logo tablet-hide desktop-show"
            onClick={() => history.push('/')}
          />
          <div className="main-section">
            <div className="top-text">
              <span className="title tablet-hide desktop-show">{t('get_odyssey_mobile_app')}</span>
              <span className="subtitle">{t('log_in_securely_steps')}</span>
            </div>
            <div className="steps">
              {steps.map((step, index) => (
                <div className="step" key={index}>
                  <div className="text-wrapper">
                    <div className="step-title">{t(`step_${index + 1}`)}</div>
                    <div className="step-content">{step.content}</div>
                  </div>
                  {step.actionText && (
                    <div className="action-wrapper">
                      <Button variant="primary" onClick={() => step.onClick && step.onClick()}>
                        {t(step.actionText)}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bottom-text">
              {t('dont_have_a_mobile_phone')}{' '}
              <span className="link">{t('sign_in_with_the_digipass')}</span> {t('or')}{' '}
              <span className="link" onClick={() => setShowOrderDigiPassModal(true)}>
                {t('order_a_digipass')}
              </span>
            </div>
          </div>
        </Col>
        {!showTablet && (
          <Col xs={6} className="carousel-col">
            <LoginCarousel
              activeIndex={0}
              customItems={[
                {
                  caption: (
                    <div className="mobile-preview">
                      <img src="/assets/mobile-bank-preview.png" alt="mobile bank" />
                      <span className="caption-subtitle">
                        {t('just_some_of_the')} <span className="bold">{t('app_benefits')}</span>
                      </span>
                      <div className="benefits">
                        {[
                          'open_new_products',
                          'manage_your_finances_on_the_go',
                          'check_your_spending',
                          'pay_bills_and_transfer_money',
                        ].map((key, index) => (
                          <div key={index} className="benefit">
                            {t(key)}
                          </div>
                        ))}
                      </div>
                      <div className="app-download-buttons">
                        <img
                          src="/assets/download-app-store.svg"
                          alt="app store"
                          className="app-store"
                        />
                        <img src="/assets/download-google-play.png" alt="google play" />
                      </div>
                    </div>
                  ),
                  className: 'mobile-preview-wrapper',
                },
              ]}
            />
          </Col>
        )}
        {showOrderDigiPassModal && (
          <OrderDigiPassModal
            onClose={() => setShowOrderDigiPassModal(false)}
            onOrderDigiPass={() => {
              setShowOrderDigiPassModal(false)
              setDigiPassOrdered(true)
              setShowOrderDigiPassSuccessModal(true)
            }}
            alreadyOrdered={digiPassOrdered}
          />
        )}
        {showOrderDigiPassSuccessModal && (
          <OrderDigiPassSuccessModal onClose={() => setShowOrderDigiPassSuccessModal(false)} />
        )}
        {showYourUniqueCodeModal && (
          <YourUniqueCodeModal
            onClose={() => setShowYourUniqueCodeModal(false)}
            onSucceed={() => {
              setShowYourUniqueCodeModal(false)
              setShowOnlineBankingSecuredSuccessModal(true)
            }}
          />
        )}
        {showOnlineBankingSecuredSuccessModal && (
          <OnlineBankingSecuredSuccessModal
            onViewAccount={() => {
              setShowOnlineBankingSecuredSuccessModal(false)
              history.push('/')
            }}
            onClose={() => {
              setShowOnlineBankingSecuredSuccessModal(false)
            }}
          />
        )}
      </Row>
      <LoginFooter />
    </div>
  )
}
