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
import BookSuccessModal from '../../Modals/SuccessModal';
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow';
import { DATE_WEEKDAY_FORMAT } from '../../../constants/date';
import moment from 'moment';
import './styles.scss'
interface IRightBookAppointmentProps {
  disabledDateAndTime: IDisabledDateAndTime[]
  managerName: string
}

const RightBookAppointment: React.FunctionComponent<IRightBookAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.${ key }` )
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState<'subject' | 'date_and_time' | 'meeting_mode'>(
    'subject'
    )
    const [isShowDateTimeStep, setIsShowDateTimeStep] = useState<boolean>(false)
    const [isShowMeetingModeStep, setIsShowMeetingModeStep] = useState<boolean>(false)
    const [isShowBookButton, setIsShowBookButton] = useState<boolean>(false)
    const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>( true )
    const [isShowSuccessModal, setIsShowSuccessModal] = useState<boolean>( false )
    const [isShowCanelConfirmModalWindow, setIsShowCanelConfirmModalWindow] = useState<boolean>( false )

    const SubjectRef = useRef<SetEditableHandleTypes>(null)
    const DateTimeRef = useRef<SetEditableHandleTypes>(null)
    const MeetingModeRef = useRef<SetEditableHandleTypes>(null)
    const [formValue, setFormValue] = useState<IBookAppointmentProps>({
      subject: '111111',
      description: 'dsadasdasdasdas',
      attachedFiles: [],
      date: new Date(),
      time_slot: [],
      meeting_mode: _t('bookAppointment.right.meeting_mode.virtual_metting'),
      meeting_way: '',
      meeting_address: ''
    })
    
    const { disabledDateAndTime, managerName } = props

    const FooterContent = (
      <>
        <BaseTextLinkButton
          label={_t('common.btns.save_to_calendar')}
          href={'#javascript'}
          onClick={(event: any) => {
            event.preventDefault()
            setIsShowSuccessModal(false)
          }}
        />
        <BaseTextLinkButton
          label={_t('common.btns.complete')}
          href={'#javascript'}
          isButton
          onClick={(event: any) => {
            setIsShowSuccessModal(false)
          }}
        />
      </>
    )
    const summary = [{
      label: 'APPOINTMENT REF',
      value: '#2208995'
    }, {
      label: 'DATE OF APPOINTMENT',
      value: moment(formValue.date).format(DATE_WEEKDAY_FORMAT)
    }, {
      label: 'SUBJECT',
      value: formValue.subject
    }, {
      label: 'TIME OF APPOINTMENT',
      value: <><div>{formValue.time_slot.join(', ')}</div><div>{formValue.time_slot.length / 2}hours ({formValue.time_slot.length} slot)</div></>
    }, {
      label: 'MEETING MODE',
      value: formValue.meeting_mode
    }, formValue.meeting_mode === t('virtual_metting') && {
      label: t( 'captial_meeting_way' ),
      value: formValue.meeting_way
    }, formValue.meeting_mode === t('in_person_metting') && {
      label: t( formValue.meeting_way ),
      value: formValue.meeting_address
    }].filter(Boolean)
    const SummaryContent = 
      <div className="appoint-summary">
        <div className="three-area">
          {summary.map((item: any, index) => (
            <div className="item" key={index}>
              <div className="label">{item.label}</div>
              <div className="value">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="secondary">
          <span className="icon-info"></span>
          <span className="">You would get a confirmation email once the Relationship Manager accepts, declines or proposes another time for the meeting.</span>
        </div>
      </div>
    
  // go back
  const goBack = () => {
    history.goBack()
  }
  // continue button click
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
        setIsShowBookButton(true)
        break;
      default:
        break;
    }
    setCurrentStep(currentStep === 'subject' ? 'date_and_time' : 'meeting_mode' )
    setIsContinueDisabled(true)
  }
  
  // click edit btn back to prev step
  const prevStep = (step: 'subject' | 'date_and_time' | 'meeting_mode') => {
    setCurrentStep(step)
    if (step === 'subject') {
      setIsShowDateTimeStep(false)
      setIsShowMeetingModeStep(false)
    }
    if (step === 'date_and_time') {
      setIsShowMeetingModeStep(false)
    }
    if (step === 'meeting_mode') {
      setIsShowBookButton(false)
    }
    setCurrentStep(step)
    setIsContinueDisabled(false)
  }

  // book button click
  const handleBookButtonClick = () => {
    setIsShowSuccessModal(true)
  }
  // only after each step of validation is passed will proceed to the next step
  useEffect( () => {
    const { subject, description, date, time_slot, meeting_mode, meeting_way, meeting_address } = formValue
    switch(currentStep) {
      case 'subject':
        if (subject && description) {
          setIsContinueDisabled(false)
        }
        break;
      case 'date_and_time':
        if (date && time_slot.length) {
          setIsContinueDisabled(false)
        } else {
          setIsContinueDisabled(true)
        }
        break;
      case 'meeting_mode':
        if (
          (meeting_mode === _t('bookAppointment.right.meeting_mode.virtual_metting') && meeting_way) || 
          (meeting_mode === _t('bookAppointment.right.meeting_mode.in_person_metting') && meeting_address && meeting_way)
        )  {
          setIsContinueDisabled(false)
        } else {
          setIsContinueDisabled(true)
        }
        break;
      default:
        setIsContinueDisabled(true)
        break;
    }
  }, [formValue, currentStep] )

  return (
    <div className="contact-rm-right-appointment ">
      {isShowSuccessModal && (
        <BookSuccessModal
          title={t('book_appointment_complete')}
          successText={<span>{t('book_sucess_text')}<strong>{managerName}</strong></span>}
          onClose={() => {
            setIsShowSuccessModal(false)
          }}
          customModalFooterContent={FooterContent}
        >
          {SummaryContent}
        </BookSuccessModal>
      )}

      {isShowCanelConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={'Cancel appointment'}
          messageText={`Your Appointment with Reference No. '2206998' for '14 Dec 2020' is cancelled successfully. Please raise a new request if you want to contact the RM in the future.`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            setIsShowCanelConfirmModalWindow(false)
            history.push('/contactRM')
          }}
        />
      )}
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
                  label={ _t( 'common.btns.cancel' ) }
                  onClick={ () => {
                    setIsShowCanelConfirmModalWindow(true)
                  } }
                />
                {
                isShowBookButton 
                ? 
                  <Button variant="primary" onClick={ () => handleBookButtonClick() }>
                    { _t( 'common.dashboardHeader.topBreadcrumb.book_appointment' ) }
                  </Button>
                :
                  <Button variant="primary" onClick={ () => handleContinueClick() } disabled={ isContinueDisabled }>
                    { _t( 'common.btns.continue' ) }
                  </Button>
                }
              </div>
            </div>
            <div className="step-module">
              { isShowMeetingModeStep && (
                <MeetingModeStep
                  ref={MeetingModeRef}
                  prevStep={prevStep}
                  formValue={ formValue }
                  onChange={ ( formValue ) => setFormValue( formValue ) }
                />
              ) }
              { isShowDateTimeStep && (
                <>
                  <DateAndTimeStep
                    ref={DateTimeRef}
                    prevStep={prevStep}
                    formValue={ formValue }
                    disabledDateAndTime={ disabledDateAndTime }
                    onChange={ ( formValue ) => setFormValue( formValue ) }
                  />
                </>
              ) }
              <SubjectStep
                ref={SubjectRef}
                formValue={ formValue }
                prevStep={prevStep}
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
