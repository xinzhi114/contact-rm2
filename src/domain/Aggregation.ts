/**
 * Aggregation account
 */
export interface AggregationAccount {
  accountName: string
  balance: number
  product: string
  accountNumber: string
  overdraft: number
  percentage: number
}

/**
 * Aggregation class
 */
export interface Aggregation {
  accounts: AggregationAccount[]
  aggregatedBalance: number
  currency: string
  accountType: string
}
