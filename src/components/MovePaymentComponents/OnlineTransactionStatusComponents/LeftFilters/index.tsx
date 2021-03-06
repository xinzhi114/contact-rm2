import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'
import { movePaymentSelectDurationDropdownOptions } from '../../../../config'
import './styles.scss'

interface ILeftFiltersProps {
  selectAccountData: {
    title: string
    subTitle: string
  }[]
  applyFilter?: any
}

const LeftFilters: React.FunctionComponent<ILeftFiltersProps> = (props) => {
  const { t } = useTranslation()

  const [frequency, setFrequency] = useState('Select')
  const [selectDuration, setSelectDuration] = useState('Select')

  const [selectAccountData] = useState(props.selectAccountData)

  return (
    <div className="white-panel online-transaction-status-left-filter">
      <div className="black-title">{t('common.labels.filters')}</div>
      <div className="center-boxs">
        <div className="items">
          <div className="top-gray-title">
            {t('movePaymentOnlineTransactionStatus.filters.select_account')}
          </div>

          <BaseDropdown
            id="dropdown-basic-select-account"
            classNameContainer="white-drop"
            hideBorder
            value={frequency}
            options={selectAccountData}
            onChange={(event: any) => {
              setFrequency(event || '')
            }}
          />
        </div>
        <div className="items">
          <div className="top-gray-title">
            {t('movePaymentOnlineTransactionStatus.filters.select_duration')}
          </div>
          <BaseDropdown
            id="dropdown-basic-select-duration"
            classNameContainer="white-drop"
            hideBorder
            value={selectDuration}
            options={movePaymentSelectDurationDropdownOptions}
            onChange={(event: any) => {
              setSelectDuration(event || '')
            }}
          />
        </div>
      </div>

      <div className="bottom-btn">
        <BaseTextLinkButton
          label={t('common.btns.apply')}
          href={'#javascript'}
          isButton
          onClick={() => {
            props.applyFilter()
          }}
        />
      </div>
    </div>
  )
}

export default LeftFilters
