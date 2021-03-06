/**
 * Budget Row
 */
export interface BudgetRow {
  budgetFromDate?: string
  budgetToDate?: string
  budgetDaysLeft?: number
  budgetLimit: number
  frequence?: string
  budgetSpentPercentage: number
  budgetSpent: number
  budgetLeft: number
  category: string
}

/**
 * Budget
 */
export interface Budget {
  tenure: string
  budgets: {
    EUR: BudgetRow[]
    GBP: BudgetRow[]
  }
}
