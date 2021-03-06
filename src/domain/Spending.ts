/**
 * Spending Row
 */
export interface SpendingRow {
  spent: number
  percentage: number
  category: string
}

/**
 * spending transaction
 */
export interface SpendingTransaction {
  hasMoreResult: boolean
  nextStartCursor: string
  loading: boolean
  transactions: SpendingTransactionItem[]
}

/**
 * spending transaction row
 */
export interface SpendingTransactionItem {
  transactionId: number
  transactionName: string
  accountNumber: string
  currency: string
  timeStamp: string
  amount: number
}

/**
 * Spending
 */
export interface Spending {
  tenure: string
  spends: {
    EUR: SpendingRow[]
    GBP: SpendingRow[]
  }
}
