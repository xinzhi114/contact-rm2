import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import SubjectStep from '../SubjectStep';
import { MeetingMode, VirtualMeetingWay, InPersonMeetingWay, IBookAppointmentProps, IStepProps, SetEditableHandleTypes } from '../../../constants/appointment';
import './styles.scss'

interface IRightBookAppointmentProps {
}

const RightBookAppointment: React.FunctionComponent<IRightBookAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.${ key }` )
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState<'subject' | 'date_time' | 'meeting_mode'>(
    'subject'
  )
  const [isShowDateTimeStep, setIsShowDateTimeStep] = useState(false)
  const [isShowMeetingModeStep, setIsShowMeetingModeStep] = useState(false)
  const SubjectRef = useRef<SetEditableHandleTypes>(null)
  const DateTimeRef = useRef<SetEditableHandleTypes>(null)
  const MeetingModeRef = useRef<SetEditableHandleTypes>(null)
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>( true )
  const [formValue, setFormValue] = useState<IBookAppointmentProps>({
    subject: '',
    description: '',
    attachedFiles: [],
    date: '',
    time_slots: [],
    meeting_mode: 'virtual',
    meeting_way: 'phone_call',
    meeting_address: ''
  })

  const goBack = () => {
    history.goBack()
  }

  const handleContinueClick = () => {
    switch(currentStep) {
      case 'subject':
        SubjectRef.current?.setEditable(false)
        setIsShowDateTimeStep(true)
        break;
      case 'date_time':
        DateTimeRef.current?.setEditable(false)
        setIsShowMeetingModeStep(true)
        break;
      case 'meeting_mode':
        MeetingModeRef.current?.setEditable(false)
        break;
      default:
        break;
    }
    setCurrentStep(currentStep === 'subject' ? 'date_time' : 'meeting_mode' )
    setIsContinueDisabled(true)
    console.log(formValue, 'formValue');
  }

  useEffect( () => {
    const { subject, description, date, time_slots, meeting_mode, meeting_way, meeting_address } = formValue
    switch(currentStep) {
      case 'subject':
        if (subject && description) {
          setIsContinueDisabled(false)
        }
        break;
      case 'date_time':
        if (date && time_slots.length) {
          setIsContinueDisabled(false)
        }
        break;
      case 'meeting_mode':
        if (meeting_mode && meeting_way) {
          // in-person meeting mode
          if (meeting_mode === MeetingMode[1] ) {
            // at customer location
            if (meeting_way === InPersonMeetingWay[0] && meeting_address === '') {
              setIsContinueDisabled(true)
            }
          }
          setIsContinueDisabled(false)
        }
        break;
      default:
        setIsContinueDisabled(true)
        break;
    }
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
                <div>Step3</div>
              ) }
              { isShowDateTimeStep && (
                <>
                  <div>Step2</div>
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
