import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import SubjectStep from '../SubjectStep';
import { IBookAppointmentProps, SetEditableHandleTypes } from '../../../constants/appointment';
import { IDisabledDateAndTime } from '../../../domain/Appointment'
import DateAndTimeStep from '../DateAndTimeStep';
import MeetingModeStep from '../MeetingModeStep';
import './styles.scss'

interface IRightBookAppointmentProps {
  disabledDateAndTime: IDisabledDateAndTime[]
}

const RightBookAppointment: React.FunctionComponent<IRightBookAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.${ key }` )
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState<'subject' | 'date_and_time' | 'meeting_mode'>(
    'subject'
  )
  const [isShowDateTimeStep, setIsShowDateTimeStep] = useState(false)
  const [isShowMeetingModeStep, setIsShowMeetingModeStep] = useState(false)
  const SubjectRef = useRef<SetEditableHandleTypes>(null)
  const DateTimeRef = useRef<SetEditableHandleTypes>(null)
  const MeetingModeRef = useRef<SetEditableHandleTypes>(null)
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>( true )
  const [formValue, setFormValue] = useState<IBookAppointmentProps>({
    subject: '111111',
    description: 'dsadasdasdasdas',
    attachedFiles: [],
    date: new Date(),
    time_slots: [],
    meeting_mode: 'virtual_metting',
    meeting_way: 'phone_call',
    meeting_address: ''
  })

  const { disabledDateAndTime } = props

  const goBack = () => {
    history.goBack()
  }

  const handleContinueClick = () => {
    switch(currentStep) {
      case 'subject':
        SubjectRef.current?.setEditable(false)
        setIsShowDateTimeStep(true)
        break;
      case 'date_and_time':
        DateTimeRef.current?.setEditable(false)
        setIsShowMeetingModeStep(true)
        break;
      case 'meeting_mode':
        MeetingModeRef.current?.setEditable(false)
        break;
      default:
        break;
    }
    setCurrentStep(currentStep === 'subject' ? 'date_and_time' : 'meeting_mode' )
    setIsContinueDisabled(true)
  }

  useEffect( () => {
    const { subject, description, date, time_slots, meeting_mode, meeting_way, meeting_address } = formValue
    switch(currentStep) {
      case 'subject':
        if (subject && description) {
          setIsContinueDisabled(false)
        }
        break;
      case 'date_and_time':
        if (date && time_slots.length) {
          setIsContinueDisabled(false)
        } else {
          setIsContinueDisabled(true)
        }
        break;
      case 'meeting_mode':
        if (meeting_mode && meeting_way && meeting_address)  {
          setIsContinueDisabled(false)
        }
        break;
      default:
        setIsContinueDisabled(true)
        break;
    }
    console.log(formValue, 'formValue');
  }, [formValue] )

  return (
    <div className="contact-rm-right-appointment ">
      <div className="appointment-module">
        <React.Fragment>
          <div className="book-appointment">
            <div className="line-title flex-grid">
              <div className="lefts flex">
                <a
                  href="#javascript"
                  className="icons icon-back label-transparent"
                  onClick={ () => goBack() }
                >
                  { _t( 'common.btns.back' ) }
                </a>
                <span className="title">{t('book_appointment')}</span>
              </div>
              <div className="rights">
                <BaseTextLinkButton
                  classNameContainer={ `green-txt-btn` }
                  label={ t( 'cancel' ) }
                  onClick={ () => goBack() }
                />
                <Button variant="primary" onClick={ () => handleContinueClick() } disabled={ isContinueDisabled }>
                  { _t( 'common.btns.continue' ) }
                </Button>
              </div>
            </div>
            <div className="step-module">
              { isShowMeetingModeStep && (
                <MeetingModeStep
                  ref={MeetingModeRef}
                  formValue={ formValue }
                  onChange={ ( formValue ) => setFormValue( formValue ) }
                />
              ) }
              { isShowDateTimeStep && (
                <>
                  <DateAndTimeStep
                    ref={DateTimeRef}
                    formValue={ formValue }
                    disabledDateAndTime={ disabledDateAndTime }
                    onChange={ ( formValue ) => setFormValue( formValue ) }
                  />
                </>
              ) }
              <SubjectStep
                ref={SubjectRef}
                formValue={ formValue }
                onChange={ ( formValue ) => setFormValue( formValue ) }
              />
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  )
}

export default RightBookAppointment
