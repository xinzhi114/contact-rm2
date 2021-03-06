import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface ITabBorderedProps {
  individualBusiness: string
  clickTab?: any
  currentTab: string
  tabArray: {
    label: string
    showControl: string
  }[]
}

const TabBordered: React.FunctionComponent<ITabBorderedProps> = (props) => {
  const { t } = useTranslation()
  const { individualBusiness, currentTab, tabArray } = { ...props }

  return (
    <div className="three-tab-border">
      {tabArray &&
        tabArray.map((item, index) => (
          <a
            key={index}
            href="#javascript"
            className={`items 
                        ${item.label === currentTab ? 'current' : ''}
                        ${
                          individualBusiness !== 'individual' &&
                          item.showControl === 'only-for-individual'
                            ? 'hide'
                            : ''
                        }
                        ${
                          individualBusiness !== 'business' &&
                          item.showControl === 'only-for-business'
                            ? 'hide'
                            : ''
                        }`}
            onClick={(event) => {
              props.clickTab(item.label)
              event.preventDefault()
            }}
          >
            {t('common.dynamicLabels.' + item.label)}
          </a>
        ))}
    </div>
  )
}

export default TabBordered
