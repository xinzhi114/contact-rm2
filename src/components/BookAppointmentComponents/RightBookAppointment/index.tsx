import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { IBaseFileInputValue } from '../../BaseForm/BaseFormFields/BaseFileInput'
import Subject from '../Subject';
import './styles.scss'

interface IRightBookAppointmentProps {
}

export interface IBookAppointmentProps {
  subject: string
  description: string
  attachedFiles: IBaseFileInputValue[]
  dateAndTime: {
    date: string
    time_slot: string[]
  }
  meeting_mode: string
  meeting_by: string
  meeting_address?: string
}

const RightBookAppointment: React.FunctionComponent<IRightBookAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.${ key }` )
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState<'subject' | 'date_and_time' | 'meeting_mode'>(
    'subject'
  )
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>( true )
  const [formValue, setFormValue] = useState<IBookAppointmentProps>( {
    subject: '',
    description: '',
    attachedFiles: [],
    dateAndTime: {
      date: '',
      time_slot: []
    },
    meeting_mode: 'virtual',
    meeting_by: 'phone_call',
    meeting_address: ''
  } )

  const goBack = () => {
    history.goBack()
  }

  const handleContinueClick = () => {
    setCurrentStep( currentStep === 'subject' ? 'date_and_time' : 'meeting_mode' )
  }

  const handleSubmit = () => { }

  useEffect( () => {

  }, [] )

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
              { currentStep === 'subject' && (
                <Subject
                  setIsContinueDisabled={ setIsContinueDisabled }
                  formValue={ formValue }
                  onChange={ ( formValue ) => setFormValue( formValue ) }
                  onSubmit={ () => handleSubmit() }
                />
              ) }
              { currentStep === 'date_and_time' && (
                <div>Step2</div>
              ) }
              { currentStep === 'meeting_mode' && (
                <div>Step3</div>
              ) }
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  )
}

export default RightBookAppointment
