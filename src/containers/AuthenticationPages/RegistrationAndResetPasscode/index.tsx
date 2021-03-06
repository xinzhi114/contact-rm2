import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { LoginCarousel } from '../../../components/AuthenticationComponents/LoginComponents/LoginCarousel'
import { ReviewableForm } from '../../../components/ReviewableForm'
import {
  registerUserReviewableFormSteps,
  REGISTER_USER_FORM_STEPS_ENUM,
} from '../../../config/registerUserRecoverPassword'
import {
  initialRegisterUserFormValue,
  RegisterUserRecoverPasswordFormValue,
} from '../../../constants/reviewableForm/registerUserRecoverPassword'
import './styles.scss'
import { RegistrationSuccessModal } from './RegistrationSuccessModal'
import { useHistory, useLocation } from 'react-router-dom'
import { ResetPasscodeSuccessModal } from '../../../components/AuthenticationComponents/Modals/ResetPasscodeSuccessModal'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import { AccountLockedSuccessModal } from '../../../components/AuthenticationComponents/Modals/AccountLockedSuccessModal'
import { LoginTopBar } from '../../../components/AuthenticationComponents/LoginComponents/LoginTopBar'
import { LoginFooter } from '../../../components/AuthenticationComponents/LoginComponents/LoginFooter'
export const RegistrationAndResetPasscode: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.${key}`)

  const location = useLocation()
  const history = useHistory()

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [formValue, setFormValue] = useState<RegisterUserRecoverPasswordFormValue>(
    initialRegisterUserFormValue
  )
  const [carouselIndex, setCarouselIndex] = useState<number>(0)

  const [showTablet, setShowTablet] = useState<boolean>(false)

  // Modals
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false)

  const isResetPasscode = location.pathname.startsWith('/resetPasscode')
  const isAccountLocked = location.pathname.startsWith('/accountLocked')

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

  const handleFormChange = (newFormValue: RegisterUserRecoverPasswordFormValue) => {
    setFormValue(newFormValue)
  }

  const onNextStep = (clickedStep?: number) => {
    let nextStep = clickedStep !== undefined ? clickedStep : currentStep + 1

    // TODO, skip answer question for now
    if (nextStep === REGISTER_USER_FORM_STEPS_ENUM.SECURITY_QUESTIONS) {
      nextStep++
    }

    if (nextStep === REGISTER_USER_FORM_STEPS_ENUM.SUBMIT) {
      if (isAccountLocked) {
        setShowApproveModal(true)
      } else {
        setShowSuccessModal(true)
      }
    } else {
      setCurrentStep(nextStep)
    }
  }

  const stepSubtitle = t(
    `enter_${_.invert(REGISTER_USER_FORM_STEPS_ENUM)[currentStep].toLowerCase()}`
  )

  return (
    <div className="registration-container">
      <Row>
        <Col xs={7} className="form-col">
          <div className="top-bar tablet-hide desktop-show">
            <img
              src="/assets/logo-dummy.svg"
              alt="logo"
              className="logo tablet-hide desktop-show"
            />
            <div className="additional-info">
              <div className="titles">
                <span className="title">
                  {t('step')} {currentStep + 1} {t('of')} 4{' '}
                  {isResetPasscode
                    ? t('for_reset_password')
                    : isAccountLocked
                    ? t('to_unlock_account')
                    : t('for_register_for_online_banking')}
                </span>
                <span className="subtitle">{stepSubtitle}</span>
              </div>
              {currentStep === REGISTER_USER_FORM_STEPS_ENUM.PERSONAL_DETAILS && (
                <span className="mandatory-fields">{t('fields_marked_are_mandatory')}</span>
              )}
              {currentStep === REGISTER_USER_FORM_STEPS_ENUM.SECURITY_QUESTIONS && (
                <span className="mandatory-fields">
                  {_t('common.labels.all_fields_are_mandatory')}
                </span>
              )}
            </div>
          </div>
          <LoginTopBar
            title={stepSubtitle}
            onBackClick={() => {
              if (currentStep === 0) {
                history.push('/')
              } else {
                onNextStep(currentStep - 1)
              }
            }}
          />
          <ReviewableForm
            formValue={formValue}
            onChange={(newFormValue) =>
              handleFormChange(newFormValue as RegisterUserRecoverPasswordFormValue)
            }
            steps={registerUserReviewableFormSteps}
            currentStepIndex={currentStep}
            onEditClick={(step) => onNextStep(step)}
            formStepsEnum={REGISTER_USER_FORM_STEPS_ENUM}
            showTablet={showTablet}
            translationKey="registration"
            context="registration"
          />
        </Col>
        {!showTablet && (
          <Col xs={5} className="carousel-col">
            <LoginCarousel
              activeIndex={carouselIndex}
              onSelect={(newIndex) => setCarouselIndex(newIndex)}
            />
          </Col>
        )}
        {showSuccessModal &&
          (isResetPasscode ? (
            <ResetPasscodeSuccessModal />
          ) : isAccountLocked ? (
            <AccountLockedSuccessModal />
          ) : (
            <RegistrationSuccessModal
              onClose={() => {
                setShowSuccessModal(false)
                history.push('/getMobileApp')
              }}
            />
          ))}
        {showApproveModal && (
          <MobileBankingApproveModal
            onApproved={() => {
              setShowApproveModal(false)
              setShowSuccessModal(true)
            }}
          />
        )}
      </Row>
      <LoginFooter />
    </div>
  )
}
