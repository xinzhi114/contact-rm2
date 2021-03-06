import { Aggregation } from '../../../domain/Aggregation'
import React from 'react'
import { globalT } from '../../../i18n'
import { GET_CUR_OPTIONS, GET_TIME_LINE_OPTIONS, getAccountOptions } from '../PFMConfigProvider'
import { getKeyFromOptions } from '../../../services/Util'
import { BaseDropdown } from '../../BaseForm/BaseFormFields/BaseDropdown'

export interface PFMSelectValues {
  accountSelection: string
  timelineSelection: string
  currencySelection: string
}

export interface PFMAccountOption {
  categoryTitle: string
  optionList: { key: string; value: string }[]
}
/**
 * PFM select params
 */
export interface PFMSelectProps extends PFMSelectValues {
  onSelect: (key: string, value: string | null) => void
  showExtraLabels?: boolean
  aggregations: Aggregation[]
  fromTab?: string
}

export const PFMSelect = (props: PFMSelectProps) => {
  const t = globalT
  const getValue = getKeyFromOptions

  const CUR_OPTIONS = GET_CUR_OPTIONS()
  const ACC_OPTIONS = getAccountOptions(props.aggregations)
  const TIME_OPTIONS = GET_TIME_LINE_OPTIONS()
  return (
    <div className="drop-wrap flex-grid">
      <div className="two-dropdown flex">
        <div className="items">
          <div className="top-gray-title">{t('financeManager.tabIncomeOutgoings.currency')}</div>
          <BaseDropdown
            value={getValue(CUR_OPTIONS, props.currencySelection)}
            onChange={(newValue) => props.onSelect('currencySelection', newValue)}
            options={GET_CUR_OPTIONS()}
            disableTranslation
            hideBorder
          />
        </div>
        <span className="line  mobile-hide-strict" />
        <div className="items">
          <div className="top-gray-title">
            {t('financeManager.tabIncomeOutgoings.select_account')}
          </div>
          <BaseDropdown
            value={getValue(ACC_OPTIONS, props.accountSelection)}
            onChange={(newValue) => props.onSelect('accountSelection', newValue)}
            options={ACC_OPTIONS}
            disableTranslation
            hideBorder
          />
        </div>
        <span className="line mobile-hide-strict" />
        <div className="items">
          <div className="top-gray-title">{t('financeManager.tabIncomeOutgoings.timeline')}</div>
          <BaseDropdown
            value={getValue(ACC_OPTIONS, props.timelineSelection)}
            onChange={(newValue) => props.onSelect('timelineSelection', newValue)}
            options={TIME_OPTIONS}
            disableTranslation
            hideBorder
          />
        </div>
      </div>
      {props.showExtraLabels && (
        <div className="right-points flex mobile-hide">
          <div className="group">
            <span className="point income-color" />
            <span className="txt">{t('financeManager.tabIncomeOutgoings.income')}</span>
          </div>
          <div className="group">
            <span className="point outgoings-color" />
            <span className="txt">{t('financeManager.tabIncomeOutgoings.outgoings')}</span>
          </div>
        </div>
      )}
    </div>
  )
}
