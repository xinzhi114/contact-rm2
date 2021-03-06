import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IMakeAPaymentFormStepsEnum } from '../../../../../config/makeAPayment'
import {
  MakeAPaymentFormValue,
  SelectDateFormValue,
} from '../../../../../constants/reviewableForm/makeAPayment'
import { ReviewFormStepComponent } from '../../../../../constants/reviewableForm/reviewableForm'
import { BaseDateInput } from '../../../../BaseForm/BaseFormFields/BaseDateInput'
import { EditStepButton } from '../../EditStepButton'
import './styles.scss'

export const SelectDate: ReviewFormStepComponent<
  SelectDateFormValue,
  MakeAPaymentFormValue,
  IMakeAPaymentFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.selectDate.${key}`)

  const { formValue, onChange, onEditClick, review, formStepsEnum } = props

  if (review) {
    return (
      <div className="select-date-review">
        <div className="text-wrap">
          <span>{t('payment_date')}</span>
          <span>{formValue.date ? moment(formValue.date).format('DD MMMM YYYY') : ''}</span>
        </div>
        <div className="edit-button-wrap">
          <EditStepButton onClick={() => onEditClick(formStepsEnum.DATE)} />
        </div>
      </div>
    )
  }

  return (
    <div className="select-date">
      <div className="top-title">{t('payment_date')}</div>
      <BaseDateInput
        value={formValue.date}
        onChange={(newDate) => onChange({ date: newDate })}
        placeholder={t('placeholder')}
        maxDate={moment().add(2, 'days').toDate()}
        minDate={moment().toDate()}
      />
      <div className="date-info">{t('payment_date_info')}</div>
    </div>
  )
}
