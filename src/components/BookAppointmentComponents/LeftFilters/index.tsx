import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { useRM } from '../../DashboardRelationshipManager'
import { ProfileIcon } from '../../ProfileIcon'

interface ILeftFiltersProps {
  data: {
    photoUrl: string
    stars: number
    name: string
    role: string
    state: string
    availableToday: string[]
  }
}

const LeftFilters: React.FunctionComponent<ILeftFiltersProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`bookAppointment.leftBar.${key}`)
  const rm = useRM()

  const [data] = useState(props.data)

  if (!rm) {
    return (
      <div className="white-panel contact-rm-left-filter">
        <div>{_t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="white-panel book-appointment-left-bar">
      <div className="center-boxs">
        <div className="user-module">
          <div className="left-img">
            <ProfileIcon name={rm.name} photoUrl={rm.photoURL} />
            {data.state === 'Available' && <span className="state-point green" />}
            {data.state === 'Busy' && <span className="state-point red" />}
            {data.state === 'Offline' && <span className="state-point gray" />}
          </div>
          <div className="rights">
            <div className="names">{rm.name}</div>
            <div className="role-txt">{rm.role}</div>
            <div className="state-txt">{data.state}</div>
            <div className="start-list">
              <ul>
                {new Array(data.stars).fill('').map((item, index) => (
                  <li key={index}>
                    <i className="icon-star-green" />
                  </li>
                ))}
                {new Array(5 - data.stars).fill('').map((item, index) => (
                  <li key={index}>
                    <i className="icon-star-gray" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="today-boxs">
          <div className="today-txt">{t('available_today')}</div>

          {data.availableToday.map((item, index) => (
            <div key={index} className="blue-border-btn">
              {item}
            </div>
          ))}
        </div>

        <div className="imformation-box">
          <span className="icon-info" /><span className="title">{t('imformation_title')}</span>
          <div className="imformation-txt">{t('imformation_text')}</div>
        </div>

      </div>
    </div>
  )
}

export default LeftFilters
