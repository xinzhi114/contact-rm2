import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { WarningModal } from '../WarningModal'

export interface IAccountLockedModalProps {
  onClose: () => void
}

export const AccountLockedModal: React.FunctionComponent<IAccountLockedModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.accountLocked.${key}`)

  const history = useHistory()

  const { onClose } = props

  return (
    <WarningModal
      title={<>{t('title')}</>}
      onClose={() => onClose()}
      footerContent={
        <>
          <Button variant="secondary" onClick={() => onClose()}>
            {t('wait_for_24_hours')}
          </Button>
          <Button variant="primary" onClick={() => history.push('/accountLocked')}>
            {t('unlock_account')}
          </Button>
        </>
      }
    >
      <img src="/assets/profile.svg" alt="account locked" />
      <span className="bold">{t('message_bold')}</span>
      <span>{t('message')}</span>
    </WarningModal>
  )
}
