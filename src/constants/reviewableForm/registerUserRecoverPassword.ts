import * as _ from 'lodash'

export type PersonalDetailsFormValue = {
  accountDetails: {
    accountNumber: string
    userId: string | null
    sortCode: string
  }
  personalDetails: {
    isNonUkCustomer: boolean
    title: string | null
    firstName: string
    lastName: string
    dateOfBirth: [string, string, string]
    postcode: string
  }
  agreeToTermsAndConditions: boolean
  tcId: number
}

export type OTPCodeFormValue = { otp: string }

export const SecurityQuestionArray = ['question_1', 'question_2', 'question_3'] as const

export type ISecurityQuestion = {
  question: string | null
  answer: string
}

export type SecurityQuestionsFormValue = {
  firstQuestion: ISecurityQuestion
  secondQuestion: ISecurityQuestion
  thirdQuestion: ISecurityQuestion
  answer: string | null
}

export type SetPasswordFormValue = {
  password: string
  confirmPassword: string
}

export type RegisterUserRecoverPasswordFormStepValues =
  | PersonalDetailsFormValue
  | OTPCodeFormValue
  | SecurityQuestionsFormValue
  | SetPasswordFormValue

export type RegisterUserRecoverPasswordFormValue = {
  [key: string]: RegisterUserRecoverPasswordFormStepValues
  personalDetails: PersonalDetailsFormValue
  otpCode: OTPCodeFormValue
  securityQuestions: SecurityQuestionsFormValue
  setPassword: SetPasswordFormValue
}

export const initialRegisterUserFormValue: RegisterUserRecoverPasswordFormValue = {
  personalDetails: {
    accountDetails: {
      sortCode: '',
      accountNumber: '',
      userId: null,
    },
    personalDetails: {
      isNonUkCustomer: false,
      title: null,
      firstName: '',
      lastName: '',
      dateOfBirth: ['', '', ''],
      postcode: '',
    },
    agreeToTermsAndConditions: false,
    tcId: 0,
  },
  otpCode: {
    otp: '',
  },
  securityQuestions: {
    firstQuestion: {
      question: null,
      answer: '',
    },
    secondQuestion: {
      question: null,
      answer: '',
    },
    thirdQuestion: {
      question: null,
      answer: '',
    },
    answer: null,
  },
  setPassword: {
    password: '',
    confirmPassword: '',
  },
}

const initialResetPasscodeFormValue = _.cloneDeep(initialRegisterUserFormValue)

initialResetPasscodeFormValue.personalDetails.accountDetails.userId = ''
initialResetPasscodeFormValue.securityQuestions.answer = ''

export { initialResetPasscodeFormValue }
