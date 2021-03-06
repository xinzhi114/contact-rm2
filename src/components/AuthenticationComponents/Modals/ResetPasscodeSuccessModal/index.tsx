import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SuccessModal from '../../../Modals/SuccessModal'
import './styles.scss'

export const ResetPasscodeSuccessModal: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.successModal.${key}`)

  const history = useHistory()

  const onClose = () => {
    history.push('/')
  }

  return (
    <SuccessModal
      className="reset-passcode-success-modal"
      mobileFullScreen
      successText={
        <>
          {t('you_have')} <span className="bold">{t('successfully_reset')}</span>{' '}
          {t('your_password')}
        </>
      }
      customModalFooterContent={
        <>
          <Button variant="primary" onClick={() => onClose()}>
            {t('login')}
          </Button>
        </>
      }
      title={t('title_reset_passcode')}
      onClose={() => onClose()}
    />
  )
}
