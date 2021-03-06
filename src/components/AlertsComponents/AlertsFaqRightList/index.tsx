import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IAlertsFaqRightListDataList {
  name: string
  iconUrl: string
  categoryLabel: string
  faqList: {
    title: string
    description?: string
    insightList?: string[]
    insightRightLabel?: string
    expanded?: boolean
  }[]
}

interface IAlertsFaqRightListProps {
  dataList: IAlertsFaqRightListDataList
}
export const AlertsFaqRightList: React.FunctionComponent<IAlertsFaqRightListProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`helpSupport.faqInsightRightList.${key}`)

  const [dataList, setDataList] = useState<IAlertsFaqRightListDataList>(props.dataList)
  const [isShownMore, setIsShownMore] = useState(false)

  // click Show More
  const clickShowMore = () => {
    setIsShownMore(!isShownMore)
  }

  // click Arrow
  const clickArrow = (index: number) => {
    const newDataList = { ...dataList }
    newDataList.faqList[index].expanded = !newDataList.faqList[index].expanded

    setDataList(newDataList)
  }

  return (
    <div className="card-list-boxs alerts-faq-right-content">
      {!!dataList && (
        <React.Fragment>
          <div className="title-line-bar mobile-hide">
            <img className="icons" alt="img" src={dataList.iconUrl} />
            <span className="txt">{_t('common.dynamicLabelsFromData.' + dataList.name)} FAQs</span>
          </div>
          <div className="debit-card-list">
            {dataList.faqList &&
              dataList.faqList.map((item, index) => (
                <div
                  key={index}
                  className={`row-line ${isShownMore ? '' : index >= 9 ? 'hide' : ''}`}
                >
                  <div className={`expend-wrap ${item.expanded ? 'open' : ''}`}>
                    <a
                      className="expend-title flex-grid"
                      href="#javascript"
                      onClick={(event) => {
                        clickArrow(index)
                        event.preventDefault()
                      }}
                    >
                      <div className="title">{item.title}</div>
                      <span className="btn-expend" />
                    </a>
                    <div
                      className="expend-body"
                      dangerouslySetInnerHTML={{ __html: item.description || '' }}
                    />
                  </div>
                </div>
              ))}

            <div className="row-bottom">
              {dataList.faqList.length > 9 && (
                <BaseTextLinkButton
                  label={isShownMore ? t('show_less') : t('show_more')}
                  href={'#javascript'}
                  onClick={() => {
                    clickShowMore()
                  }}
                />
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
