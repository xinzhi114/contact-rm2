import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { WarningModal } from '../WarningModal'
import './styles.scss'

export interface IDeclinedTermsAndConditionsModalProps {
  onClose: (action: 'view-terms' | 'contact-support' | 'none') => void
}

export const DeclinedTermsAndConditionsModal: React.FunctionComponent<IDeclinedTermsAndConditionsModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.declinedTermsAndConditions.${key}`)

  const { onClose } = props

  return (
    <WarningModal
      className="declined-terms-and-conditions-modal"
      title={<>{t('title')}</>}
      onClose={() => onClose('none')}
      footerContent={
        <>
          <Button variant="link" onClick={() => onClose('view-terms')}>
            {t('view_terms_and_conditions')}
          </Button>
          <Button variant="primary" onClick={() => onClose('contact-support')}>
            {t('contact_customer_support')}
          </Button>
        </>
      }
    >
      <img src="/assets/terms.png" alt="terms and conditions" />
      <span className="bold">{t('message_bold')}</span>
      <span>{t('message')}</span>
    </WarningModal>
  )
}
