import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import Subject from '../Subject';
import './styles.scss'

interface IRightBookAppointmentProps {
}

const RightBookAppointment: React.FunctionComponent<IRightBookAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.${ key }` )
  const history = useHistory()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isContinue, setIsContinue] = useState( false )

  const goBack = () => {
    history.goBack()
  }

  const handleContinueClick = () => {
    setCurrentIndex( currentIndex + 1 )
  }

  // const isContinueDisabled =
  //   (showPassword || forceShowPassword ? formValue.password === '' : false) ||
  //   formValue.userId === '' ||
  //   !!loading
  const isContinueDisabled = false

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
              { currentIndex === 0 && (
                <Subject />
              ) }
              { currentIndex === 1 && (
                <div>Step2</div>
              ) }
              { currentIndex === 2 && (
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
