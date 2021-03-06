export const EmailSubjectArray = [
  'online_banking_support',
  'bond_enquiry',
  'isa_enquiry',
  'account_opening',
  'account_maintenance',
  'debit_card',
  'payment_enquiry',
  'complaint',
  'bereavement',
  'dormant_account',
  'power_of_attorney',
  'potential_fraud',
  'contact_rm',
  'add_new_user',
  'account_closure',
  'others',
] as const

export type EmailSubject = typeof EmailSubjectArray[number]
