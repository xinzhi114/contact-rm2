import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { data } from '../../../__mocks__/data/dataComposeEmail'
import { BaseModal } from '../BaseModal'
import './styles.scss'

export interface IMobileBankingApproveModalProps {
  onApproved: () => void
  onClose?: () => void
  flat?: boolean
}

export const MobileBankingApproveModal: React.FunctionComponent<IMobileBankingApproveModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.mobileBankingApproveModal.${key}`)

  const { onApproved, flat, onClose } = props

  const timeoutIds = useRef<number[]>([-1, -1])

  const phoneName = useState<string>(`${data.customerName} iPhone`)[0]
  const [resendNotificationEnabled, setResendNotificationEnabled] = useState<boolean>(false)

  const startNotificationTimeout = useCallback(() => {
    setResendNotificationEnabled(false)
    timeoutIds.current[0] = window.setTimeout(() => {
      setResendNotificationEnabled(true)
      timeoutIds.current[0] = -1
    }, 5000)
  }, [])

  useEffect(() => {
    startNotificationTimeout()
    timeoutIds.current[1] = window.setTimeout(() => {
      onApproved()
      timeoutIds.current[1] = -1
    }, 10000)
  }, [startNotificationTimeout, onApproved])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutIds.current.forEach((timeoutId) => {
        if (timeoutId !== -1) {
          window.clearTimeout(timeoutId)
        }
      })
    }
  }, [])

  return (
    <BaseModal
      primaryText={resendNotificationEnabled ? t('primary') : t('primary_disabled')}
      enablePrimary={resendNotificationEnabled}
      onPrimaryClick={() => startNotificationTimeout()}
      blackClose={!flat}
      title={<>{t('title')}</>}
      className={`mobile-banking-approve-modal ${flat ? 'flat' : ''}`}
      flat={flat}
      onClose={() => onClose && onClose()}
    >
      <div className="image-bg">
        <img
          src="/assets/mobile-banking-approve.svg"
          alt="approve"
          className="mobile-banking-approve"
        />
      </div>
      <div className="message">
        <span className="sending-request">{t('sending_request')}</span>
        <span>{t('approve_on_phone')}</span>
        <span>{t('do_not_refresh')}</span>
      </div>
      <div className="phone-name">
        <span className="label">{t('phone_name')}</span>
        <span className="value">{phoneName}</span>
      </div>
    </BaseModal>
  )
}
