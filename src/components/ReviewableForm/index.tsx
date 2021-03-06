import React from 'react'
import * as _ from 'lodash'
import {
  IReviewFormStep,
  IReviewFormStepBaseProps,
  ReviewableFormStepEnum,
  ReviewableFormValue,
  ReviewFormStepValues,
} from '../../constants/reviewableForm/reviewableForm'
import { ReviewFormStep } from './ReviewFormStep'
import { ImportantInformation } from '../MovePaymentComponents/ImportantInformation'
import './styles.scss'
import { IMakeAPaymentFormStepsEnum } from '../../config/makeAPayment'

export interface IReviewableFormProps {
  steps: IReviewFormStep<any, any, any>[]
  currentStepIndex: number
  formValue: ReviewableFormValue
  onChange: (newFormValue: ReviewableFormValue) => void
  onEditClick: (step: number) => void
  showTablet: boolean
  formStepsEnum: ReviewableFormStepEnum
  context: 'make-a-payment' | 'registration'
  translationKey: string
  showImportantInfo?: boolean
  onCloseShowImportantInfo?: () => void
}

export const ReviewableForm: React.FunctionComponent<IReviewableFormProps> = (props) => {
  const {
    steps,
    currentStepIndex,
    formValue,
    onChange,
    onEditClick,
    showImportantInfo,
    showTablet,
    onCloseShowImportantInfo,
    formStepsEnum,
    translationKey,
    context,
  } = props

  const currentStep = steps[currentStepIndex]

  const getChangeHandler = (id: string) => (newInnerFormValue: ReviewFormStepValues) => {
    const newFormValue: ReviewableFormValue = { ...formValue }
    _.set(newFormValue, id, newInnerFormValue)
    onChange(newFormValue)
  }

  const onChangeOtherForm = (id: string, newFormValue: ReviewFormStepValues) =>
    getChangeHandler(id)(newFormValue)

  const onChangeAllForms = (newFormValue: ReviewableFormValue) => onChange(newFormValue)

  const commonProps = {
    allFormValues: formValue,
    onChangeOtherForm,
    onChangeAllForms,
    onEditClick,
    formStepsEnum,
    showTablet,
  }

  const currentStepProps: IReviewFormStepBaseProps<
    ReviewFormStepValues,
    ReviewableFormValue,
    ReviewableFormStepEnum
  > | null = currentStep
    ? {
        formValue: formValue[currentStep.id],
        onChange: getChangeHandler(currentStep.id),
        ...commonProps,
      }
    : null

  const previousSteps = steps.filter((_step, index) => index < currentStepIndex)

  return (
    <div
      className={`reviewable-form ${
        context === 'make-a-payment'
          ? currentStepIndex === (formStepsEnum as IMakeAPaymentFormStepsEnum).FINAL_REVIEW
            ? 'final-step'
            : ''
          : ''
      }`}
    >
      {previousSteps.length > 0 && (
        <div className="previous-steps">
          {previousSteps.map((previousStep, index) => {
            if (previousStep.hide) {
              return <React.Fragment key={index} />
            }
            const previousStepProps: IReviewFormStepBaseProps<
              ReviewFormStepValues,
              ReviewableFormValue,
              ReviewableFormStepEnum
            > = {
              formValue: formValue[previousStep.id],
              onChange: getChangeHandler(previousStep.id),
              ...commonProps,
            }
            return (
              <React.Fragment key={index}>
                <ReviewFormStep
                  component={React.createElement(previousStep.component, previousStepProps)}
                  review={previousStep.review === undefined ? true : previousStep.review}
                  noWrap={
                    context === 'make-a-payment'
                      ? currentStepIndex === (formStepsEnum as IMakeAPaymentFormStepsEnum).PAYEE
                      : undefined
                  }
                />
              </React.Fragment>
            )
          })}
        </div>
      )}
      {currentStep && (
        <div className="current-step">
          <ReviewFormStep
            component={React.createElement(currentStep.component, currentStepProps)}
          />
        </div>
      )}
      {showImportantInfo && (
        <ImportantInformation
          showFullModal={false}
          onClose={() => onCloseShowImportantInfo && onCloseShowImportantInfo()}
          expandable
          translationKey={`${translationKey}.importantInformation`}
        />
      )}
    </div>
  )
}
