import React from 'react'
import { useTranslation } from 'react-i18next'
import { IMakeAPaymentFormStepsEnum } from '../../../../../config/makeAPayment'
import { IBaseFormFields } from '../../../../../constants/baseForm'
import {
  MakeAPaymentFormValue,
  SelectMoreDetailsFormValue,
} from '../../../../../constants/reviewableForm/makeAPayment'
import { ReviewFormStepComponent } from '../../../../../constants/reviewableForm/reviewableForm'
import BaseForm from '../../../../BaseForm'
import { IBaseCategoryOption } from '../../../../BaseForm/BaseFormFields/BaseCategorySelect'
import { FlexList } from '../../../../FlexLayoutComponents/FlexList'
import { EditStepButton } from '../../EditStepButton'
import './styles.scss'

export const SelectMoreDetails: ReviewFormStepComponent<
  SelectMoreDetailsFormValue,
  MakeAPaymentFormValue,
  IMakeAPaymentFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.selectMoreDetails.${key}`)

  const { formValue, formStepsEnum, onChange, onEditClick, review } = props

  const categoryOptions: IBaseCategoryOption[] = ['service', 'bills', 'transport'].map(
    (option) => ({
      key: option,
      value: t(option),
      icon: `/assets/category-${option}.svg`,
    })
  )

  const fields: IBaseFormFields = {
    reference: {
      type: 'text',
      value: formValue.reference,
      onChange: (newValue) =>
        onChange({
          ...formValue,
          reference: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
        }),
      label: t('reference'),
      placeholder: t('reference_placeholder'),
      showHelp: true,
      helpTooltipText: _t('movePaymentManagePayees.payeeForm.reference_tooltip'),
    },
    spentCategory: {
      type: 'category',
      value: formValue.spentCategory,
      options: categoryOptions,
      onChange: (newValue) => onChange({ ...formValue, spentCategory: newValue as string[] }),
      label: t('spent_category'),
      showHelp: false,
    },
  }

  if (review) {
    return (
      <div className="select-more-details-review">
        <div className="text-wrap">
          <span>{t('more_details')}</span>
          <FlexList
            items={[
              {
                label: t('spent_category'),
                value: formValue.spentCategory.map((category) => t(category)).join(', '),
              },
              {
                label: t('reference'),
                value: formValue.reference,
              },
            ]}
          />
        </div>
        <div className="edit-button-wrap">
          <EditStepButton onClick={() => onEditClick(formStepsEnum.MORE_DETAILS)} />
        </div>
      </div>
    )
  }

  return (
    <div className="select-more-details">
      <div className="top-title">{t('add_more_details')}</div>
      <BaseForm fields={fields} />
    </div>
  )
}
