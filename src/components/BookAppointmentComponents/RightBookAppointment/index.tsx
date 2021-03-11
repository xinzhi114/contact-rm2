import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import SubjectStep from '../SubjectStep';
import { IBookAppointmentProps, SetEditableHandleTypes } from '../../../constants/appointment';
import { IDisabledDateAndTime, Appointment } from '../../../domain/Appointment'
import CancelAppointmentModalWindow from '../../ContactRMComponents/CancelAppointmentModalWindow'
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
  dataList: Appointment | null
  goBack: () => void
  confirmCancelledAppointment: () => void
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
    const [isShowCancelConfirmModalWindow, setIsShowCancelConfirmModalWindow] = useState(false)
    const [isShowCancelledModalWindow, setIsShowCancelledModalWindow] = useState(false)

    const [isShowBookButton, setIsShowBookButton] = useState<boolean>(false)
    const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>( true )
    const [isShowSuccessModal, setIsShowSuccessModal] = useState<boolean>( false )
    const [actionText, setActionText] = useState(t('book_appointment'))

    const SubjectRef = useRef<SetEditableHandleTypes>(null)
    const DateTimeRef = useRef<SetEditableHandleTypes>(null)
    const MeetingModeRef = useRef<SetEditableHandleTypes>(null)
    const [formValue, setFormValue] = useState<IBookAppointmentProps>({
      subject: '',
      description: '',
      attachedFiles: [],
      date: new Date(),
      time_slot: [],
      meetingMode: _t('bookAppointment.right.meeting_mode.virtual_metting'),
      preferredModeOfMeeting: '',
      meeting_address: ''
    })
    
    const { disabledDateAndTime, managerName, dataList } = props

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
      value: formValue.meetingMode
    }, formValue.meetingMode === t('virtual_metting') && {
      label: t( 'captial_meeting_way' ),
      value: formValue.preferredModeOfMeeting
    }, formValue.meetingMode === t('in_person_metting') && {
      label: t( formValue.preferredModeOfMeeting ),
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
    const { subject, description, date, time_slot, meetingMode, preferredModeOfMeeting, meeting_address } = formValue
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
          (meetingMode === _t('bookAppointment.right.meeting_mode.virtual_metting') && preferredModeOfMeeting) || 
          (meetingMode === _t('bookAppointment.right.meeting_mode.in_person_metting') && meeting_address && preferredModeOfMeeting)
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

  // update appointment data
  useEffect(() => {
    if (dataList) {
      const {dateOfAppointment, subject, description, timeOfAppointment, preferredModeOfMeeting, meetingMode} = dataList
      const date = moment(dateOfAppointment)
      const time_slot = [timeOfAppointment.replace(/to/g, '-')]
      const newFormValue = Object.assign(formValue, { subject, description, date, time_slot, preferredModeOfMeeting, meetingMode })
      setFormValue({...newFormValue})
      setIsShowDateTimeStep(true)
      setIsShowMeetingModeStep(true)
      setIsShowBookButton(true)
      SubjectRef.current?.setEditable(false)
      DateTimeRef.current?.setEditable(false)
      MeetingModeRef.current?.setEditable(false)
      setActionText(t('update_appointment'))
    }
  }, [dataList])

  return (
    <div className="appointment-container">

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

      {isShowCancelledModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('cancel_appointment')}
          messageText={`${_t(
            'contactRM.appointmentTab.your_appointment_with_reference_no_is_cancelled_successfully',
            {
              appointmentRef: dataList?.appointmentRef || '',
              dateOfAppointment: moment(formValue.date).format(DATE_WEEKDAY_FORMAT),
            }
          )}`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            setIsShowCancelledModalWindow(false)
            props.confirmCancelledAppointment()
          }}
        />
      )}

      {isShowSuccessModal && (
        <BookSuccessModal
          title={dataList ? t('update_appointment_complete') : t('book_appointment_complete')}
          successText={<span>{t('book_sucess_text')}<strong>{managerName}</strong></span>}
          onClose={() => {
            setIsShowSuccessModal(false)
          }}
          customModalFooterContent={FooterContent}
        >
          {SummaryContent}
        </BookSuccessModal>
      )}

      <div>
        <React.Fragment>
          <div className="book-appointment">
            <div className="line-title flex-grid">
              <div className="lefts flex">
                <a
                  href="#javascript"
                  className="icons icon-back label-transparent"
                  onClick={ () => props.goBack() }
                >
                  { _t( 'common.btns.back' ) }
                </a>
                <span className="title">{ actionText }
                </span>
              </div>
              <div className="rights">
                <BaseTextLinkButton
                  classNameContainer={ `green-txt-btn` }
                  label={ _t( 'common.btns.cancel' ) }
                  onClick={ () => {
                    !!dataList ? setIsShowCancelConfirmModalWindow(true) : setIsShowCancelledModalWindow(true)
                  } }
                />
                {
                isShowBookButton 
                ? 
                  <Button variant="primary" onClick={ () => handleBookButtonClick() }>
                    {actionText}
                  </Button>
                :
                  <Button variant="primary" onClick={ () => handleContinueClick() } disabled={ isContinueDisabled }>
                    { _t( 'common.btns.continue' ) }
                  </Button>
                }
              </div>
            </div>
            <div className="step-module">
              { (isShowMeetingModeStep || !!dataList) && (
                <MeetingModeStep
                  ref={MeetingModeRef}
                  prevStep={prevStep}
                  formValue={ formValue }
                  onChange={ ( formValue ) => setFormValue( formValue ) }
                />
              ) }
              { (isShowDateTimeStep || !!dataList) && (
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
