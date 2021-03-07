import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import './styles.scss'

interface IRightBookAppointmentProps {
}

const RightBookAppointment: React.FunctionComponent<IRightBookAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`book.bookAppointment.${key}`)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="contact-rm-right-appointment">
      <React.Fragment>
        <div className="right-contents appointment-module">
          <div className="line-title">
            <i className="icons date-clock" />
            <span className="title">{t('book_appointment')}</span>
          </div>
          <div className="module-content">
            {currentIndex + 1}
          </div>
        </div>
      </React.Fragment>
    </div>
  )
}

export default RightBookAppointment
