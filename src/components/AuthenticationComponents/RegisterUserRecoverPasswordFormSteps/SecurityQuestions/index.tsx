import React from 'react'
import { IRegisterUserRecoverPasswordFormStepsEnum } from '../../../../config/registerUserRecoverPassword'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import {
  RegisterUserRecoverPasswordFormValue,
  SecurityQuestionsFormValue,
} from '../../../../constants/reviewableForm/registerUserRecoverPassword'
import { ReviewFormStepComponent } from '../../../../constants/reviewableForm/reviewableForm'
import './styles.scss'
import BaseForm from '../../../BaseForm'
import { IBaseFormFields } from '../../../../constants/baseForm'
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export const SecurityQuestions: ReviewFormStepComponent<
  SecurityQuestionsFormValue,
  RegisterUserRecoverPasswordFormValue,
  IRegisterUserRecoverPasswordFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.formSteps.securityQuestions.${key}`)

  const location = useLocation()

  const { formValue, onChange, onEditClick, formStepsEnum } = props

  const isResetPasscode = location.pathname.startsWith('/resetPasscode')
  const isAccountLocked = location.pathname.startsWith('/accountLocked')

  const securityQuestionsMapping = [1, 2, 3].reduce((prev, curr) => {
    const next = { ...prev }
    const key = `question_${curr}`
    next[key] = t(`questionList.${key}`)
    return next
  }, {} as { [key: string]: string })

  const getFormFields = (index: number): IBaseFormFields => {
    if ([1, 2, 3].includes(index)) {
      const value =
        index === 1
          ? formValue.firstQuestion
          : index === 2
          ? formValue.secondQuestion
          : formValue.thirdQuestion
      return {
        selectQuestion: {
          type: 'dropdown',
          value: value.question !== null ? securityQuestionsMapping[value.question] : null,
          options: _.values(securityQuestionsMapping),
          onChange: (newValue) => {
            const newFormValue = {
              ...formValue,
            }
            const newQuestion = _.invert(securityQuestionsMapping)[newValue as string]
            switch (index) {
              case 1:
                newFormValue.firstQuestion.question = newQuestion
                break
              case 2:
                newFormValue.secondQuestion.question = newQuestion
                break
              case 3:
                newFormValue.thirdQuestion.question = newQuestion
                break
            }
            onChange(newFormValue)
          },
          placeholder: t(`select_question_${index}`),
          label: t('select_question'),
          showHelp: false,
        },
        yourAnswer: {
          type: 'text',
          value: value.answer,
          onChange: (newValue) => {
            const newFormValue = {
              ...formValue,
            }
            const newAnswer = (newValue as React.ChangeEvent<HTMLInputElement>).target.value
            switch (index) {
              case 1:
                newFormValue.firstQuestion.answer = newAnswer
                break
              case 2:
                newFormValue.secondQuestion.answer = newAnswer
                break
              case 3:
                newFormValue.thirdQuestion.answer = newAnswer
                break
            }
            onChange(newFormValue)
          },
          placeholder: t(`your_answer_${index}`),
          label: t('your_answer'),
          showHelp: false,
        },
      }
    } else {
      return {}
    }
  }

  return (
    <div className="security-questions-step">
      {isResetPasscode || isAccountLocked ? (
        <div className="question-row single-question">
          <BaseForm
            fields={{
              answer: {
                type: 'text',
                value: formValue.answer,
                label: securityQuestionsMapping.question_1,
                placeholder: t('security_question__placeholder'),
                onChange: (newValue) =>
                  onChange({
                    ...formValue,
                    answer: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
                  }),
                helpTooltipText: t('hint'),
              },
            }}
          />
        </div>
      ) : (
        [1, 2, 3].map((index) => (
          <div key={index} className="question-row">
            <div className="section-title">{t(`question_${index}`)}</div>
            <BaseForm fields={getFormFields(index)} disableTranslation />
          </div>
        ))
      )}
      <div className="submit-row">
        <Button
          variant="primary"
          onClick={() => onEditClick(formStepsEnum.SET_PASSWORD)}
          disabled={
            isResetPasscode || isAccountLocked
              ? formValue.answer === ''
              : _.values(formValue).some((question) =>
                  _.values(question).some((value) => value === '' || value === null)
                )
          }
        >
          {_t('common.btns.continue')}
        </Button>
      </div>
    </div>
  )
}
