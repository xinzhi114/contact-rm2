import { Payee } from '../containers/MovePaymentPages/ManagePayees'

export interface IPayment {
  from: Payee
  to: Payee
}

export const PAYMENT_FREQUENCY_OPTIONS = ['Weekly', 'Monthly', 'Yearly'] as const

export type PaymentFrequency = typeof PAYMENT_FREQUENCY_OPTIONS[number]

export interface ILoadRecentPaymentsResponse {
  payments: IPayment[]
}
