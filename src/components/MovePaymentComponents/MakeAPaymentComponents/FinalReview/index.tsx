import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { IListItem } from '../../../../constants/layout'
import { FlexList } from '../../../FlexLayoutComponents/FlexList'
import './styles.scss'
import { formatAmount } from '../../../../services/Util'
import { MakeAPaymentFormValue } from '../../../../constants/reviewableForm/makeAPayment'

export interface IFinalReviewProps {
  formValue?: MakeAPaymentFormValue
}

export const FinalReview: React.FunctionComponent<IFinalReviewProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.finalReview.${key}`)

  const { formValue } = props
  if (!formValue || formValue.payee.payee === null) {
    return <></>
  }
  const payee = formValue.payee.payee

  const accountItems: IListItem[] = [
    {
      label: _t('movePaymentMakeAPayment.from_account'),
      title: formValue.account.account ? formValue.account.account.name : '--',
      subTitle: formValue.account.account ? formValue.account.account.accountNumber : '--',
    },
    {
      icon: '/assets/mobile-back.svg',
      alt: 'to account',
      flip: true,
    },
    {
      label: _t('movePaymentMakeAPayment.to'),
      title: formValue.account.toAccount
        ? formValue.payee.payee
          ? formValue.payee.payee.name
          : '--'
        : '--',
      subTitle: formValue.payee.payee ? formValue.payee.payee.accountNumber : '--',
    },
  ]

  const paymentMethodItem: IListItem = {
    label: _t('movePaymentMakeAPayment.selectPayment.payment_method'),
    value: _t(`movePaymentMakeAPayment.selectPayment.${formValue.payment.paymentMethod as string}`),
  }

  const items: IListItem[] = [
    {
      label: _t('movePaymentManagePayees.payeeDetails.name'),
      value: payee.name,
    },
    {
      label: _t('movePaymentManagePayees.payeeDetails.account_number'),
      value: payee.accountNumber,
    },
    ...(formValue.payment.international
      ? [
          {
            label: _t('movePaymentManagePayees.payeeForm.iban_label'),
            value: payee.iban,
          },
          {
            label: _t('movePaymentManagePayees.payeeForm.bic_label'),
            value: payee.bic as string,
          },
        ]
      : [
          {
            label: _t('movePaymentManagePayees.payeeDetails.sort_code'),
            value: payee.sortCode as string,
          },
        ]),
    {
      label: _t('movePaymentMakeAPayment.selectDate.payment_date'),
      value: moment(formValue.date.date).format('DD MMMM YYYY'),
    },
    ...(!formValue.payment.international ? [paymentMethodItem] : []),
    {
      label: _t(
        `movePaymentMakeAPayment.selectPayment.${
          formValue.payment.international ? 'destination_' : ''
        }currency`
      ),
      value: formValue.payment.currency as string,
    },
    ...(formValue.payment.paymentMethod === 'chaps'
      ? [
          {
            label: _t('movePaymentMakeAPayment.selectPayment.regulatory_fees'),
            value: `£ ${formatAmount(4)}`,
          },
          {
            label: _t('movePaymentMakeAPayment.selectPayment.chaps_fees'),
            value: `£ ${formatAmount(8.6)}`,
          },
        ]
      : []),
    {
      label: _t('movePaymentMakeAPayment.selectMoreDetails.reference'),
      value: formValue.moreDetails.reference,
    },
    {
      label: _t('movePaymentMakeAPayment.selectMoreDetails.spent_category'),
      value: formValue.moreDetails.spentCategory
        .map((category) => _t(`movePaymentMakeAPayment.selectMoreDetails.${category}`))
        .join(', '),
    },
    ...(formValue.payment.international
      ? [
          paymentMethodItem,
          {
            label: _t('movePaymentMakeAPayment.selectPayment.destination_amount'),
            value: `€ ${formatAmount(1000)}`,
          },
          {
            label: _t('movePaymentMakeAPayment.selectPayment.conversion_rates'),
            value: '1.32',
          },
          {
            label: _t('movePaymentMakeAPayment.selectPayment.amount_deducted_from_account'),
            value: `£ ${formatAmount(820)}`,
          },
          {
            label: _t('movePaymentMakeAPayment.selectPayment.sepa_fee'),
            value: `£ ${formatAmount(100)}`,
          },
        ]
      : []),
    {
      label: _t('movePaymentMakeAPayment.selectPayment.total_cost'),
      value: `£ ${
        isNaN(Number(formValue.payment.amount))
          ? '--'
          : formatAmount(Number(formValue.payment.amount))
      }`,
      bold: true,
    },
  ]

  return (
    <div className="final-review">
      <div className="top-title">
        {formValue.payment.international
          ? t('make_an_international_payment')
          : t('make_a_domestic_payment')}
      </div>
      <FlexList items={accountItems} className="account-summary" />
      <FlexList items={items} className="payment-summary" />
    </div>
  )
}
