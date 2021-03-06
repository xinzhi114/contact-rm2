import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IProfileSelectCategoryProps {
  currentIndex: number
  tabArray: string[]
  selectCategory?: any
}

const ProfileSelectCategory: React.FunctionComponent<IProfileSelectCategoryProps> = (props) => {
  const { t } = useTranslation()

  const [currentIndex, setCurrentIndex] = useState(props.currentIndex)
  const [tabArray] = useState(props.tabArray)

  useEffect(() => {
    setCurrentIndex(props.currentIndex)
  }, [props.currentIndex])

  return (
    <div className="white-panel faq-select-lefts mobile-hide">
      <div className="black-title">{t('manageProfile.profile_details')}</div>
      <div className="tab-list">
        <ul>
          {tabArray &&
            tabArray.map((item, index) => (
              <li key={index}>
                <a
                  href="#javascript"
                  className={`tab-bar ${currentIndex === index ? 'current' : ''}`}
                  onClick={(event) => {
                    props.selectCategory(index)
                    event.preventDefault()
                  }}
                >
                  {t('manageProfile.' + item)}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileSelectCategory
