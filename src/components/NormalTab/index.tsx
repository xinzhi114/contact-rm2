import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export interface INormalTabProps {
  clickTab?: (tab: string) => void
  currentTab: string
  tabArray: string[]
}

export const NormalTab: React.FunctionComponent<INormalTabProps> = (props) => {
  const { t } = useTranslation()

  const { currentTab, tabArray, clickTab } = props

  return (
    <div className="top-ctrl-normal-tab flex-grid">
      <ul className="flex">
        {tabArray &&
          tabArray.map((item, index) => (
            <li key={index}>
              <a
                href="#javascript"
                className={`tab-link ${item === currentTab ? 'current' : ''}`}
                onClick={(event) => {
                  if (clickTab) {
                    clickTab(item)
                  }
                  event.preventDefault()
                }}
              >
                {t('common.dynamicLabels.' + item)}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default NormalTab
