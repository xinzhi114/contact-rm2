/**
 * InComeOutGoing row
 */
export interface LineChartData {
  y: number[]
  tintColor: string
  title: string
}

export interface InComeOutGoingRow {
  date: string
  income: number
  expense: number
}

/**
 * InComeOutGoing data
 */
export interface InComeOutGoing {
  tenure: string
  plots: {
    EUR: InComeOutGoingRow[]
    GBP: InComeOutGoingRow[]
  }
}
