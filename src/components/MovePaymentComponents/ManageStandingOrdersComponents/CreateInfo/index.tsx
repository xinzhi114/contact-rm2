import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

const CreateInfo: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <div className="manage-standing-orders-create-info">
      <div className="gray-inner">
        <div className="title">
          <i className="icons icon-info" />
          {t('movePaymentManageStandingOrders.important_information')}
        </div>
        <p className="txt">
          {t('movePaymentManageStandingOrders.important_information_description')}
        </p>
      </div>
    </div>
  )
}

export default CreateInfo
