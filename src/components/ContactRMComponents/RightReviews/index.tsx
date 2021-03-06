import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSlider from 'react-slider'
import RightCustomerReviews from '../RightCustomerReviews'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import { BaseTextarea } from '../../../components/BaseForm/BaseFormFields/BaseTextarea'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

interface IRightReviewsProps {
  dataList: {
    averageRating: number
    customerReviews: number
    ratingDetails: {
      rate: number
      percentage: number
    }[]
    reviews: {
      username: string
      usernameLabel: string
      isMe: boolean
      date: string
      rate: number
      description: string
    }[]
  }
}

const RightReviews: React.FunctionComponent<IRightReviewsProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.reviewsTab.${key}`)

  const [showCustomerReviews, setShowCustomerReviews] = useState(false)
  const [rateValue, setRateValue] = useState(0)
  const [feedbackValue, setFeedbackValue] = useState('')

  const [isShowRateConfirmModalWindow, setIsShowRateConfirmModalWindow] = useState(false)

  const [dataList] = useState(props.dataList)

  return (
    <div className="contact-rm-right-reviews">
      {isShowRateConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('rate_relationship_manager')}
          messageText={`${_t('contactRM.reviewsTab.your_feedback_has_been_submitted_successfully', {
            rate: rateValue,
          })}`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            setIsShowRateConfirmModalWindow(false)
            setShowCustomerReviews(true)
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="right-contents rate-relation-manager-module">
            <div className="line-title">
              <span className="title">
                {!showCustomerReviews ? t('rate_relationship_manager') : t('customer_reviews')}
              </span>
            </div>
            <div className="inner-container">
              <div className="gray-area flex-grid">
                <div className="lefts">
                  <div className="thin-txt">{t('average_rating')}</div>
                  <div className="star-boxs flex">
                    <div className="black-txt">{dataList.averageRating}</div>
                    <div className="right-star">
                      <div className="star-list">
                        {new Array(Math.floor(dataList.averageRating))
                          .fill('')
                          .map((item, index) => (
                            <span className="icons icon-star" key={index} />
                          ))}
                        {new Array(5 - Math.floor(dataList.averageRating))
                          .fill('')
                          .map((item, index) => (
                            <span className="icons icon-star gray" key={index} />
                          ))}
                      </div>
                      <div className="green-txt">
                        {dataList.customerReviews} {t('customer_reviews')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rights">
                  <div className="chart-list">
                    {dataList.ratingDetails.map((item, index) => (
                      <div className="bar flex" key={index}>
                        <span className="num">{item.rate}</span>
                        <div className="progress-bg">
                          <div className="color-inner" style={{ width: `${item.percentage}%` }} />
                        </div>
                        <span className="parents">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!showCustomerReviews && (
                <React.Fragment>
                  <div className="rate-box">
                    <div className="rate-title">{t('rate_your_rm_service')}</div>
                    <p className="txt">{t('how_would_you_rate_the_bank')}</p>
                  </div>
                  <div className="num-progress">
                    <div className="top-green-txt ">
                      {rateValue >= 1 && rateValue <= 2 && t('bad')}
                      {rateValue >= 3 && rateValue <= 5 && t('normal')}
                      {rateValue >= 6 && rateValue <= 8 && t('good')}
                      {rateValue >= 9 && rateValue <= 10 && t('excellent')}
                    </div>
                    <div className="progress-img">
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(propsSlider) => <div {...propsSlider}>{rateValue}</div>}
                        max={10}
                        defaultValue={rateValue}
                        onChange={(event) => {
                          if (typeof event === 'number') {
                            setRateValue(event)
                          }
                        }}
                      />
                    </div>
                    <div className="num-list flex-grid">
                      <span className={`num ${rateValue >= 1 && rateValue <= 1 ? 'current' : ''}`}>
                        0
                      </span>
                      <span className={`num ${rateValue >= 2 && rateValue <= 3 ? 'current' : ''}`}>
                        2
                      </span>
                      <span className={`num ${rateValue >= 4 && rateValue <= 5 ? 'current' : ''}`}>
                        4
                      </span>
                      <span className={`num ${rateValue >= 6 && rateValue <= 7 ? 'current' : ''}`}>
                        6
                      </span>
                      <span className={`num ${rateValue >= 8 && rateValue <= 9 ? 'current' : ''}`}>
                        8
                      </span>
                      <span className={`num ${rateValue === 10 ? 'current' : ''}`}>10</span>
                    </div>
                  </div>

                  <div className="textarea-area">
                    <div className="top-txt">{t('please_provide_your_feedback')}</div>
                    <BaseTextarea
                      id="feedbackInput"
                      maxlength={200}
                      placeholder={t('enter_your_feedback_here')}
                      value={feedbackValue}
                      onChange={(event) => {
                        setFeedbackValue(
                          formValidationSvc.validateInputEnteringPattern(event, feedbackValue)
                        )
                      }}
                    />

                    <div className="bottom-txt">
                      <span className="num">{feedbackValue.length}</span> /{' '}
                      <span className="num">200</span> {t('characters')}
                    </div>
                  </div>

                  <div className="bottom-line-bar">
                    <BaseTextLinkButton
                      label={_t('common.btns.skip_rating')}
                      onClick={() => setShowCustomerReviews(true)}
                    />

                    <BaseTextLinkButton
                      classNameContainer={`${feedbackValue === '' ? 'disabled' : ''}`}
                      label={_t('common.btns.submit_rating')}
                      isButton={true}
                      onClick={() => {
                        setIsShowRateConfirmModalWindow(true)
                      }}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
            {showCustomerReviews && <RightCustomerReviews dataList={dataList.reviews} />}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default RightReviews
