import { ILoadAccountsResponse } from '../../constants/account'

export const data: ILoadAccountsResponse = {
  accounts: [
    {
      name: 'Current account',
      accountNumber: '01234567',
      sortCode: '00-00-00',
      balance: 170000,
      interestRate: 0.035,
    },
    {
      name: 'Saving account',
      accountNumber: '01234566',
      sortCode: '00-00-00',
      balance: 150000,
      interestRate: 0.035,
    },
    {
      name: 'Other account',
      accountNumber: '01234565',
      sortCode: '00-00-00',
      balance: 140000,
      interestRate: 0.035,
    },
  ],
}

export default data
