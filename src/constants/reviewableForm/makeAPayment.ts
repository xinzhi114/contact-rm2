import { Payee } from '../../containers/MovePaymentPages/ManagePayees'
import { IAccount, ToAccountTypes } from '../account'
import { PaymentFrequency } from '../payment'

export type SelectAccountFormValue = {
  account: IAccount | null
  toAccount: ToAccountTypes | null
}

export type SelectPaymentFormValue = {
  international: boolean
  currency: string | null
  amount: string
  paymentMethod: 'sepa' | 'chaps' | 'faster_payment' | null
  acceptRatesAndFees: boolean
}

export type SelectPayeeFormValue = {
  payee: Payee | null
  savePayee: boolean
}

export type SelectDateFormValue = {
  date: Date | null
}

export type SelectMoreDetailsFormValue = {
  reference: string
  spentCategory: string[]
}

export type RecurringTransferFormValue = {
  [field: string]: string | PaymentFrequency | Date | null
  yourReference: string
  frequency: PaymentFrequency
  firstPaymentDate: Date | null
  finalPaymentDate: Date | null
  firstAmount: string
  regularAmount: string
  finalAmount: string
}

export type MakeAPaymentFormStepValues =
  | SelectAccountFormValue
  | SelectPaymentFormValue
  | SelectPayeeFormValue
  | SelectDateFormValue
  | SelectMoreDetailsFormValue

export type MakeAPaymentFormValue = {
  [key: string]: MakeAPaymentFormStepValues
  account: SelectAccountFormValue
  payment: SelectPaymentFormValue
  payee: SelectPayeeFormValue
  date: SelectDateFormValue
  moreDetails: SelectMoreDetailsFormValue
}

export const initialMakeAPaymentFormValue: MakeAPaymentFormValue = {
  account: {
    account: null,
    toAccount: null,
  },
  payment: {
    international: false,
    currency: null,
    amount: '',
    paymentMethod: null,
    acceptRatesAndFees: false,
  },
  payee: {
    payee: null,
    savePayee: false,
  },
  date: {
    date: new Date(),
  },
  moreDetails: {
    reference: '',
    spentCategory: [],
  },
}

export const initialRecurringTransferFormValue: RecurringTransferFormValue = {
  yourReference: '',
  frequency: 'Monthly',
  firstPaymentDate: null,
  finalPaymentDate: null,
  firstAmount: '',
  regularAmount: '',
  finalAmount: '',
}
