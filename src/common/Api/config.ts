/**
 * global random key
 */
const GLOBAL_RANDOM_E_KEY = `${Math.random()}@${Date.now()}`;
export const API_AUTH_USER_KEY = 'AUTH_USER_KEY';
/**
 * global config
 */
export const GLOBAL_CONFIG = {
  BASE_API_PATH: 'http://services.odyssey-api-dev.com',
  APP_ID: '/app/one',
  CYN_WEB: 'CYN_WEB',
  E_IV: 'AODVNUASDNVVAOVF',
  E_KEY: GLOBAL_RANDOM_E_KEY.substr(0, 16),
  BOTH: 'BOTH',
  ACCESS_TOKEN_EXPIRES_BEFORE: 20, // access token expires in N minutes
  REFRESH_TOKEN_EXPIRES_BEFORE: 2, //refresh token expires in N minutes
  HELP_DRUPAL_URL:
    'http://drupal.odyssey-api-dev.com/jsonapi/node/helpsupport?include=field_faq,field_faq.field_faq_list,field_insight,field_insight.field_insight_info_list,field_insight.field_insight_info_list.field_insight_list,field_contact_bank,field_regional_office_addresses',
};

export const EVENTS = {
  RECOVER_USERNAME: 'SECURITY_EVENT:RECOVER_USERNAME',
  CUSTOMER_REGISTRATION: 'REGISTRATION_EVENT:CUSTOMER_REGISTRATION',
  REGISTRATION_MFA: 'REGISTRATION_EVENT:REGISTRATION_MFA',
  ALERT_CONFIGURE: 'SECURITY_EVENT:ALERT_CONFIGURE',
  USER_CRED_VALIDATE: 'SECURITY_EVENT:USER_CRED_VALIDATE',
};

export const CHANNEL_WEB = 'web';
export const CHANNEL_MOBILE = 'mobile';
