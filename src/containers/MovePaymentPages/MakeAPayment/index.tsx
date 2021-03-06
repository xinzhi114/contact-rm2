import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import moment from 'moment'
import ActivityDetection from '../../../components/ActivityDetection'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import './styles.scss'
import { ProgressStepper } from '../../../components/MovePaymentComponents/ProgressStepper'
import {
  movePaymentMakeAPaymentNewPayeeProgressSteps,
  movePaymentMakeAPaymentExistingPayeeProgressSteps,
} from '../../../config'
import { FlexDialog } from '../../../components/FlexLayoutComponents/FlexDialog'
import { FlexContainer } from '../../../components/FlexLayoutComponents/FlexContainer'
import { SpamWarning } from '../../../components/MovePaymentComponents/MakeAPaymentComponents/SpamWarning'
import { ReviewableForm } from '../../../components/ReviewableForm'
import { IReviewFormStep } from '../../../constants/reviewableForm/reviewableForm'
import {
  NEW_PAYEE_FORM_STEPS_ENUM,
  newPayeeReviewableFormSteps,
  IMakeAPaymentFormStepsEnum,
  existingPayeeReviewableFormSteps,
  EXISTING_PAYEE_FORM_STEPS_ENUM,
} from '../../../config/makeAPayment'
import { FinalReview } from '../../../components/MovePaymentComponents/MakeAPaymentComponents/FinalReview'
import { ConfirmPayeeDataModal } from '../../../components/Modals/ConfirmPayeeDataModal'
import { Payee } from '../ManagePayees'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import SuccessModal from '../../../components/Modals/SuccessModal'
import { FlexList } from '../../../components/FlexLayoutComponents/FlexList'
import { IListItem } from '../../../constants/layout'
import { formatAmount } from '../../../services/Util'
import { RecurringTransfer } from '../../../components/MovePaymentComponents/MakeAPaymentComponents/RecurringTransfer'
import {
  initialMakeAPaymentFormValue,
  MakeAPaymentFormValue,
  SelectPayeeFormValue,
} from '../../../constants/reviewableForm/makeAPayment'

const headerBreadcrumbData = [
  {
    pageName: 'home',
    pageUrl: '/customerDashboard',
  },
  {
    pageName: 'payment_and_transfer',
    pageUrl: '/movePaymentPages',
  },
  {
    pageName: 'make_a_payment',
    pageUrl: '#',
  },
]

