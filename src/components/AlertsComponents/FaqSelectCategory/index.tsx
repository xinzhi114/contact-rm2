import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export interface IFaqSelectCategoryProps {
  currentIndex: number
  dataList: {
    name: string
    iconUrl: string
    categoryLabel: string
    faqList: {
      title: string
      description: string
    }[]
  }[]
  selectCategory?: (index: number) => void
}

export const FaqSelectCategory: React.FunctionComponent<IFaqSelectCategoryProps> = (props) => {
  const { t } = useTranslation()
  const { currentIndex, dataList, selectCategory } = props

  return (
    <div className="white-panel faq-select-lefts mobile-hide">
      <div className="black-title">{t('alertFAQs.faqSelectCategory.select_alert_category')} </div>
      <div className="tab-list">
        <ul>
          {dataList &&
            dataList.map((item, index) => (
              <li key={index}>
                <a
                  href="#javascript"
                  className={`tab-bar ${currentIndex === index ? 'current' : ''}`}
                  onClick={(event) => {
                    if (selectCategory) {
                      selectCategory(index)
                    }
                    event.preventDefault()
                  }}
                >
                  {t('common.dynamicLabelsFromData.' + item.name)}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
