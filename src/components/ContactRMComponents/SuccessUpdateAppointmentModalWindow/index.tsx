import React from 'react'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { useTranslation } from 'react-i18next'
import { Appointment } from '../../../domain/Appointment'
import './styles.scss'

interface ISuccessUpdateAppointmentModalWindowProps {
  relationshipManagerName: string
  data: Appointment | null
  onClose?: any
  onComplete?: any
}

const SuccessUpdateAppointmentModalWindow: React.FunctionComponent<ISuccessUpdateAppointmentModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.appointmentTab.${key}`)

  const { relationshipManagerName, data } = { ...props }

  return (
    <div className="modal-default success-update-appointment-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          &nbsp;
        </a>
        <div className="title-area">
          <div className="blue-title">{t('update_appointment_complete')}</div>
        </div>

        {!!data && (
          <div className="modal-info">
            <div className="row-line">
              <div className="center-info">
                <div className="icons done-icons">
                  <img src="/assets/Illustrations-confirm.svg" alt="svg" />
                </div>
                <div className="white-txt">
                  {t('your_appointment_successfully_updated_to_your_rm')}&nbsp;
                  <strong>{relationshipManagerName}</strong>.
                </div>
              </div>
            </div>
            <div className="bottom-data">
              <div className="group width-27">
                <div className="top-label">{t('appointment_ref')}</div>
                <div className="values">#{data.appointmentRef}</div>
              </div>
              <div className="group width-46">
                <div className="top-label">{t('date_of_appointment')}</div>
                <div className="values">{data.dateOfAppointment}</div>
              </div>
              <div className="group width-27">
                <div className="top-label">{t('subject')}</div>
                <div className="values">{data.subject}</div>
              </div>
              <div className="group width-27">
                <div className="top-label">{t('time_of_appointment')}</div>
                <div className="values">{data.timeOfAppointment}</div>
                <div className="values">{data.timeOfAppointmentDuration}</div>
              </div>
              <div className="group width-46">
                <div className="top-label">{t('meeting_mode')}</div>
                <div className="values">
                  {data.preferredModeOfMeeting} ({data.meetingMode})
                </div>
              </div>
            </div>
            <div className="info-area">
              <div className="center-info">
                <i className="info-icons" />
                <div className="white-txt">{t('you_would_get_a_confirmation_email_once')}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bottom-btns center">
          <BaseTextLinkButton
            label={_t('common.btns.save_to_calendar')}
            href={'#javascript'}
            onClick={(event: any) => {
              props.onClose()
              event.preventDefault()
            }}
          />

          <BaseTextLinkButton
            label={_t('common.btns.complete')}
            href={'#javascript'}
            isButton
            onClick={(event: any) => {
              props.onComplete()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SuccessUpdateAppointmentModalWindow
