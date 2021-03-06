import { IMakeAPaymentFormStepsEnum } from '../../config/makeAPayment'
import { IRegisterUserRecoverPasswordFormStepsEnum } from '../../config/registerUserRecoverPassword'
import { MakeAPaymentFormStepValues, MakeAPaymentFormValue } from './makeAPayment'
import {
  RegisterUserRecoverPasswordFormStepValues,
  RegisterUserRecoverPasswordFormValue,
} from './registerUserRecoverPassword'

export type ReviewFormStepValues =
  | MakeAPaymentFormStepValues
  | RegisterUserRecoverPasswordFormStepValues

export type ReviewableFormValue = MakeAPaymentFormValue | RegisterUserRecoverPasswordFormValue

export type ReviewableFormStepEnum =
  | IMakeAPaymentFormStepsEnum
  | IRegisterUserRecoverPasswordFormStepsEnum

export type ReviewFormStepComponent<
  T extends ReviewFormStepValues,
  TParentForm extends ReviewableFormValue,
  TFormSteps extends ReviewableFormStepEnum
> = React.FunctionComponent<IReviewFormStepBaseProps<T, TParentForm, TFormSteps>>

export interface IReviewFormStepBaseProps<
  T,
  TParentForm extends ReviewableFormValue,
  TFormSteps extends ReviewableFormStepEnum
> {
  formValue: T
  allFormValues: TParentForm
  onChange: (newFormValue: T) => void
  onChangeOtherForm: (formId: string, newFormValue: ReviewFormStepValues) => void
  onChangeAllForms: (newFormValue: TParentForm) => void
  onEditClick: (step: number) => void
  formStepsEnum: TFormSteps
  showTablet: boolean
  review?: boolean
  noWrap?: boolean
}

export interface IReviewFormStep<
  T extends ReviewFormStepValues,
  TParentForm extends ReviewableFormValue,
  TFormSteps extends ReviewableFormStepEnum
> {
  id: string
  component: ReviewFormStepComponent<T, TParentForm, TFormSteps>
  review?: boolean
  hide?: boolean
}
