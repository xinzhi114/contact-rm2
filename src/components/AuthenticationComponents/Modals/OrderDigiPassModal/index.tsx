import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../../../Modals/BaseModal'
import './styles.scss'

export interface IOrderDigiPassModalProps {
  alreadyOrdered: boolean
  onClose: () => void
  onOrderDigiPass: () => void
}

export const OrderDigiPassModal: React.FunctionComponent<IOrderDigiPassModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`getMobileApp.orderDigiPass.${key}`)

  const { alreadyOrdered, onClose, onOrderDigiPass } = props

  return (
    <BaseModal
      className={`order-digi-pass-modal ${alreadyOrdered ? 'already-ordered' : ''}`}
      title={<>{t('title')}</>}
      blackClose
      onClose={() => onClose()}
      customModalFooterContent={
        <>
          <Button variant="secondary">{t('download_mobile_banking')}</Button>
          <Button variant="primary" onClick={() => !alreadyOrdered && onOrderDigiPass()}>
            {t(alreadyOrdered ? 'contact_customer_service' : 'order_digi_pass')}
          </Button>
        </>
      }
    >
      <img src="/assets/digipass.svg" alt="DigiPass" className="digi-pass" />
      <span className="bold">
        {t(alreadyOrdered ? 'you_have_ordered_digi_pass' : 'you_have_no_digi_pass_and_legible')}
      </span>
      {(alreadyOrdered
        ? ['your_digi_pass_request_already_exists', 'if_longer_than_5_days']
        : ['once_you_submit']
      ).map((text, index) => (
        <span key={index}>{t(text)}</span>
      ))}
    </BaseModal>
  )
}
