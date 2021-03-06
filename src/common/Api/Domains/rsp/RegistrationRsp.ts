/**
 * register response
 */
export interface RegisterRsp {
  tempToken: string;
  otpUUID: string;
}


/**
 * user title
 */
export interface TitleRsp {
  titleId: number;
  customerTitle: string;
}

/**
 * terms and conditions
 */
export interface TNCRsp {
  tcId: number;
  tcNamespace: string;
  version: number;
  termsAndConditions: string;
}


/**
 * terms and conditions
 */
export interface TNCUriRsp {
  termsAndConditionPageURI: string;
}

/**
 * otp evaluate response
 */
export interface RegisterOTPEvaluateRsp {
  username: string;
  otpResponse: {
    valid: boolean;
    'x-mfaToken': string;
  }
}

/**
 * confirm req
 */
export interface RegisterConfirmRsp {
  username: string;
  customerUniqueIdentifier: string;
}

/**
 * one span register response
 */
export interface OneSpanRegisterRsp {
  activationPassword: string;
  serialNumber: string;
  crontoCodeResponse: {
    image: string
  }
}
