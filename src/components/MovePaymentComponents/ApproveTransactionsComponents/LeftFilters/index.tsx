import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'
import {
  movePaymentSelectAccountDropdownOptions,
  movePaymentSelectPaymentFileDropdownOptions,
} from '../../../../config'
import './styles.scss'

interface ILeftFiltersProps {
  applyFilter?: any
}

const LeftFilters: React.FunctionComponent<ILeftFiltersProps> = (props) => {
  const { t } = useTranslation()

  const [account, setAccount] = useState('All GBP')
  const [paymentFile, setPaymentFile] = useState('All')

  return (
    <div className="white-panel approve-transactions-left-filter">
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
            value={account}
            options={movePaymentSelectAccountDropdownOptions}
            onChange={(event: any) => {
              setAccount(event || '')
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
            value={paymentFile}
            options={movePaymentSelectPaymentFileDropdownOptions}
            onChange={(event: any) => {
              setPaymentFile(event || '')
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
