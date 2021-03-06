import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SuccessModal from '../../../Modals/SuccessModal'
import './styles.scss'

export interface IOnlineBankingSecuredSuccessModalProps {
  onViewAccount: () => void
  onClose: () => void
}

export const OnlineBankingSecuredSuccessModal: React.FunctionComponent<IOnlineBankingSecuredSuccessModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`getMobileApp.onlineBankingSuccessModal.${key}`)

  const { onViewAccount, onClose } = props

  return (
    <SuccessModal
      title={t('title')}
      successText={
        <>
          {t('you_have')} <span className="bold">{t('successfully_linked')}</span>{' '}
          {t('your_mobile_banking')}
        </>
      }
      onClose={() => onClose()}
      customModalFooterContent={
        <Button variant="primary" onClick={() => onViewAccount()}>
          {t('view_my_account')}
        </Button>
      }
    />
  )
}
