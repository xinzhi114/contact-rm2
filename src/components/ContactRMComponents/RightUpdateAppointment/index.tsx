import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CancelAppointmentModalWindow from '../CancelAppointmentModalWindow'
import SuccessUpdateAppointmentModalWindow from '../SuccessUpdateAppointmentModalWindow'
import GeneralGrayConfirmModalWindow from '../../../components/GeneralGrayConfirmModalWindow'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { Appointment } from '../../../domain/Appointment'
import './styles.scss'

interface IRightUpdateAppointmentProps {
  relationshipManagerName: string
  dataList: Appointment | null
  confirmCancelledAppointment: () => void
  confirmDeleteAppointment: () => void
  confirmAcceptAppointment: () => void
  goBack: () => void
}

const RightUpdateAppointment: React.FunctionComponent<IRightUpdateAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.appointmentTab.${key}`)

  const [isShowCancelConfirmModalWindow, setIsShowCancelConfirmModalWindow] = useState(false)
  const [isShowCancelledModalWindow, setIsShowCancelledModalWindow] = useState(false)
  const [isShowUpdateConfirmModalWindow, setIsShowUpdateConfirmModalWindow] = useState(false)
  const [isShowDeleteConfirmModalWindow, setIsShowDeleteConfirmModalWindow] = useState(false)
  const [isShowAcceptConfirmModalWindow, setIsShowAcceptConfirmModalWindow] = useState(false)

  const [cancelledAppointmentRef, setCancelledAppointmentRef] = useState('')
  const [cancelledDateOfAppointment, setCancelledDateOfAppointment] = useState('')

  const { relationshipManagerName, dataList } = { ...props }

  return (
    <React.Fragment>
      {isShowCancelConfirmModalWindow && (
        <CancelAppointmentModalWindow
          data={dataList}
          onClose={() => {
            setIsShowCancelConfirmModalWindow(false)
          }}
          onCancelAppointment={() => {
            setIsShowCancelConfirmModalWindow(false)
            setIsShowCancelledModalWindow(true)
          }}
        />
      )}

      {isShowCancelledModalWindow && !!dataList && (
        <GeneralConfirmModalWindow
          titleText={t('cancel_appointment')}
          messageText={`${_t(
            'contactRM.appointmentTab.your_appointment_with_reference_no_is_cancelled_successfully',
            {
              appointmentRef: cancelledAppointmentRef,
              dateOfAppointment: cancelledDateOfAppointment.split(', ')[1],
            }
          )}`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            setIsShowCancelledModalWindow(false)
            props.confirmCancelledAppointment()
          }}
        />
      )}

      {isShowUpdateConfirmModalWindow && (
        <SuccessUpdateAppointmentModalWindow
          relationshipManagerName={relationshipManagerName}
          data={dataList}
          onClose={() => {
            setIsShowUpdateConfirmModalWindow(false)
          }}
          onComplete={() => {
            setIsShowUpdateConfirmModalWindow(false)
          }}
        />
      )}

      {isShowDeleteConfirmModalWindow && (
        <GeneralGrayConfirmModalWindow
          titleText={t('delete_appointment')}
          messageText={`${t('are_you_sure_to_delete')}`}
          confirmBtnText={_t('common.btns.delete')}
          onClose={() => {
            setIsShowDeleteConfirmModalWindow(false)
          }}
          onConfirm={() => {
            props.confirmDeleteAppointment()
          }}
        />
      )}

      {isShowAcceptConfirmModalWindow && (
        <GeneralGrayConfirmModalWindow
          titleText={t('accept_appointment')}
          messageText={`${t('are_you_sure_to_accept')}`}
          confirmBtnText={_t('common.btns.accept')}
          onClose={() => {
            setIsShowAcceptConfirmModalWindow(false)
          }}
          onConfirm={() => {
            props.confirmAcceptAppointment()
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="update-appointment">
            <div className="line-title flex-grid">
              <div className="lefts flex">
                <a
                  href="#javascript"
                  className="icons icon-back label-transparent"
                  onClick={() => props.goBack()}
                >
                  {_t('common.btns.back')}
                </a>
                <span className="title">{t('update_appointment')}</span>
              </div>
              <div className="rights">
                {dataList.status === 'Pending confirmation' && (
                  <BaseTextLinkButton
                    classNameContainer={`red-links`}
                    label={t('cancel_appointment')}
                    onClick={() => {
                      setCancelledAppointmentRef(dataList.appointmentRef)
                      setCancelledDateOfAppointment(dataList.dateOfAppointment)
                      setIsShowCancelConfirmModalWindow(true)
                    }}
                  />
                )}

                {dataList.status === 'RM Propose new time' && (
                  <BaseTextLinkButton
                    classNameContainer={`red-links`}
                    label={t('accept_appointment')}
                    onClick={() => {
                      setIsShowAcceptConfirmModalWindow(true)
                    }}
                  />
                )}

                {dataList.status === 'Rejected' && (
                  <BaseTextLinkButton
                    classNameContainer={`red-links`}
                    label={t('delete_appointment')}
                    onClick={() => {
                      setIsShowDeleteConfirmModalWindow(true)
                    }}
                  />
                )}

                <BaseTextLinkButton
                  label={t('update_appointment')}
                  isButton
                  onClick={() => {
                    setIsShowUpdateConfirmModalWindow(true)
                  }}
                />
              </div>
            </div>
            <div className="update-list">
              <div className="border-boxs flex-grid">
                <div className="lefts flex">
                  <span className="color-point">3</span>
                  <div className="right-txt">
                    <div className="titles">{t('meeting_mode')}</div>
                    <div className="three-area">
                      <div className="items">
                        <div className="label-txt">{t('preferred_mode_of_meeting')}</div>
                        <div className="values">{dataList.preferredModeOfMeeting}</div>
                      </div>
                      <div className="items">
                        <div className="label-txt">{t('virtual_meeting_mode')}</div>
                        <div className="values">{dataList.meetingMode}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#javascript" className="icons btn-edit label-transparent">
                  {_t('common.btns.edit')}
                </a>
              </div>
              <div className="border-boxs flex-grid">
                <div className="lefts flex">
                  <span className="color-point">2</span>
                  <div className="right-txt">
                    <div className="titles">{t('date_and_time')}</div>
                    <div className="three-area">
                      <div className="items">
                        <div className="label-txt">{t('appointment_date')}</div>
                        <div className="values">{dataList.dateOfAppointment}</div>
                      </div>
                      <div className="items">
                        <div className="label-txt">{t('appointment_time')}</div>
                        <div className="values">{dataList.timeOfAppointment}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#javascript" className="icons btn-edit label-transparent">
                  {_t('common.btns.edit')}
                </a>
              </div>
              <div className="border-boxs flex-grid">
                <div className="lefts flex">
                  <span className="color-point">1</span>
                  <div className="right-txt">
                    <div className="titles">{t('subject')}</div>
                    <div className="three-area">
                      <div className="items">
                        <div className="label-txt">{t('subject')}</div>
                        <div className="values">{dataList.subject}</div>
                      </div>
                      <div className="items">
                        <div className="label-txt">{t('description')}</div>
                        <div className="values">{dataList.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#javascript" className="icons btn-edit label-transparent">
                  {_t('common.btns.edit')}
                </a>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default RightUpdateAppointment
