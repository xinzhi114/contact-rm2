import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../../../Modals/BaseModal'
import './styles.scss'

export interface IRequestErrorModalWindowProps {
  onCustomerService: () => void
  onClose: () => void
}

const RequestErrorModalWindow: React.FunctionComponent<IRequestErrorModalWindowProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.quickActions.${key}`)

  const { onCustomerService, onClose } = props

  return (
    <BaseModal
      primaryText={t('customer_service')}
      onPrimaryClick={() => onCustomerService()}
      blackClose
      title={<>{t('error')}</>}
      onClose={() => onClose()}
      className="request-error-modal"
      mobileFullScreen="simple-navbar"
      ignoreCloseOnAction
    >
      <div className="error-area">
        <div className="error-icon" />
        <span dangerouslySetInnerHTML={{ __html: t('your_request_cannot_be_processed') }} />
      </div>
    </BaseModal>
  )
}

export default RequestErrorModalWindow
