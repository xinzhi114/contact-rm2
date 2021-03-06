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
    email: string
    phoneNumber: string
    description: string
    availableToday: string[]
  }
  currentIndex: number
  selectTab: (index: number) => void
}

const tabArray = ['contact_details', 'appointment', 'reviews']
const LeftFilters: React.FunctionComponent<ILeftFiltersProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.leftBar.${key}`)
  const rm = useRM()

  const [data] = useState(props.data)

  const [currentIndex, setCurrentIndex] = useState(props.currentIndex)

  useEffect(() => {
    setCurrentIndex(props.currentIndex)
  }, [props.currentIndex])
  if (!rm) {
    return (
      <div className="white-panel contact-rm-left-filter">
        <div>{_t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="white-panel contact-rm-left-filter">
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
        <BaseTextLinkButton
          classNameContainer={`btn-book-appointment`}
          label={t('book_appointment')}
          isButton
          onClick={() => null}
        />

        <div className="description-txt">
          <span className="top-gray">”</span>
          {rm.description}
        </div>

        <div className="tab-list">
          <ul>
            {tabArray &&
              tabArray.map((item, index) => (
                <li key={index}>
                  <a
                    href="#javascript"
                    className={`tab-bar ${currentIndex === index ? 'current' : ''}`}
                    onClick={(event) => {
                      props.selectTab(index)
                      event.preventDefault()
                    }}
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="today-boxs">
          <div className="today-txt">{t('available_today')}</div>

          {data.availableToday.map((item, index) => (
            <div key={index} className="blue-border-btn">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftFilters
