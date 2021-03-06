import React from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FlexDialog } from '../../../FlexLayoutComponents/FlexDialog'
import './styles.scss'

export const SpamWarning: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.scamWarning.${key}`)

  return (
    <FlexDialog>
      <Modal.Body className="spam-warning">
        <div className="header-section">
          <img src="/assets/scam.svg" alt="scam alert" />
          <div className="header-label">{t('scam_alert')}</div>
        </div>
        <div className="message-section">
          <p>{t('message')}</p>
        </div>
      </Modal.Body>
    </FlexDialog>
  )
}
