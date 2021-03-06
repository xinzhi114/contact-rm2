/**
 * models
 */

export interface StandingOrder {
  checked?: boolean
  orderDetails: {
    fromAccount: string
    regularAmount: string
    finalAmount: string
    sortCode: string
    accountNumber: string
  }
  fieldList: {
    fieldType: string
    fieldName: string
    fieldValue: string
    queryHide: boolean
  }[]
  expandData: {
    areaTitle: string
    fieldList: {
      fieldType: string
      fieldName: string
      fieldValue: string
    }[]
  } | null
}
