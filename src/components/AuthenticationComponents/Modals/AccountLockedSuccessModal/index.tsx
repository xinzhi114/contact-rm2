import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SuccessModal from '../../../Modals/SuccessModal'
import './styles.scss'

export const AccountLockedSuccessModal: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.successModal.${key}`)

  const history = useHistory()

  const onClose = () => {
    history.push('/')
  }

  return (
    <SuccessModal
      className="account-locked-success-modal"
      successText={
        <>
          {t('you_have')} <span className="bold">{t('successfully_unlocked_your_account')}</span>{' '}
          {t('you_can_continue_to_login')}
        </>
      }
      customModalFooterContent={
        <>
          <Button variant="primary" onClick={() => onClose()}>
            {_t('common.btns.continue')}
          </Button>
        </>
      }
      title={t('title_unlock_account_successfully')}
      onClose={() => onClose()}
    />
  )
}
