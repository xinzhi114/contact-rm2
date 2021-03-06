/**
 * account colors
 */
import { Aggregation } from '../../domain/Aggregation'
import { globalT } from '../../i18n'

export const PFM_COLORS = {
  MainNavy: '#001F26',
  MainTeal: '#00D1B6',
  Secondary: '#00A793',
  SherpaBlue: '#003D4C',
  RoyalRed: '#8A2A2B',
}
const ACCOUNT_COLORS = [PFM_COLORS.MainTeal, PFM_COLORS.Secondary, PFM_COLORS.SherpaBlue]

/**
 * get account color
 * @param index the index
 */
export const getAccountColor = (index: number) => ACCOUNT_COLORS[index % ACCOUNT_COLORS.length]

export interface SpendCategoryInfo {
  title: string
  tintColor: string
  icon: string
}
/**
 * PFM category map
 */
export const PFM_CATEGORY_MAP: Record<string, SpendCategoryInfo> = {
  EDUCATION: {
    title: 'Education',
    tintColor: '#00d1b6',
    icon: '/assets/book-open.svg',
  },
  TRAVEL: {
    title: 'Travel',
    tintColor: '#00a792',
    icon: '/assets/plane-departure.svg',
  },
  SHOPPING: {
    title: 'Shopping',
    tintColor: '#003d4c',
    icon: '/assets/shopping-bag.svg',
  },
  HEALTHCARE: {
    title: 'Healthcare',
    tintColor: '#c6e0e9',
    icon: '/assets/healthy.svg',
  },
  GROCERIES: {
    title: 'Groceries',
    tintColor: '#6fb2c9',
    icon: '/assets/shopping-cart.svg',
  },
  BILLS_UTILITIES: {
    title: 'Bills & Utilities',
    tintColor: '#001f26',
    icon: '/assets/bills.svg',
  },
  MORTGAGE: {
    title: 'Mortgage',
    tintColor: '#a93d72',
    icon: '/assets/home.svg',
  },
  CHARITY: {
    title: 'Charity',
    tintColor: '#8b2a2b',
    icon: '/assets/gift.svg',
  },
  ENTERTAINMENT: {
    title: 'Entertainment',
    tintColor: '#796e65',
    icon: '/assets/smile.svg',
  },
  TRANSFERS: {
    title: 'Miscellaneous',
    tintColor: '#14806d',
    icon: '/assets/send.svg',
  },
  MISCELLANEOUS: {
    title: 'Transfers',
    tintColor: '#cdf6f0',
    icon: '/assets/icon-miscellaneous.svg',
  },
}
/**
 * get spend category additional info
 * @param category the category name
 */
export const getSpendCategory = (category: string): SpendCategoryInfo => {
  return (
    PFM_CATEGORY_MAP[category] || {
      title: category,
      tintColor: PFM_COLORS.MainNavy,
    }
  )
}

/**
 * get account options
 * @param aggregations the account aggregations
 * @param hideAcc hide some accounts
 */
export function getAccountOptions(aggregations?: Aggregation[], hideAcc?: string[]) {
  if (!aggregations) {
    return []
  }
  const options: { categoryTitle: string; optionList: { key: string; value: string }[] }[] = []
  aggregations.forEach((agg) => {
    if (hideAcc && hideAcc.includes(agg.accountType)) {
      return
    }
    options.push({
      categoryTitle: agg.accountType,
      optionList: agg.accounts.map((acc) => ({
        key: acc.accountNumber,
        value: `${agg.accountType}-${acc.accountNumber}`,
      })),
    })
  })
  return options
}

/**
 * use aggregations to get default account
 * @param aggregations the aggregation account
 * @param hideAcc hide some account
 */
export const useAccountOptions = (aggregations: Aggregation[], hideAcc?: string[]) => {
  const options = getAccountOptions(aggregations, hideAcc)
  if (options.length > 0) {
    return options[0].optionList[0].value
  }
  return ''
}

/**
 * timeline options
 */
export const GET_TIME_LINE_OPTIONS = () => [
  { value: 'SEVEN_DAYS', key: globalT('common.dynamicLabels.last_x_days', { i: 7 }) },
  { value: 'THIRTY_DAYS', key: globalT('common.dynamicLabels.last_x_days', { i: 30 }) },
  { value: 'NINETY_DAYS', key: globalT('common.dynamicLabels.last_x_days', { i: 90 }) },
  { value: 'HALF_YEAR', key: globalT('common.dynamicLabels.last_x_days', { i: 180 }) },
  { value: 'YEAR', key: globalT('common.dynamicLabels.last_x_days', { i: 365 }) },
]

/**
 * currency options
 */
export const GET_CUR_OPTIONS = () => [
  { key: globalT('common.dynamicLabels.Pound Sterling'), value: 'GBP' },
  { key: globalT('common.dynamicLabels.Euro'), value: 'EUR' },
]
