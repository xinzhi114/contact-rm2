export interface IAccount {
  name: string
  accountNumber: string
  sortCode: string
  balance: number
  interestRate: number
}

export interface ILoadAccountsResponse {
  accounts: IAccount[]
}

export const ToAccountArray = ['existing_payee', 'recent_payment', 'new_payee'] as const

export type ToAccountTypes = typeof ToAccountArray[number]

export type IRelationshipManager = {
  photoUrl: string
  stars: number
  name: string
  role: string
  state: string
  email: string
}
