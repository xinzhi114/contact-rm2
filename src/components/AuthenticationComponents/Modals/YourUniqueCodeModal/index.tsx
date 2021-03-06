import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../../../Modals/BaseModal'
import './styles.scss'
import {
  OneSpanRegisterRsp,
  RegisterConfirmRsp,
} from '../../../../common/Api/Domains/rsp/RegistrationRsp'
import { storageService } from '../../../../services/Util'
import { REGISTER_CONFIRM_RSP_LOCAL_KEY } from '../../RegisterUserRecoverPasswordFormSteps/RegisterCommon'
import { useIsMounted } from '../../../App/UseIsMounted'
import { ASF } from '../../../../common/Api/Services/ApiServiceFactory'
import { OnespanService } from '../../../../common/Api/Services/OnespanService'
import { showErrorMsg } from '../../../Toast'
import { noop, get } from 'lodash'

const SECONDS_VALID_FOR = 120

export interface IYourUniqueCodeModalProps {
  onClose: () => void
  onSucceed: () => void
}

export const YourUniqueCodeModal: React.FunctionComponent<IYourUniqueCodeModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`getMobileApp.yourUniqueCode.${key}`)

  const { onClose } = props

  const secondsLeftRef = useRef<number>(SECONDS_VALID_FOR)
  const intervalIdRef = useRef<number>(-1)
  const workerHandlerRef = useRef<number>(-1)
  const [secondsLeft, setSecondsLeft] = useState<number>(SECONDS_VALID_FOR)
  const [context, setContext] = useState<RegisterConfirmRsp>()
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [oneSpanRsp, setOneSpanRsp] = useState<OneSpanRegisterRsp>()
  /**
   * clear timer
   */
  const clearInterval = () => {
    if (intervalIdRef.current !== -1) {
      window.clearInterval(intervalIdRef.current)
    }
    intervalIdRef.current = -1
  }

  /**
   * clear worker
   */
  const clearWorker = () => {
    window.clearInterval(workerHandlerRef.current)
  }

  /**
   * setup status worker
   */
  const setupWorker = () => {
    clearWorker()
    if (!context) {
      return
    }
    workerHandlerRef.current = window.setInterval(() => {
      ASF.getService(OnespanService)
        .registrationCheck(context.username)
        .then((rsp) => {
          const status = get(rsp, 'body.activationStatus')
          if (status === 'ACTIVATED') {
            props.onSucceed()
          }
        })
        .catch(noop)
    }, 2000)
  }

  /**
   * setup timer
   */
  const setupTimer = () => {
    clearInterval()
    intervalIdRef.current = window.setInterval(() => {
      if (secondsLeftRef.current > 0) {
        secondsLeftRef.current -= 1
        setSecondsLeft(secondsLeftRef.current)
      } else {
        loadImage()
      }
    }, 1000)
  }

  /**
   * refresh timer
   */
  const handleRefresh = () => {
    secondsLeftRef.current = SECONDS_VALID_FOR
    setSecondsLeft(SECONDS_VALID_FOR)
    setupTimer()
  }

  /**
   * load image
   */
  const loadImage = () => {
    clearWorker()
    clearInterval()

    if (!context) {
      return
    }
    setLoading(true)

    const req = {
      customerUniqueIdentifier: context.customerUniqueIdentifier,
      userId: context.username,
    }
    ASF.getService(OnespanService)
      .registration(req)
      .then((rsp) => {
        setOneSpanRsp(rsp.body)
        handleRefresh()
        setupWorker()
      })
      .catch((e) => showErrorMsg(e))
      .finally(() => {
        if (isMounted.current) {
          setLoading(false)
        }
      })
  }

  /**
   * component init
   */
  const init = () => {
    storageService.getData<RegisterConfirmRsp>(REGISTER_CONFIRM_RSP_LOCAL_KEY).then((rsp) => {
      setContext(rsp)
    })
    return () => {
      clearWorker()
      clearInterval()
    }
  }
  useEffect(init, [])

  /**
   * load image when context available
   */
  useEffect(loadImage, [context])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft - minutes * 60

  const renderTimerAndImage = () => {
    if (!oneSpanRsp) {
      return <div>{_t('error.request_failed')}</div>
    }
    return (
      <React.Fragment>
        <span>
          {t('valid_for')} <span className="bold">{minutes}</span> {t('mins')} :{' '}
          <span className="bold">{seconds}</span> {t('secs')}
        </span>
        <img
          src={`data:image/png;base64, ${oneSpanRsp.crontoCodeResponse.image}`}
          alt="unique code"
          className="unique-code"
        />
      </React.Fragment>
    )
  }
  return (
    <BaseModal
      className="your-unique-code-modal"
      blackClose
      ignoreCloseOnAction
      onClose={() => onClose()}
      onPrimaryClick={loadImage}
      enablePrimary={!loading}
      primaryText={_t('common.btns.refresh')}
      title={<>{t('title')}</>}
    >
      <span>
        {t('scan_this_cronto_code')} <span className="bold">{t('odyssey_mobile_banking')}</span>
      </span>
      {loading ? <div>{_t('common.loading')}</div> : renderTimerAndImage()}
    </BaseModal>
  )
}
