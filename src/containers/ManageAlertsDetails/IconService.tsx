const CreditCardIcon = '/assets/credit-card@2x.png'
const CalendarIcon = '/assets/canlender-line.svg'

const HighIcon = '/assets/up.svg'
const AtmIcon = '/assets/channel@2x.png'
const SavingsIcon = '/assets/savings@2x.png'
const LockIcon = '/assets/icon-lock-blue@2x.png'
const ListIcon = '/assets/icon-book@2x.png'
const PointerIcon = '/assets/online@2x.png'
export const getAlertSettingIcon = (evt: string) => {
  const iconMap: any = {
    'CURRENT_ACCOUNT_ALERT_EVENT:DAILY_BALANCE_UPDATE': CreditCardIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:WEEKLY_BALANCE_UPDATE': CalendarIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:HIGH_BALANCE': HighIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:HIGH_VALUE_DEBIT_TRANS': HighIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:HIGH_VALUE_CREDIT_TRANS': HighIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:ATM_WITHDRAWL': AtmIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:APPROCHING_OD_POS': AtmIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:OD_POS': SavingsIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:OD_LIMIT_REACHED': LockIcon,
    'CURRENT_ACCOUNT_ALERT_EVENT:ADVICE_NEW_ONLINE_STMT': ListIcon,
    'PAYMENT_ALERT_EVENT:STANDING_ORDERS_RECURRING': CalendarIcon,
    'PAYMENT_ALERT_EVENT:DIRECT_DEBIT_RECURRING': CreditCardIcon,
    'PAYMENT_ALERT_EVENT:ONLINE_TRANS': PointerIcon,
    'SECURITY_ALERT_EVENT:OTP_COMMUNICATION': CalendarIcon,
  }

  return iconMap[evt] || ListIcon
}
