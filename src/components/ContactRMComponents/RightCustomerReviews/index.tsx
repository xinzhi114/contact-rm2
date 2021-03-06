import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseDropdown } from '../../../components/BaseForm/BaseFormFields/BaseDropdown'
import {
  contactRMReviewSortByDropdownOptions,
  contactRMReviewRatingByDropdownOptions,
} from '../../../config'
import _ from 'lodash'
import './styles.scss'

interface IRightCustomerReviewsProps {
  dataList: {
    username: string
    usernameLabel: string
    isMe: boolean
    date: string
    rate: number
    description: string
  }[]
}

const RightCustomerReviews: React.FunctionComponent<IRightCustomerReviewsProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.reviewsTab.${key}`)

  const [showMore, setShowMore] = useState(true)
  const [sortBy, setSortBy] = useState('Newest')
  const [ratingBy, setRatingBy] = useState('All Ratings')

  const [dataList] = useState(props.dataList)
  const [dataListShown, setDataListShown] = useState(props.dataList)

  // click Load More
  const clickLoadMore = () => {
    const dataListShownTemp = dataListShown
    dataListShown.forEach((item) => {
      dataListShownTemp.push(item)
    })

    setDataListShown(dataListShownTemp)

    setShowMore(false)
  }

  // click Sort By
  const clickSortBy = (value: string) => {
    const dataListShownTemp = dataListShown
    for (let i = 0; i < dataListShownTemp.length - 1; i++) {
      for (let j = i + 1; j <= dataListShownTemp.length - 1; j++) {
        const timeI = new Date(dataListShownTemp[i].date)
        const timesI = timeI.getTime()

        const timeJ = new Date(dataListShownTemp[j].date)
        const timesJ = timeJ.getTime()

        if (value === 'Oldest') {
          if (timesI > timesJ) {
            const temp = dataListShownTemp[i].date
            dataListShownTemp[i].date = dataListShownTemp[j].date
            dataListShownTemp[j].date = temp
          }
        } else {
          if (timesI < timesJ) {
            const temp = dataListShownTemp[i].date
            dataListShownTemp[i].date = dataListShownTemp[j].date
            dataListShownTemp[j].date = temp
          }
        }
      }
    }

    setDataListShown(_.cloneDeep(dataListShownTemp))
  }

  return (
    <React.Fragment>
      {!!dataList && !!dataListShown && (
        <div className="review-container">
          <div className="reviews-bar flex-grid">
            <div className="left-txt">
              {t('reviews')} ({dataList.length})
            </div>
            <div className="right-area flex">
              <div className="drop-by">
                <div className="label-txt">{t('sort_by')}</div>
                <BaseDropdown
                  id="dropdown-basic-sort-by"
                  classNameContainer=""
                  hideBorder={true}
                  value={sortBy}
                  options={contactRMReviewSortByDropdownOptions}
                  onChange={(event: any) => {
                    setSortBy(event || '')
                    clickSortBy(event || '')
                  }}
                />
              </div>
              <div className="line" />
              <div className="drop-by">
                <div className="label-txt">{t('rating')}</div>
                <BaseDropdown
                  id="dropdown-basic-rating-by"
                  classNameContainer=""
                  hideBorder={true}
                  value={ratingBy}
                  options={contactRMReviewRatingByDropdownOptions}
                  onChange={(event: any) => {
                    setRatingBy(event || '')
                  }}
                />
              </div>
            </div>
          </div>
          <div className="review-results">
            <ul>
              {dataListShown.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    ratingBy !== 'All Ratings'
                      ? parseInt(ratingBy, 10) === item.rate
                        ? ''
                        : 'hide'
                      : ''
                  }`}
                >
                  <div className="blue-points">{item.usernameLabel}</div>
                  <div className="right-area">
                    <div className="row-line flex">
                      <a href="#javascript" className="user-name">
                        {item.username} {item.isMe ? `(${t('me')})` : ''}
                      </a>
                      <span className="gray-txt">{item.date}</span>
                    </div>
                    <div className="row-line flex">
                      <div className="star-list">
                        {new Array(Math.floor(item.rate / 2))
                          .fill('')
                          .map((itemStart, indexStart) => (
                            <span className="icons icon-star" key={indexStart} />
                          ))}
                        {new Array(5 - Math.floor(item.rate / 2))
                          .fill('')
                          .map((itemStart, indexStart) => (
                            <span className="icons icon-star gray" key={indexStart} />
                          ))}
                      </div>
                      <div className="green-txt">
                        {t('rate')} {item.rate} of 10
                      </div>
                    </div>
                    <p className="txt">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {showMore && (
            <div className="load-more">
              <BaseTextLinkButton
                label={t('load_more')}
                href={'#javascript'}
                onClick={() => {
                  clickLoadMore()
                }}
              />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default RightCustomerReviews
