import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { StoreHelpers } from 'react-joyride'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { LoginCarousel } from '../../../components/AuthenticationComponents/LoginComponents/LoginCarousel'
import { LoginFooter } from '../../../components/AuthenticationComponents/LoginComponents/LoginFooter'
import {
  ILoginFormValue,
  LoginForm,
} from '../../../components/AuthenticationComponents/LoginComponents/LoginForm'
import { LoginTopBar } from '../../../components/AuthenticationComponents/LoginComponents/LoginTopBar'
import { RecoverUserIDForm } from '../../../components/AuthenticationComponents/RecoverUserIDForm'
import { AccountLockedModal } from '../../../components/Modals/AccountLockedModal'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import { OTPModal } from '../../../components/Modals/OTPModal'
import SuccessModal from '../../../components/Modals/SuccessModal'
import { LoadingToast } from '../../../components/ToastComponents/LoadingToast'
import { login, sendOtp } from '../../../store/actions/auth'
import { IAppState } from '../../../store/constants'
import './styles.scss'
import { GuidedTour } from '../../../components/GuidedTour'

export const LoginAndRecoverUserID: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.${key}`)

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const hasToken = useSelector<IAppState>((state) => state.auth.token !== null) as boolean
  const canSendOtp = useSelector<IAppState>((state) => state.auth.canSendOtp) as boolean
  const loading = useSelector<IAppState>((state) => state.auth.loading) as boolean | null
  const error = useSelector<IAppState>((state) => state.auth.error) as string | null

  const guidedTourHelpersRef = useRef<StoreHelpers | null>(null)

  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const [loginFormValue, setLoginFormValue] = useState<ILoginFormValue>({
    userId: '',
    password: '',
  })
  const [otp, setOtp] = useState<string>('')
  const [showCarouselTablet, setShowCarouselTablet] = useState<boolean>(true)
  const [forceShowPassword, setForceShowPassword] = useState<boolean>(false)
  const [guidedTourStepIndex, setGuidedTourStepIndex] = useState<number>(0)

  // Modals
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false)
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showAccountLockedModal, setShowAccountLockedModal] = useState<boolean>(false)

  const [showTablet, setShowTablet] = useState<boolean>(false)

  const isRecoverUserID = location.pathname.startsWith('/recoverUserID')

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

  const handleLogin = () => {
    dispatch(login(loginFormValue.userId, loginFormValue.password, otp))
    setOtp('')
    setShowOtpModal(false)
    setLoginFormValue({
      userId: '',
      password: '',
    })
  }

  const handleCreateOTP = () => {
    dispatch(sendOtp(loginFormValue.userId, loginFormValue.password))
  }

  const handleShowGuidedTour = (show: boolean) => {
    setForceShowPassword(show)
  }

  useEffect(() => {
    if (canSendOtp) {
      setShowOtpModal(true)
    }
  }, [canSendOtp])

  useEffect(() => {
    if (hasToken) {
      // OTP was validated and user is now logged in
      setShowApproveModal(true)
      setShowOtpModal(false)
    } else {
      // User was logged out
    }
  }, [hasToken])

  useEffect(() => {
    const helpers = guidedTourHelpersRef.current
    if (helpers !== null) {
      if (forceShowPassword) {
        helpers.open()
      } else {
        helpers.close()
      }
    }
  }, [forceShowPassword])

  const handleRedirect = () => {
    history.push('/customerDashboard')
  }

  const resetGuidedTour = () => {
    setGuidedTourStepIndex(0)
    setForceShowPassword(false)
  }

  return (
    <div className="login-container">
      <Row>
        <Col xs={7} className="form-col">
          {(showTablet && !isRecoverUserID ? !showCarouselTablet : true) && (
            <LoginTopBar
              title={t('log_in')}
              onBackClick={() =>
                isRecoverUserID ? history.push('/') : setShowCarouselTablet(true)
              }
            />
          )}
          <div className="login-content">
            <img
              src="/assets/logo-dummy.svg"
              alt="logo"
              className="logo tablet-hide desktop-show"
            />
            <div className="login-form-wrapper">
              {isRecoverUserID ? (
                <RecoverUserIDForm />
              ) : (
                <>
                  <span className="title-text tablet-hide desktop-show">
                    {t('log_in_to_odyssey_bank')}
                  </span>
                  <LoginForm
                    formValue={loginFormValue}
                    onChange={(formValue) => setLoginFormValue(formValue)}
                    onSubmit={() => handleCreateOTP()}
                    forceShowPassword={forceShowPassword}
                  />
                </>
              )}
              <Button
                variant=""
                style={{ opacity: '0' }}
                onClick={() => setShowAccountLockedModal(true)}
              >
                account locked modal
              </Button>
              {/* TODO Integrate account locked modal with backend and remove button above */}
            </div>
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="links">
            <span onClick={() => history.push('/registration')}>
              {t('register_for_odyssey_bank')}
            </span>
            <span className="tablet-hide desktop-show" onClick={() => handleShowGuidedTour(true)}>
              {t('login_help')}
            </span>
          </div>
        </Col>
        {(showTablet ? showCarouselTablet && !isRecoverUserID : true) && (
          <Col xs={5} className="carousel-col">
            <LoginCarousel
              activeIndex={carouselIndex}
              onSelect={(newIndex) => setCarouselIndex(newIndex)}
              onLoginClick={() => setShowCarouselTablet(false)}
            />
          </Col>
        )}
      </Row>
      <LoginFooter />
      {showOtpModal && (
        <OTPModal
          otp={otp}
          onChange={(newOtp) => setOtp(newOtp)}
          onContinue={() => handleLogin()}
        />
      )}
      {showApproveModal ? (
        <MobileBankingApproveModal
          onApproved={() => {
            setShowApproveModal(false)
            setShowSuccessModal(true)
          }}
        />
      ) : showSuccessModal ? (
        <SuccessModal
          title={t('successModal.title')}
          successText={
            <>
              {t('successModal.text_1')} <span className="bold">{t('successModal.text_bold')}</span>{' '}
              {t('successModal.text_2')}
            </>
          }
          onClose={() => handleRedirect()}
        />
      ) : (
        showAccountLockedModal && (
          <AccountLockedModal onClose={() => setShowAccountLockedModal(false)} />
        )
      )}
      <GuidedTour
        stepSelectors={['.user-id-wrapper > .inputs', '.password-wrapper > .inputs']}
        helpersRef={guidedTourHelpersRef}
        stepIndex={guidedTourStepIndex}
        onNextClick={() => setGuidedTourStepIndex(guidedTourStepIndex + 1)}
        onReset={() => resetGuidedTour()}
        translationKey="login.guidedTour"
      />
      {loading && <LoadingToast messageText={t('processing_your_details')} />}
    </div>
  )
}
