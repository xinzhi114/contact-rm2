import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../../store/actions/dataAction'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

interface IProfileRightOTPProps {
  opt?: {
    dataList: {
      optValue: string
    }
  }
  onConfirm?: any
  onCancel?: any
  dataAction?: any
}

const ProfileRightOTP: React.FunctionComponent<IProfileRightOTPProps> = (props) => {
  const { t } = useTranslation()

  const [opt, setOtp] = useState('')
  const [showOPTError, setShowOPTError] = useState(false)

  const clickConfirm = () => {
    if (opt === (props.opt !== undefined ? props.opt.dataList.optValue : '')) {
      setShowOPTError(false)
      props.onConfirm()
    } else {
      setShowOPTError(true)
    }
  }

  useEffect(() => {
    props.dataAction.getOPTData()
  }, [props.dataAction])

  return (
    <div className="profile-right-otp">
      <React.Fragment>
        <div className="top-line-bar flex-grid">
          <div className="left-area">
            <img src="../assets/auth-blue.svg" alt="img" />
            <span className="txt">{t('manageProfile.authenticate_using_one_time_passcode')}</span>
          </div>
        </div>

        <div className="otp-container">
          <p className="p-txt">
            {t('manageProfile.an_otp_has_sent')} *1542. {t('manageProfile.enter_the_code_below')}
          </p>
          <div className="control-bar">
            <div className="group">
              <div className="labels">OTP</div>
              <div className="input-otp">
                <BaseTextInput
                  id="opt"
                  classNameContainer={`otp-inputs ${opt === '' ? '' : 'focused'}`}
                  showError={showOPTError}
                  errorMessageLabel={''}
                  placeholder={'------'}
                  value={opt}
                  pattern="[0-9]{0,8}"
                  onChange={(event) => {
                    setShowOPTError(false)
                    setOtp(formValidationSvc.validateInputEnteringPattern(event, opt))
                  }}
                >
                  <span className="icons icon-home" />
                </BaseTextInput>
                <div
                  className="bottom-input"
                  dangerouslySetInnerHTML={{
                    __html: t('manageProfile.otp_will_expire_in_30_seconds'),
                  }}
                />
              </div>
            </div>
            <div className="group">
              <BaseTextLinkButton
                label={t('manageProfile.resend_otp_in 25_seconds')}
                href={'#javascript'}
              />
            </div>
          </div>
        </div>

        <div className="tool-btns">
          <BaseTextLinkButton
            classNameContainer={`${opt.length !== 6 ? 'disabled' : ''}`}
            label={t('common.btns.confirm')}
            href={'#javascript'}
            isButton
            onClick={() => {
              clickConfirm()
            }}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
            href={'#javascript'}
            onClick={() => {
              props.onCancel()
            }}
          />
        </div>
      </React.Fragment>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(ProfileRightOTP)
