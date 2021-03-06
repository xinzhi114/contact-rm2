import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'
import './styles.scss'

interface ILeftFiltersProps {
  selectAccountData: {
    title: string
    subTitle: string
  }[]
  helpAndSupportData: {
    expanded?: boolean
    title: string
    description: string
  }[]
  applyFilter?: any
}

const LeftFilters: React.FunctionComponent<ILeftFiltersProps> = (props) => {
  const { t } = useTranslation()

  const [frequency, setFrequency] = useState('Select')

  const [selectAccountData] = useState(props.selectAccountData)
  const [helpAndSupportData, setHelpAndSupportData] = useState(props.helpAndSupportData)

  const clickExpand = (index: number) => {
    helpAndSupportData[index].expanded = !helpAndSupportData[index].expanded

    setHelpAndSupportData(helpAndSupportData)
  }

  return (
    <div className="white-panel manage-payment-template-left-filter">
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
        <div className="line" />
        <div className="help-and-support">
          <div className="top-title">
            <i className="icons icon-help" />
            <span className="bold-txt">
              {t('movePaymentManagePaymentTemplate.help_and_support')}
            </span>
          </div>
          <div className="group-wrap">
            {helpAndSupportData.map((item, index) => (
              <div className={`expend-items ${item.expanded ? 'open' : ''}`} key={index}>
                <a
                  href="#javascript"
                  className="title-bar flex-grid"
                  onClick={() => {
                    clickExpand(index)
                  }}
                >
                  <span className="title">{item.title}</span>
                  <span className="icons icon-arrow" />
                </a>
                <div className="expend-body">
                  <p className="txt">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftFilters
