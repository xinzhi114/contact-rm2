import { SelectAccount } from '../components/MovePaymentComponents/MakeAPaymentComponents/MakeAPaymentFormSteps/SelectAccount'
import { SelectDate } from '../components/MovePaymentComponents/MakeAPaymentComponents/MakeAPaymentFormSteps/SelectDate'
import { SelectMoreDetails } from '../components/MovePaymentComponents/MakeAPaymentComponents/MakeAPaymentFormSteps/SelectMoreDetails'
import { SelectPayee } from '../components/MovePaymentComponents/MakeAPaymentComponents/MakeAPaymentFormSteps/SelectPayee'
import { SelectPayment } from '../components/MovePaymentComponents/MakeAPaymentComponents/MakeAPaymentFormSteps/SelectPayment'
import { IReviewFormStep } from '../constants/reviewableForm/reviewableForm'

export const NEW_PAYEE_FORM_STEPS_ENUM = {
  ACCOUNT: 0,
  PAYMENT: 1,
  PAYEE: 2,
  DATE: 3,
  MORE_DETAILS: 4,
  FINAL_REVIEW: 5,
} as const

export const EXISTING_PAYEE_FORM_STEPS_ENUM = {
  ACCOUNT: 0,
  PAYEE: 1,
  PAYMENT: 2,
  DATE: 3,
  MORE_DETAILS: 4,
  FINAL_REVIEW: 5,
} as const

export type IMakeAPaymentFormStepsEnum =
  | typeof NEW_PAYEE_FORM_STEPS_ENUM
  | typeof EXISTING_PAYEE_FORM_STEPS_ENUM

export const newPayeeReviewableFormSteps: IReviewFormStep<any, any, any>[] = [
  {
    id: 'account',
    component: SelectAccount,
  },
  {
    id: 'payment',
    component: SelectPayment,
  },
  {
    id: 'payee',
    component: SelectPayee,
  },
  {
    id: 'date',
    component: SelectDate,
  },
  {
    id: 'moreDetails',
    component: SelectMoreDetails,
  },
]

const existingPayeeReviewableFormSteps: IReviewFormStep<
  any,
  any,
  any
>[] = newPayeeReviewableFormSteps.slice()
// Swap places between select payment & select payee steps
const temp = existingPayeeReviewableFormSteps[NEW_PAYEE_FORM_STEPS_ENUM.PAYMENT]
existingPayeeReviewableFormSteps[EXISTING_PAYEE_FORM_STEPS_ENUM.PAYEE] =
  existingPayeeReviewableFormSteps[NEW_PAYEE_FORM_STEPS_ENUM.PAYEE]
existingPayeeReviewableFormSteps[EXISTING_PAYEE_FORM_STEPS_ENUM.PAYMENT] = temp
export { existingPayeeReviewableFormSteps }
