import { GLOBAL_CONFIG } from '../config'

/**
 * get login params
 */
export const getLoginParams = (userName: string, password: string, otp?: string) => {
  return {
    channelIdentifier: GLOBAL_CONFIG.BOTH,
    multiCredentialsValidation: false,
    credentials: {
      userName,
      password,
      authenticationMethodCode: '1',
      channelIdentifier: GLOBAL_CONFIG.BOTH,
    },
    geoLocation: {
      latitude: '11',
      longitude: '12',
      error: '0',
    },
    otp,
  }
}
