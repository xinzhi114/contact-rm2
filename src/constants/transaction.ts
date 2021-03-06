export interface ITransaction {
  type: string
  reference: string
  date: string
  amount: number
  recipient: string
}

export const dataCanceledTransactions: ITransaction[] = [
  {
    type: 'Shopping',
    reference: 'Bills Allocation (NOV 2020)',
    date: '9 Nov 2020',
    amount: 49,
    recipient: 'XXXXX - 4597',
  },
  {
    type: 'Shopping',
    reference: 'Business Bills (JUN-30)',
    date: '13 Jun 2020',
    amount: 24.89,
    recipient: 'XXXXX - 4597',
  },
]
