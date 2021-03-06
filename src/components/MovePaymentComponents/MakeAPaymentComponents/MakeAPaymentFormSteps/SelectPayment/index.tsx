import React from 'react'
import { useTranslation } from 'react-i18next'
import { IMakeAPaymentFormStepsEnum } from '../../../../../config/makeAPayment'
import { IBaseFormFields } from '../../../../../constants/baseForm'
import { IListItem } from '../../../../../constants/layout'
import {
  MakeAPaymentFormValue,
  SelectPaymentFormValue,
} from '../../../../../constants/reviewableForm/makeAPayment'
import { ReviewFormStepComponent } from '../../../../../constants/reviewableForm/reviewableForm'
import BaseForm from '../../../../BaseForm'
import { BaseCheckbox } from '../../../../BaseForm/BaseFormFields/BaseCheckbox'
import { FlexList } from '../../../../FlexLayoutComponents/FlexList'
import { NoticeModal } from '../../../../Modals/NoticeModal'
import { ImportantInformation } from '../../../ImportantInformation'
import { EditStepButton } from '../../EditStepButton'
import { AccountCard } from './AccountCard'
import './styles.scss'

export const SelectPayment: ReviewFormStepComponent<
  SelectPaymentFormValue,
  MakeAPaymentFormValue,
  IMakeAPaymentFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.selectPayment.${key}`)

  const {
    formValue,
    allFormValues,
    onChange,
    onEditClick,
    review,
    noWrap,
    showTablet,
    formStepsEnum,
  } = props

  let fields: IBaseFormFields = {
    currency: {
      type: 'dropdown',
      value: formValue.currency,
      options: [!formValue.international ? t('pound') : t('euro')],
      label: t('currency'),
      rowClassName: 'currency',
      placeholder: _t('common.dynamicLabels.Select'),
      showHelp: false,
      onChange: (newValue) => onChange({ ...formValue, currency: newValue as string }),
    },
  }

  if (formValue.currency !== null) {
    fields = {
      ...fields,
      amount: {
        type: 'text',
        value: formValue.amount,
        label: t('amount'),
        placeholder: t('enter_amount_here'),
        showCurrency:
          formValue.currency === t('pound') ? true : formValue.currency === t('euro') ? '€' : false,
        showHelp: false,
        onChange: (newValue) =>
          onChange({
            ...formValue,
            amount: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
          }),
        formatAs: 'amount',
      },
      paymentMethod: {
        type: 'dropdown',
        value: formValue.paymentMethod ? t(formValue.paymentMethod) : null,
        options: formValue.international ? [t('sepa')] : [t('faster_payment'), t('chaps')],
        label: t('payment_method'),
        placeholder: _t('common.dynamicLabels.Select'),
        showHelp: false,
        onChange: (newValue) =>
          onChange({
            ...formValue,
            paymentMethod:
              newValue !== null
                ? formValue.international
                  ? 'sepa'
                  : newValue === t('chaps')
                  ? 'chaps'
                  : 'faster_payment'
                : null,
            acceptRatesAndFees: false,
          }),
      },
    }
  }

  const paymentLimit = '250,000'
  const fasterPaymentLimit = '50,000'

  const currency = '£'
  const currencyAbbr = 'GBP'

  const sepaItems: IListItem[] = [
    {
      label: t('conversion_rates'),
      value: '1.32',
    },
    {
      label: t('deducted_from_account'),
      value: `${currency} 820.00`,
    },
    {
      label: t('sepa_fee'),
      value: `${currency} 100.00`,
    },
    {
      label: t('total_cost'),
      value: `${currency} 920.00`,
      bold: true,
    },
  ]

  const chapsItems: IListItem[] = [
    {
      label: t('amount'),
      value: `${currency} 60,000`,
    },
    {
      label: t('chaps_fees'),
      value: `${currency} 8.60`,
    },
    {
      label: t('regulatory_fees'),
      value: `${currency} 4.00`,
    },
    {
      label: t('total_cost'),
      value: `${currency} 60,012.60`,
      bold: true,
    },
  ]

  const fasterPaymentItems: IListItem[] = [
    {
      label: t('total_cost'),
      value: `${currency} 60,000.00`,
      bold: true,
    },
  ]

  const topTitle = formValue.international ? t('international_payment') : t('domestic_payment')

  if (review) {
    return (
      <div className="select-payment-review">
        {noWrap && <div className="top-title">{topTitle}</div>}
        <div className={noWrap ? 'review' : 'review-container'}>
          <div className="left-info">
            <div className="small-title">
              {formValue.international
                ? t('conversion_summary')
                : formValue.paymentMethod === 'chaps'
                ? t('chaps')
                : t('faster_payment')}
            </div>
            {!noWrap && (
              <>
                <div className="payment-summary">
                  <AccountCard amount={60000} type={formValue.international ? 'EU' : 'UK'} />
                  <img src="/assets/mobile-back.svg" alt="to account" />
                  <AccountCard amount={60000} type="UK" />
                </div>
                <div className="helper-text">{t(`${formValue.paymentMethod}_helper`)}</div>
              </>
            )}
          </div>
          <FlexList
            items={
              formValue.international
                ? sepaItems
                : formValue.paymentMethod === 'chaps'
                ? chapsItems
                : fasterPaymentItems
            }
          />
          <EditStepButton onClick={() => onEditClick(formStepsEnum.PAYMENT)} />
        </div>
      </div>
    )
  }

  const showNoticeModal = (showTablet && !formValue.acceptRatesAndFees) || !showTablet

  const onUpdateData = () =>
    onChange({ ...formValue, paymentMethod: null, acceptRatesAndFees: false })

  return (
    <div className="select-payment">
      <div className="top-title">
        {allFormValues.account.toAccount === 'new_payee' ? (
          <BaseCheckbox
            value={[formValue.international]}
            options={[t('international_payment')]}
            onChange={(newValue) =>
              onChange({
                ...formValue,
                international: newValue[0],
                currency: null,
                amount: '',
                paymentMethod: null,
              })
            }
            disableTranslation
          />
        ) : (
          <>{topTitle}</>
        )}
      </div>
      <div className="form-wrap">
        <BaseForm fields={fields} disableTranslation />
        <div className={`bottom-row ${!formValue.international ? 'domestic' : 'international'}`}>
          {formValue.paymentMethod === 'sepa' && showNoticeModal && (
            <NoticeModal
              value={formValue.acceptRatesAndFees}
              onChange={(newValue) => onChange({ ...formValue, acceptRatesAndFees: newValue })}
              onUpdateData={() => onUpdateData()}
              title={t('conversion_summary')}
              text={t('conversion_summary_text')}
              listItems={sepaItems}
              checkboxText={t('accept_conversion_summary')}
              flat={!showTablet}
            >
              <div className="desktop-hide mobile-show">
                <ImportantInformation
                  showFullModal={false}
                  onClose={() => null}
                  expandable
                  forceFlat
                  translationKey="movePaymentMakeAPayment.importantInformation"
                />
              </div>
            </NoticeModal>
          )}
          {formValue.paymentMethod === 'chaps' && showNoticeModal && (
            <NoticeModal
              value={formValue.acceptRatesAndFees}
              onChange={(newValue) => onChange({ ...formValue, acceptRatesAndFees: newValue })}
              onUpdateData={() => onUpdateData()}
              title={t('payment_above_limit')}
              text={`${t('payment_above_limit_text_1')} ${currencyAbbr} ${paymentLimit} ${t(
                'payment_above_limit_text_2'
              )}`}
              listItems={chapsItems}
              checkboxText={t('accept_charges_fee')}
              flat={!showTablet}
            />
          )}
          {formValue.paymentMethod && (
            <div className="payment-method-info">
              {formValue.paymentMethod === 'chaps' && (
                <>
                  {t('chaps_info')}{' '}
                  <span className="bold">
                    {currency}
                    {fasterPaymentLimit}
                  </span>
                </>
              )}
              {formValue.paymentMethod === 'faster_payment' && t('faster_payment_info')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
