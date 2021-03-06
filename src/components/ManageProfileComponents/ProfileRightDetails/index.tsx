import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextarea } from '../../../components/BaseForm/BaseFormFields/BaseTextarea'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

interface IProfileRightDetailsProps {
  dataList: {
    phoneNumber: string
    workPhoneNumber: string
    emailAddress: string
    tradingAddress: string
    correspondenceAddress: string
  }
  onCloseApproveModal?: any
}

const ProfileRightDetails: React.FunctionComponent<IProfileRightDetailsProps> = (props) => {
  const { t } = useTranslation()

  const [phoneNumber, setPhoneNumber] = useState(props.dataList.phoneNumber)
  const [workPhoneNumber, setWorkPhoneNumber] = useState(props.dataList.workPhoneNumber)
  const [emailAddress, setEmailAddress] = useState(props.dataList.emailAddress)

  const [tradingAddress, setTradingAddress] = useState(props.dataList.tradingAddress)
  const [correspondenceAddress, setCorrespondenceAddress] = useState(
    props.dataList.correspondenceAddress
  )

  const [isShowApproveModalWindow, setIsShowApproveModalWindow] = useState(false)

  const [isShowEditStatus] = useState(true)
  const [isChangedForm, setIsChangedForm] = useState(false)
  const [isCollapsePhone, setIsCollapsePhone] = useState(false)
  const [isCollapseEmail, setIsCollapseEmail] = useState(false)
  const [isCollapseAddress, setIsCollapseAddress] = useState(false)

  const [dataList] = useState(props.dataList)

  const enableSaveUpdate = () => {
    return (
      emailAddress !== '' &&
      formValidationSvc.validateEmail(emailAddress) &&
      tradingAddress !== '' &&
      correspondenceAddress !== ''
    )
  }

  return (
    <div className={`profile-right-details ${isShowEditStatus ? 'update-status' : ''}`}>
      {isShowApproveModalWindow && (
        <MobileBankingApproveModal
          onApproved={() => {
            setIsShowApproveModalWindow(false)
            setIsChangedForm(false)
            props.onCloseApproveModal()
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="top-line-bar flex-grid">
            <div className="left-area">
              <i className="icons icon-contact" />
              <span className="txt">{t('manageProfile.contact_details')}</span>
            </div>
            <div className="right-area">
              {isChangedForm && (
                <div className="tool-btns-top desktop-show mobile-hide">
                  <BaseTextLinkButton
                    label={t('common.btns.cancel')}
                    onClick={() => {
                      setIsChangedForm(false)
                    }}
                  />

                  <BaseTextLinkButton
                    classNameContainer={`${enableSaveUpdate() ? '' : 'disabled'}`}
                    label={t('common.btns.save_update')}
                    href={'#javascript'}
                    isButton
                    onClick={() => {
                      setIsShowApproveModalWindow(true)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="groups-wrap">
            <div className={`row-group ${isCollapsePhone ? '' : 'open'}`}>
              <div className="bold-txt flex-grid">
                {t('manageProfile.phone')}
                <a
                  href="#javascript"
                  className="drop-arrow label-transparent"
                  onClick={() => {
                    setIsCollapsePhone(!isCollapsePhone)
                  }}
                >
                  {t('common.btns.drop_arrow')}
                </a>
              </div>
              <div className="input-row">
                <div className="items">
                  <div className="inner">
                    <div className="label-txt">{t('manageProfile.phone_number')}</div>
                    <BaseTextInput
                      id="phoneNumber"
                      placeholder={t('common.labels.enter_value')}
                      classNameContainer={`have-icon`}
                      pattern="[0-9+ ]{0,15}"
                      value={phoneNumber}
                      onChange={(event) => {
                        setIsChangedForm(true)
                        setPhoneNumber(
                          formValidationSvc.validateInputEnteringPattern(event, phoneNumber)
                        )
                      }}
                    >
                      <span className="icons icon-phone" />
                    </BaseTextInput>
                    <div className="value-txt">{phoneNumber}</div>
                  </div>
                </div>
                <div className="items">
                  <div className="inner">
                    <div className="label-txt">{t('manageProfile.work_phone_number')}</div>
                    <BaseTextInput
                      id="workPhoneNumber"
                      placeholder={t('common.labels.enter_value')}
                      classNameContainer={`have-icon`}
                      pattern="[0-9+ ]{0,15}"
                      value={workPhoneNumber}
                      onChange={(event) => {
                        setIsChangedForm(true)
                        setWorkPhoneNumber(
                          formValidationSvc.validateInputEnteringPattern(event, workPhoneNumber)
                        )
                      }}
                    >
                      <span className="icons icon-work-phone" />
                    </BaseTextInput>
                    <div className="value-txt">{workPhoneNumber}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`row-group ${isCollapseEmail ? '' : 'open'}`}>
              <div className="bold-txt flex-grid">
                {t('manageProfile.email')}
                <a
                  href="#javascript"
                  className="drop-arrow label-transparent"
                  onClick={() => {
                    setIsCollapseEmail(!isCollapseEmail)
                  }}
                >
                  {t('common.btns.drop_arrow')}
                </a>
              </div>
              <div className="input-row">
                <div className="items">
                  <div className="inner">
                    <div className="label-txt">{t('manageProfile.email_address')}</div>
                    <BaseTextInput
                      id="emailAddress"
                      placeholder={t('common.labels.enter_value')}
                      showError={!formValidationSvc.validateEmail(emailAddress)}
                      errorMessageLabel={t('common.labels.wrong_format_email_format')}
                      pattern="[0-9a-zA-Z. @]{0,80}"
                      value={emailAddress}
                      onChange={(event) => {
                        setIsChangedForm(true)
                        setEmailAddress(
                          formValidationSvc.validateInputEnteringPattern(event, emailAddress)
                        )
                      }}
                    >
                      <span className="icons icon-email" />
                    </BaseTextInput>
                    <div className="value-txt">{emailAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`row-group ${isCollapseAddress ? '' : 'open'}`}>
              <div className="bold-txt flex-grid">
                {t('manageProfile.address')}
                <a
                  href="#javascript"
                  className="drop-arrow label-transparent"
                  onClick={() => {
                    setIsCollapseAddress(!isCollapseAddress)
                  }}
                >
                  {t('common.btns.drop_arrow')}
                </a>
              </div>
              <div className="input-row">
                <div className="items">
                  <div className="inner">
                    <div className="label-txt">{t('manageProfile.trading_address')}</div>
                    <div className="textarea-wrap">
                      <BaseTextarea
                        id="tradingAddress"
                        placeholder={t('common.labels.enter_value')}
                        value={tradingAddress}
                        onChange={(event) => {
                          setIsChangedForm(true)
                          setTradingAddress(event.target.value)
                        }}
                      >
                        <span className="icons icon-home" />
                      </BaseTextarea>
                      {tradingAddress !== '' && (
                        <div className="bottom-text">{t('manageProfile.you_should_moved_to')}</div>
                      )}
                    </div>
                    <div className="value-txt">{tradingAddress}</div>
                  </div>
                </div>
                <div className="items">
                  <div className="inner">
                    <div className="label-txt">{t('manageProfile.correspondence_address')}</div>
                    <div className="textarea-wrap">
                      <BaseTextarea
                        id="correspondenceAddress"
                        placeholder={t('common.labels.enter_value')}
                        value={correspondenceAddress}
                        onChange={(event) => {
                          setIsChangedForm(true)
                          setCorrespondenceAddress(event.target.value)
                        }}
                      >
                        <span className="icons icon-home" />
                      </BaseTextarea>
                      {correspondenceAddress !== '' && (
                        <div className="bottom-text">{t('manageProfile.you_should_moved_to')}</div>
                      )}
                    </div>
                    <div className="value-txt">{correspondenceAddress}</div>
                  </div>
                </div>
                <div className="items default-hide">
                  <div className="inner">
                    <div className="label-txt mobile-hide">&nbsp;</div>
                    <div className="gray-border-box">
                      <div className="left-icons">
                        <i className="icons icon-upload" />
                        <div className="right-txt">
                          <div className="top-txt">{t('manageProfile.drop_files_to_upload')}</div>
                          <div className="bottom-txt">
                            or <BaseTextLinkButton label={t('manageProfile.select_file')} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isChangedForm && (
            <div className="tool-btns-bottom desktop-hide mobile-show">
              <BaseTextLinkButton
                classNameContainer={`${enableSaveUpdate() ? '' : 'disabled'}`}
                label={t('common.btns.save_update')}
                href={'#javascript'}
                isButton
                onClick={() => {
                  setIsShowApproveModalWindow(true)
                }}
              />

              <BaseTextLinkButton
                label={t('common.btns.cancel')}
                onClick={() => {
                  setIsChangedForm(false)
                }}
              />
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default ProfileRightDetails
