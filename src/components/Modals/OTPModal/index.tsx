import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IAppState } from '../../../store/constants'
import BaseForm from '../../BaseForm'
import { BaseModal } from '../BaseModal'
import './styles.scss'

export interface IOTPModalProps {
  otp: string
  onChange: (newOtp: string) => void
  onContinue: () => void
  loading?: boolean
  flat?: boolean
}

export const OTPModal: React.FunctionComponent<IOTPModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`authOPT.${key}`)

  const { otp, onChange, onContinue, flat } = props

  const loading =
    (useSelector<IAppState>((state) => state.auth.loading) as boolean | null) || props.loading

  const phoneNumber = '*9212'

  return (
    <BaseModal
      className="otp-modal"
      blackClose={!flat}
      title={<>{t('authenticate_using_one_time_passcode')}</>}
      customModalFooterContent={
        <Button
          variant="primary"
          disabled={otp.length < 6 || !!loading}
          onClick={() => onContinue()}
        >
          {loading ? _t('common.loading') : _t('common.btns.continue')}
        </Button>
      }
      flat={flat}
    >
      {t('a_one_time_code_has_been_sent')} {phoneNumber}. {t('enter_the_code_below')}
      <BaseForm
        fields={{
          otp: {
            type: 'text',
            value: otp,
            pattern: '^[0-9]{0,6}$',
            placeholder: '------',
            onChange: (event) =>
              onChange((event as React.ChangeEvent<HTMLInputElement>).target.value),
            formatAs: 'otp',
            label: t('otp'),
            showHelp: false,
          },
        }}
      />
    </BaseModal>
  )
}
