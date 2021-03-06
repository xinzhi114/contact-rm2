import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export interface IImportantInformationNotificationModalProps {
  onOpen: () => void
  onClose: () => void
  showNormalDesktop?: boolean
}

export const ImportantInformationNotificationModal: React.FunctionComponent<IImportantInformationNotificationModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) =>
    _t(`movePaymentManagePayees.importantInformationNotificationModal.${key}`)

  const { onOpen, onClose, showNormalDesktop } = props

  return (
    <div
      className={`important-information-notification-modal ${
        showNormalDesktop ? 'normal-desktop' : ''
      }`}
    >
      <Modal.Header>
        <Modal.Title>
          <div className="modal-title-text">
            <span>
              <img src="/assets/alert-circle.svg" alt="alert" className="alert-circle" />{' '}
              {t('title')}
            </span>
            <button aria-label="button" className="btn btn-close" onClick={() => onClose()} />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('message')}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onOpen()}>
          {t('primary')}
        </Button>
      </Modal.Footer>
    </div>
  )
}
