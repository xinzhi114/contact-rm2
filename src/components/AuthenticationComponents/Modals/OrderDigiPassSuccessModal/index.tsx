import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SuccessModal from '../../../Modals/SuccessModal'
import './styles.scss'

export interface IOrderDigiPassSuccessModalProps {
  onClose: () => void
}

export const OrderDigiPassSuccessModal: React.FunctionComponent<IOrderDigiPassSuccessModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`getMobileApp.orderDigiPassSuccessModal.${key}`)

  const { onClose } = props

  return (
    <SuccessModal
      title={t('title')}
      onClose={() => onClose()}
      successText={
        <>
          {t('you_have')} <span className="bold">{t('successfully_ordered')}</span>{' '}
          {t('your_digi_pass')}
        </>
      }
      customModalFooterContent={
        <Button variant="primary" onClick={() => onClose()}>
          {_t('common.btns.confirm')}
        </Button>
      }
    />
  )
}
