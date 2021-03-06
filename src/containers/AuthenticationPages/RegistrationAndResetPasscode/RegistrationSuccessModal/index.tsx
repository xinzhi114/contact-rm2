import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FlexList } from '../../../../components/FlexLayoutComponents/FlexList'
import SuccessModal from '../../../../components/Modals/SuccessModal'
import './styles.scss'
import { RegisterConfirmRsp } from '../../../../common/Api/Domains/rsp/RegistrationRsp'
import { storageService } from '../../../../services/Util'
import { REGISTER_CONFIRM_RSP_LOCAL_KEY } from '../../../../components/AuthenticationComponents/RegisterUserRecoverPasswordFormSteps/RegisterCommon'

export interface IRegistrationSuccessModalProps {
  onClose: () => void
}

export const RegistrationSuccessModal: React.FunctionComponent<IRegistrationSuccessModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.successModal.${key}`)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    storageService.getData<RegisterConfirmRsp>(REGISTER_CONFIRM_RSP_LOCAL_KEY).then((rsp) => {
      setUserId(rsp?.username || 'mock-user-id')
    })
  }, [])

  const { onClose } = props

  return (
    <SuccessModal
      className="registration-success-modal"
      mobileFullScreen
      successText={
        <>
          {t('you_have')} <span className="bold">{t('successfully_registered')}</span>{' '}
          {t('your_odyssey_online_banking_account')}
        </>
      }
      customModalFooterContent={
        <>
          <Button variant="primary" onClick={() => onClose()}>
            {t('continue_and_link_with_mobile_app')}
          </Button>
        </>
      }
      title={t('title')}
      onClose={() => onClose()}
    >
      <FlexList
        items={[
          {
            label: t('user_id'),
            value: userId,
          },
          {
            label: '',
            value: (
              <>
                <span>{t('sms_user_id')}</span>
                <span>{t('copy_user_id')}</span>
              </>
            ),
          },
        ]}
      />
    </SuccessModal>
  )
}
