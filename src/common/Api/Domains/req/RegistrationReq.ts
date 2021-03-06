/**
 * the register request body
 */
export interface RegisterReq {
  accountNumber: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sortCode: string;
  titleId: number;
  resident?: boolean;
  decision: boolean;
  tcId: number;
  postCode?: string;
}

/**
 * confirm req
 */
export interface RegisterConfirmReq {
  confirmPassword: string;
  tempUUID: string;
  password: string;
}

/**
 * otp Evaluate request
 */
export interface RegisterOTPEvaluateReq {
  otp: string;
  tempUUID: string;
  otpUUID: string;
}

/**
 * terms and conditions
 */
export interface TNCReq {
  channelCode: string;
}

/**
 * one span register request
 */
export interface OneSpanRegisterReq {
  customerUniqueIdentifier: string,
  userId: string
}

