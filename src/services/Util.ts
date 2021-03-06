import { isNil } from 'lodash'
import { StorageService } from './api/StorageService'

export function getNumber(v: any): number | undefined {
  const newV = (isNil(v) ? '' : v).toString().replace(/^\D+/g, '')
  if (!newV) {
    return undefined
  }
  return parseInt(newV, 10)
}

/**
 * format amount
 * @param amount the amout
 */
export const formatAmount = (amount: number): string => {
  const str = amount.toFixed(2)
  const parts = str.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * string amount to number
 */
export const amountToFloat = (amount: string): number => {
  return parseFloat(amount.replace(/[^0-9$.]/g, ''))
}

/**
 * get currency symbol
 * @param currency the currency
 */
export const getCurrencySymbol = (currency: string): string => {
  const MAP: any = {
    GBP: '£',
    EUR: '€',
  }
  return MAP[currency] || currency.substr(0, 1)
}

/**
 * format account number
 * @param v the account number
 */
export const formatAccNumber = (v: string): string => {
  return (v.match(/.{1,4}/g) || []).join(' ')
}

/**
 * get key from options
 */
export const getKeyFromOptions = (options: any, value: string) => {
  for (const opt of options) {
    if (opt.value === value) {
      return opt.key
    }
    const subOpt = (opt.optionList || []).find((o: any) => o.value === value)
    if (subOpt) {
      return subOpt.key
    }
  }
  return value
}

/**
 * storage service
 */
export const storageService = new StorageService()
