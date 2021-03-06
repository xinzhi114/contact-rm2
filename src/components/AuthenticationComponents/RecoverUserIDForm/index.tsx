import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { IBaseFormFields } from '../../../constants/baseForm'
import BaseForm from '../../BaseForm'
import './styles.scss'

export const RecoverUserIDForm: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.recoverUserIdForm.${key}`)

  const history = useHistory()

  const [currentStep, setCurrentStep] = useState<'account_info' | 'security_question' | 'success'>(
    'account_info'
  )
  const [formValue, setFormValue] = useState({
    accountNumber: '',
    dateOfBirth: ['', '', ''],
    securityQuestionAnswer: '',
  })
  // TODO: move to Redux store after integration
  const userId = 'mock'

  const fields: IBaseFormFields = {}

  switch (currentStep) {
    case 'account_info':
      fields.accountNumber = {
        type: 'text',
        value: formValue.accountNumber,
        onChange: (newValue) =>
          setFormValue({
            ...formValue,
            accountNumber: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
          }),
        formatAs: 'account-number',
        label: t('account_number__label'),
        placeholder: t('account_number__placeholder'),
        showHelp: false,
      }
      fields.dateOfBirth = {
        type: 'date-of-birth',
        value: formValue.dateOfBirth,
        onChange: (newValue) => setFormValue({ ...formValue, dateOfBirth: newValue as string[] }),
        label: t('date_of_birth__label'),
        showHelp: false,
      }
      break
    case 'security_question':
      fields.securityQuestion = {
        type: 'text',
        value: formValue.securityQuestionAnswer,
        label: _t('registration.formSteps.securityQuestions.questionList.question_1'),
        placeholder: t('security_question__placeholder'),
        onChange: (newValue) =>
          setFormValue({
            ...formValue,
            securityQuestionAnswer: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
          }),
        helpTooltipText: t('hint'),
      }
      break
    case 'success':
      fields.yourUserId = {
        type: 'text',
        value: userId,
        label: t('user_id__label'),
        rowClassName: 'user-id-wrapper',
        disabled: true,
        showHelp: false,
        appendChildren: (
          <span className="copy" onClick={() => navigator.clipboard.writeText(userId)}>
            {t('copy')}
          </span>
        ),
      }
      break
  }

  const handleSubmit = () => {
    if (currentStep === 'success') {
      history.push('/')
    } else {
      setCurrentStep(currentStep === 'account_info' ? 'security_question' : 'success')
    }
  }

  const submitDisabled =
    currentStep === 'account_info'
      ? formValue.accountNumber.length < 8 ||
        formValue.dateOfBirth[0].length === 0 ||
        formValue.dateOfBirth[1].length === 0 ||
        formValue.dateOfBirth[2].length < 4
      : currentStep === 'security_question'
      ? formValue.securityQuestionAnswer === ''
      : false

  return (
    <>
      <div className="recover-user-id-form">
        <span className="title-text tablet-hide desktop-show">{t(`${currentStep}_title`)}</span>
        <div className="form-row">
          <BaseForm fields={fields} />
        </div>
        <div className="submit-row">
          <Button variant="primary" onClick={() => handleSubmit()} disabled={submitDisabled}>
            {currentStep === 'success' ? t('login') : _t('common.btns.submit')}
          </Button>
        </div>
      </div>
    </>
  )
}
