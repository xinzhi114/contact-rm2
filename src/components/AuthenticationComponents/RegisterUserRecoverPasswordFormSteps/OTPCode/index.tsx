import React, { useEffect, useState } from 'react'
import { IRegisterUserRecoverPasswordFormStepsEnum } from '../../../../config/registerUserRecoverPassword'
import {
  OTPCodeFormValue,
  RegisterUserRecoverPasswordFormValue,
} from '../../../../constants/reviewableForm/registerUserRecoverPassword'
import { ReviewFormStepComponent } from '../../../../constants/reviewableForm/reviewableForm'
import { OTPModal } from '../../../Modals/OTPModal'
import './styles.scss'
import { RegisterRsp } from '../../../../common/Api/Domains/rsp/RegistrationRsp'
import { storageService } from '../../../../services/Util'
import { REGISTER_OTP_RSP_LOCAL_KEY, REGISTER_RSP_LOCAL_KEY } from '../RegisterCommon'
import { showErrorMsg } from '../../../Toast'
import { ASF } from '../../../../common/Api/Services/ApiServiceFactory'
import { CustomerRegistrationService } from '../../../../common/Api/Services/CustomerRegistrationService'
import { RegisterOTPEvaluateReq } from '../../../../common/Api/Domains/req/RegistrationReq'
import { useIsMounted } from '../../../App/UseIsMounted'

export const OTPCode: ReviewFormStepComponent<
  OTPCodeFormValue,
  RegisterUserRecoverPasswordFormValue,
  IRegisterUserRecoverPasswordFormStepsEnum
> = (props) => {
  const { formValue, onChange, formStepsEnum, onEditClick } = props
  const [context, setContext] = useState<RegisterRsp>()
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  /**
   * load context from local
   */
  useEffect(() => {
    storageService.getData<RegisterRsp>(REGISTER_RSP_LOCAL_KEY).then((rsp) => {
      setContext(rsp)
    })
  }, [])

  /**
   * on submit
   */
  const onSubmit = () => {
    if (!context) {
      onEditClick(formStepsEnum.SECURITY_QUESTIONS)
      return
    }

    setLoading(true)
    const req: RegisterOTPEvaluateReq = {
      otp: formValue.otp,
      tempUUID: context.tempToken,
      otpUUID: context.otpUUID,
    }
    ASF.getService(CustomerRegistrationService)
      .evaluate(req)
      .then((rsp) => {
        if (isMounted.current) {
          storageService.storeData(REGISTER_OTP_RSP_LOCAL_KEY, rsp.body).then(() => {
            onEditClick(formStepsEnum.SECURITY_QUESTIONS)
          })
        }
      })
      .catch((e) => showErrorMsg(e))
      .finally(() => {
        if (isMounted.current) {
          setLoading(false)
        }
      })
  }
  return (
    <div className="otp-code-step">
      <OTPModal
        otp={formValue.otp}
        onChange={(newValue) => onChange({ otp: newValue })}
        onContinue={onSubmit}
        loading={loading}
        flat
      />
    </div>
  )
}
