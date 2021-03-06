import { OTPCode } from '../components/AuthenticationComponents/RegisterUserRecoverPasswordFormSteps/OTPCode'
import { PersonalDetails } from '../components/AuthenticationComponents/RegisterUserRecoverPasswordFormSteps/PersonalDetails'
import { SecurityQuestions } from '../components/AuthenticationComponents/RegisterUserRecoverPasswordFormSteps/SecurityQuestions'
import { SetPassword } from '../components/AuthenticationComponents/RegisterUserRecoverPasswordFormSteps/SetPassword'
import { IReviewFormStep } from '../constants/reviewableForm/reviewableForm'

export const REGISTER_USER_FORM_STEPS_ENUM = {
  PERSONAL_DETAILS: 0,
  OTP_CODE: 1,
  SECURITY_QUESTIONS: 2,
  SET_PASSWORD: 3,
  SUBMIT: 4,
} as const

export type IRegisterUserRecoverPasswordFormStepsEnum = typeof REGISTER_USER_FORM_STEPS_ENUM

export const registerUserReviewableFormSteps: IReviewFormStep<any, any, any>[] = [
  {
    id: 'personalDetails',
    component: PersonalDetails,
  },
  {
    id: 'otpCode',
    component: OTPCode,
  },
  {
    id: 'securityQuestions',
    component: SecurityQuestions,
  },
  {
    id: 'setPassword',
    component: SetPassword,
  },
]
