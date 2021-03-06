import React, { useState } from 'react'
import { BaseTextarea } from '../../../components/BaseForm/BaseFormFields/BaseTextarea'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { useTranslation } from 'react-i18next'
import { Appointment } from '../../../domain/Appointment'
import './styles.scss'

interface ICancelAppointmentModalWindowProps {
  data: Appointment | null
  onClose?: any
  onCancelAppointment?: any
}

const CancelAppointmentModalWindow: React.FunctionComponent<ICancelAppointmentModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.appointmentTab.${key}`)

  const [reasonValue, setReasonValue] = useState('')

  const { data } = { ...props }

  return (
    <div className="modal-default cancel-appointment-modal">
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
          <span className="icon-info" />
          <div className="blue-title">{t('cancel_appointment')}</div>
        </div>

        {!!data && (
          <div className="modal-info">
            <div className="bottom-data">
              <div className="description-title">
                {t('are_you_sure_you_want_to_cancel_appointment')}
              </div>
            </div>
            <div className="bottom-data">
              <div className="blue-title">{t('appointment_details')}</div>
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
              </div>
              <div className="group width-46">
                <div className="top-label">{t('meeting_mode')}</div>
                <div className="values">
                  {data.preferredModeOfMeeting} ({data.meetingMode})
                </div>
              </div>
              <div className="group width-27">
                <div className="top-label">{t('status')}</div>
                <div className="values red-txt">{data.status}</div>
              </div>
            </div>

            <div className="bottom-data textarea">
              <div className="blue-title">{t('reasons_for_cancellation')}</div>
              <div className="smaller-description-title">{t('optional')}</div>
            </div>
            <div className="bottom-data">
              <BaseTextarea
                id="reasonInput"
                maxlength={200}
                value={reasonValue}
                onChange={(event) => {
                  setReasonValue(event.target.value)
                }}
              />
            </div>
          </div>
        )}

        <div className="bottom-btns center">
          <BaseTextLinkButton
            label={_t('common.btns.cancel_appointment')}
            href={'#javascript'}
            isButton
            onClick={(event: any) => {
              props.onCancelAppointment()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CancelAppointmentModalWindow
