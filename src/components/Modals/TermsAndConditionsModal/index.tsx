import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../BaseModal'
import './styles.scss'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'
import { CustomerRegistrationService } from '../../../common/Api/Services/CustomerRegistrationService'
import { CHANNEL_WEB } from '../../../common/Api/config'
import { showErrorMsg } from '../../Toast'
import { TNCRsp } from '../../../common/Api/Domains/rsp/RegistrationRsp'
import { useIsMounted } from '../../App/UseIsMounted'
import { Base64Util } from '../../../common/Api/Services/UtilService'

export interface ITermsAndConditionsModalProps {
  onClose: (agree?: boolean, tnc?: TNCRsp) => void
}

export const TermsAndConditionsModal: React.FunctionComponent<ITermsAndConditionsModalProps> = (
  props
) => {
  const { onClose } = props
  const [loading, setLoading] = useState(false)
  const [tnc, setTNC] = useState<TNCRsp>()
  const [terms, setTerms] = useState('')
  const isMounted = useIsMounted()

  const fetchTNC = () => {
    setLoading(true)
    ASF.getService(CustomerRegistrationService)
      .getTNC({ channelCode: CHANNEL_WEB })
      .then((rsp) => {
        if (isMounted.current) {
          setLoading(false)
          setTNC(rsp.body)
          setTerms(Base64Util.decode64(rsp.body.termsAndConditions))
        }
      })
      .catch((e) => showErrorMsg(e))
  }

  useEffect(fetchTNC, [])

  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.termsAndConditionsModal.${key}`)

  return (
    <BaseModal
      className="terms-and-conditions-modal"
      blackClose
      title={<>{t('title')}</>}
      onClose={() => onClose()}
      customModalFooterContent={
        <>
          <Button disabled={loading} variant="primary" onClick={() => onClose(false)}>
            {t('disagree')}
          </Button>
          <Button disabled={loading} variant="primary" onClick={() => onClose(true, tnc)}>
            {t('agree')}
          </Button>
        </>
      }
    >
      <div className="disclaimer">{t('disclaimer')}</div>
      {loading ? (
        <div className="terms-wrapper">{_t('common.loading')}</div>
      ) : (
        <div className="terms-wrapper" dangerouslySetInnerHTML={{ __html: terms }} />
      )}
    </BaseModal>
  )
}