export const MakeAPayment: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.${key}`)

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [formStepsEnum, setFormStepEnum] = useState<IMakeAPaymentFormStepsEnum>(
    NEW_PAYEE_FORM_STEPS_ENUM
  )
  const [formValue, setFormValue] = useState<MakeAPaymentFormValue>(initialMakeAPaymentFormValue)
  const [formSteps, setFormSteps] = useState<
    IReviewFormStep<any, MakeAPaymentFormValue, IMakeAPaymentFormStepsEnum>[]
  >(newPayeeReviewableFormSteps)
  const [saveClicked, setSaveClicked] = useState<boolean>(false)
  const [showImportantInfo, setShowImportantInfo] = useState<boolean>(false)

  const [showMakeRecurrentTransfer, setShowMakeRecurrentTransfer] = useState<boolean>(false)

  // Modals
  const [showConfirmPayeeDataModal, setShowConfirmPayeeDataModal] = useState<boolean>(false)
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const [showTablet, setShowTablet] = useState<boolean>(false)

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

  const onClearClick = () => {
    setFormValue(initialMakeAPaymentFormValue)
    setSaveClicked(false)
    setCurrentStep(0)
    setShowImportantInfo(false)
    setShowSuccessModal(false)
    setShowApproveModal(false)
  }

  const onUpdateDataClick = () => {
    onNextStep(formStepsEnum.FINAL_REVIEW)
    setSaveClicked(false)
  }

  const isSaveDisabled = (() => {
    switch (currentStep) {
      case formStepsEnum.ACCOUNT:
        return !formValue.account.account || !formValue.account.toAccount
      case formStepsEnum.PAYMENT:
        // Select Payment
        return (
          _.values(formValue.payment).some((innerValue) => innerValue === null) ||
          (formValue.payment.paymentMethod !== 'faster_payment' &&
            !formValue.payment.acceptRatesAndFees) ||
          formValue.payment.amount === ''
        )
      case formStepsEnum.PAYEE:
        // Select Payee
        return (
          formValue.payee.payee === null ||
          _.entries(formValue.payee.payee).some(
            (entry) =>
              (!formValue.payment.international ? entry[0] !== 'iban' : true) &&
              (!entry[1] || entry[1] === '')
          )
        )
      case formStepsEnum.DATE:
        // Select Date
        return formValue.date.date === null
      case formStepsEnum.MORE_DETAILS:
        return (
          formValue.moreDetails.reference === '' || formValue.moreDetails.spentCategory.length === 0
        )
      default:
        return false
    }
  })()

  const handleFormChange = (newFormValue: MakeAPaymentFormValue) => {
    if (
      formValue.account.toAccount !== newFormValue.account.toAccount &&
      newFormValue.account.toAccount !== null
    ) {
      // "To account" changed
      const isExistingPayee = newFormValue.account.toAccount !== 'new_payee'
      const newFormSteps = (isExistingPayee
        ? existingPayeeReviewableFormSteps
        : newPayeeReviewableFormSteps
      )
        .slice()
        .map((step) => ({ ...step, review: false }))
      setFormSteps(newFormSteps)
      const payee: SelectPayeeFormValue = {
        payee: null,
        savePayee: false,
      }
      setFormValue({
        ...initialMakeAPaymentFormValue,
        account: newFormValue.account,
        payee,
      })
      const newFormStepsEnum = isExistingPayee
        ? EXISTING_PAYEE_FORM_STEPS_ENUM
        : NEW_PAYEE_FORM_STEPS_ENUM
      setFormStepEnum(newFormStepsEnum)
      setCurrentStep(isExistingPayee ? newFormStepsEnum.PAYEE : newFormStepsEnum.PAYMENT)
    } else if (formValue.payment.international !== newFormValue.payment.international) {
      setFormValue({
        ...newFormValue,
        payee: {
          payee: null,
          savePayee: false,
        },
      })
    } else {
      setFormValue(newFormValue)
    }
  }

  const onNextStep = (clickedStep?: number) => {
    const nextStep = clickedStep !== undefined ? clickedStep : currentStep + 1
    if (nextStep === formStepsEnum.FINAL_REVIEW) {
      if (clickedStep === undefined) {
        if (formValue.account.toAccount === 'new_payee') {
          setShowConfirmPayeeDataModal(true)
        }
      } else {
        const newFormSteps = [...formSteps]
        if (formValue.account.toAccount === 'recent_payment') {
          newFormSteps.forEach((step) => {
            delete step.review
          })
          newFormSteps[formStepsEnum.PAYEE].hide = true
        }
        setFormSteps(newFormSteps)
      }
    }
    if (nextStep > formStepsEnum.FINAL_REVIEW) {
      setSaveClicked(true)
      return
    }
    if (nextStep === formStepsEnum.PAYMENT) {
      // Next step is Select Payment
      const newFormSteps = [...formSteps]
      if (formValue.account.toAccount === 'new_payee') {
        newFormSteps[formStepsEnum.ACCOUNT].review = false
      } else {
        newFormSteps.forEach((step) => {
          delete step.review
        })
        newFormSteps[formStepsEnum.PAYEE].hide = true
      }
      setFormSteps(newFormSteps)
    }
    if (nextStep === formStepsEnum.PAYEE) {
      // Next step is Select Payee
      const newFormSteps = [...formSteps]
      newFormSteps[formStepsEnum.PAYMENT].review = true
      setFormSteps(newFormSteps)
      if (formValue.account.toAccount === 'new_payee') {
        // First time in the step, payee hasn't been initialized
        // If payee already exists than means that the user has already filled the form and is reviewing another step
        if (formValue.payee.payee === null) {
          const payee: SelectPayeeFormValue = {
            payee: null,
            savePayee: false,
          }
          payee.payee = {
            userNameColor: '',
            userNameLabelColor: '',
            accountNumber: '',
            iban: '',
            name: '',
            reference: '',
          }
          if (formValue.payment.international) {
            payee.payee.bic = ''
          } else {
            payee.payee.sortCode = ''
          }
          setFormValue({
            ...formValue,
            payee,
          })
        }
      }
    }
    if (nextStep === formStepsEnum.DATE) {
      if (formValue.payment.paymentMethod === 'sepa') {
        setShowImportantInfo(true)
      }
      // Next step is Select Date
      const newFormSteps =
        formValue.account.toAccount === 'new_payee'
          ? newPayeeReviewableFormSteps.slice()
          : existingPayeeReviewableFormSteps.slice()
      // Force all previous steps to be in review mode
      newFormSteps.forEach((formStep) => {
        if (formStep.review !== undefined) {
          delete formStep.review
        }
      })
      newFormSteps[formStepsEnum.PAYEE].hide = true
      setFormSteps(newFormSteps)
    }
    if (nextStep < formStepsEnum.DATE) {
      if (showImportantInfo) {
        setShowImportantInfo(false)
      }
    }
    if (nextStep > formStepsEnum.FINAL_REVIEW) {
      setSaveClicked(true)
    } else {
      setCurrentStep(nextStep)
    }
  }

  const sendForm = () => {
    setShowApproveModal(true)
  }

  const handleRecurringTransfer = () => {
    setShowMakeRecurrentTransfer(false)
    onClearClick()
  }

  const formattedPayee = formValue.payee.payee
    ? (() => {
        const payee = formValue.payee.payee
        return `${payee.name} (${payee.accountNumber})`
      })()
    : ''

  const formattedTotalCost = formValue.payment.currency
    ? (() => {
        const match = formValue.payment.currency.match(/(?<=\().{1}(?=\))/)
        if (!match) {
          return ''
        }
        const formattedAmount = isNaN(Number(formValue.payment.amount))
          ? ''
          : formatAmount(Number(formValue.payment.amount))
        return `${match[0]} ${formattedAmount}`
      })()
    : ''

  const successModalListItems: IListItem[] = [
    {
      label: t('from_account'),
      value: formValue.account.account ? formValue.account.account.name : '-',
    },
    {
      label: t('to_account'),
      value: formValue.payee.payee ? formValue.payee.payee.name : '-',
    },
    {
      label: _t('movePayment.progressStepper.account_reference'),
      value: formValue.payee.payee ? formValue.payee.payee.reference : '-',
    },
    {
      label: t('selectDate.payment_date'),
      value: formValue.date.date ? moment(formValue.date.date).format('DD MMMM YYYY') : '-',
    },
    {
      label: t('selectPayment.payment_method'),
      value: formValue.payment.paymentMethod
        ? t(`selectPayment.${formValue.payment.paymentMethod}`)
        : '-',
    },
    {
      label: t('selectPayment.total_cost'),
      value: formattedTotalCost,
      bold: true,
    },
  ]

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Payment and Transfer"
        desktopShownIcon=""
        mobileShownIcon="Back"
        showDemoLink={false}
        headerBreadcrumbData={headerBreadcrumbData}
      />
      <div className="content make-a-payment-content">
        <div className="mains">
          <ActivityDetection />
          <FlexContainer flexDirection="column">
            {showMakeRecurrentTransfer ? (
              <RecurringTransfer
                formValue={formValue}
                onSuccess={() => handleRecurringTransfer()}
                onCancel={() => {
                  setSaveClicked(true)
                  setShowMakeRecurrentTransfer(false)
                }}
              />
            ) : (
              <Row>
                <Col xs={12} lg={9} className="form-col">
                  <FlexDialog fullHeight>
                    <Modal.Header>
                      <div>
                        <img src="/assets/make-payment-blue.svg" alt="make a payment" />{' '}
                        {t('title')}
                        <div className="show-important-information-wrapper">
                          <div className="show-important-information step-info mobile-show desktop-hide">
                            Step {currentStep}/{'5'}
                          </div>
                          <div className="show-important-information mobile-hide desktop-hide">
                            <img
                              src="/assets/question-bold-white.svg"
                              alt="show important information"
                            />
                          </div>
                          <div className="show-important-information tablet-show mobile-hide desktop-hide">
                            <img src="/assets/question-bold.svg" alt="show important information" />
                          </div>
                        </div>
                      </div>

                      {((showTablet && currentStep > formStepsEnum.ACCOUNT) || !showTablet) && (
                        <div className="desktop-show mobile-hide">
                          {saveClicked ? (
                            <>
                              <Button
                                variant="primary"
                                onClick={() => sendForm()}
                                disabled={isSaveDisabled}
                              >
                                {t('make_payment')}
                              </Button>
                              <Button variant="secondary" onClick={() => onUpdateDataClick()}>
                                {t('update_data')}
                              </Button>
                              <Button
                                variant="link"
                                className="delete-data"
                                onClick={() => onClearClick()}
                              >
                                {t('delete_data')}
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className="desktop-show tablet-hide">
                                <Button
                                  variant="primary"
                                  onClick={() => onNextStep()}
                                  disabled={isSaveDisabled}
                                >
                                  {t('save_and_continue')}
                                </Button>
                                <Button variant="link" onClick={() => onClearClick()}>
                                  {t('clear')}
                                </Button>
                              </div>
                              <div className="tablet-show desktop-hide">
                                <Button
                                  variant="primary"
                                  onClick={() => onNextStep(currentStep - 1)}
                                >
                                  {t('back')}
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => onNextStep()}
                                  disabled={isSaveDisabled}
                                >
                                  {t('continue')}
                                </Button>

                                <Button variant="link" onClick={() => onClearClick()}>
                                  {t('clear')}
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Modal.Header>
                    <Modal.Body>
                      {saveClicked ? (
                        <FinalReview formValue={formValue} />
                      ) : (
                        <ReviewableForm
                          formValue={formValue}
                          onChange={(newFormValue) =>
                            handleFormChange(newFormValue as MakeAPaymentFormValue)
                          }
                          steps={formSteps}
                          currentStepIndex={currentStep}
                          onEditClick={(step) => onNextStep(step)}
                          showImportantInfo={showImportantInfo}
                          onCloseShowImportantInfo={() => setShowImportantInfo(false)}
                          formStepsEnum={formStepsEnum}
                          showTablet={showTablet}
                          translationKey="movePaymentMakeAPayment"
                          context="make-a-payment"
                        />
                      )}
                    </Modal.Body>
                    {((showTablet && currentStep > formStepsEnum.ACCOUNT) || !showTablet) && (
                      <Modal.Footer className="desktop-hide mobile-show">
                        {saveClicked ? (
                          <>
                            <Button
                              variant="primary"
                              onClick={() => sendForm()}
                              disabled={isSaveDisabled}
                            >
                              {t('make_payment')}
                            </Button>
                            <Button variant="secondary" onClick={() => onUpdateDataClick()}>
                              {t('update_data')}
                            </Button>
                            <Button
                              variant="link"
                              className="delete-data"
                              onClick={() => onClearClick()}
                            >
                              {t('delete_data')}
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="desktop-show tablet-hide">
                              <Button
                                variant="primary"
                                onClick={() => onNextStep()}
                                disabled={isSaveDisabled}
                              >
                                {t('save_and_continue')}
                              </Button>
                              <Button variant="link" onClick={() => onClearClick()}>
                                {t('clear')}
                              </Button>
                            </div>
                            <div className="tablet-show desktop-hide">
                              <Button variant="primary" onClick={() => onNextStep(currentStep - 1)}>
                                {t('back')}
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => onNextStep()}
                                disabled={isSaveDisabled}
                              >
                                {t('continue')}
                              </Button>

                              <Button variant="link" onClick={() => onClearClick()}>
                                {t('clear')}
                              </Button>
                            </div>
                          </>
                        )}
                      </Modal.Footer>
                    )}
                  </FlexDialog>
                </Col>
                <Col lg={3} className="desktop-show tablet-hide">
                  <ProgressStepper
                    currentIndex={currentStep > formStepsEnum.DATE ? currentStep - 1 : currentStep}
                    steps={
                      formValue.account.toAccount !== null &&
                      formValue.account.toAccount !== 'new_payee'
                        ? movePaymentMakeAPaymentExistingPayeeProgressSteps
                        : movePaymentMakeAPaymentNewPayeeProgressSteps
                    }
                  />
                  <SpamWarning />
                </Col>
              </Row>
            )}
          </FlexContainer>
        </div>
      </div>
      {showConfirmPayeeDataModal && (
        <ConfirmPayeeDataModal
          payee={formValue.payee.payee as Payee}
          onConfirm={() => {
            setShowConfirmPayeeDataModal(false)
          }}
          onUpdateData={() => {
            setCurrentStep(formStepsEnum.PAYEE)
            setShowConfirmPayeeDataModal(false)
          }}
        />
      )}
      {showApproveModal ? (
        <MobileBankingApproveModal
          onApproved={() => {
            setShowApproveModal(false)
            setShowSuccessModal(true)
          }}
        />
      ) : (
        <>
          {showSuccessModal && (
            <SuccessModal
              className="make-a-payment-success-modal"
              title={t(`successModal.payment_complete`)}
              successText={
                <>
                  {t('successModal.your_amount_has_been_paid')}{' '}
                  <span className="bold">{formattedPayee}</span> {t('successModal.account')}
                </>
              }
              onClose={() => {
                setShowSuccessModal(false)
              }}
              customModalFooterContent={
                <>
                  <div>
                    <Button
                      variant="link"
                      onClick={() => {
                        setShowSuccessModal(false)
                        setSaveClicked(false)
                        setShowMakeRecurrentTransfer(true)
                      }}
                    >
                      {t('successModal.make_recurring_payment')}
                    </Button>
                    <Button variant="link" onClick={() => onClearClick()}>
                      {t('successModal.make_another_payment')}
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowSuccessModal(false)
                    }}
                  >
                    {t('successModal.complete')}
                  </Button>
                </>
              }
              mobileFullScreen
            >
              <FlexList items={successModalListItems} wrap />
            </SuccessModal>
          )}
        </>
      )}
    </React.Fragment>
  )
}
