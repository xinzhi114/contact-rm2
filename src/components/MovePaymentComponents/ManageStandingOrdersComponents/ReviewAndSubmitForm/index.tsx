import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import moment from 'moment'
import { amountToFloat, formatAmount } from '../../../../services/Util'
import { DATE_FMT } from '../../../../config'
import { StandingOrder } from '../../../../domain/StandingOrder'
import './styles.scss'

interface IReviewAndSubmitFormProps {
  individualBusiness: string
  dataList: StandingOrder
  clickSubmitReview?: any
}

const ReviewAndSubmitForm: React.FunctionComponent<IReviewAndSubmitFormProps> = (props) => {
  const { t } = useTranslation()

  const [dataList] = useState(props.dataList)
  const { individualBusiness } = { ...props }
  const [enabledResent] = useState(false)

  setTimeout(() => {
    props.clickSubmitReview()
  }, 5000)

  return (
    <div className="manage-standing-orders-review-and-submit-form">
      <div className="top-title">{t('movePaymentManageStandingOrders.review_and_submit')}</div>
      <div className="review-and-submit-main">
        <div className="left-area">
          <div className="big-title">
            {t('movePaymentManageStandingOrders.create_new_standing_order')}
          </div>
          <div className="review-area">
            <div className="gray-wrap">
              <div className="row-groups">
                <div className="bold-title">
                  {t('movePaymentManageStandingOrders.standing_order_details')}
                </div>
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.from_account')}
                    </div>
                    <div className="value-txt">{dataList.orderDetails.fromAccount}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.frequency')}
                    </div>
                    <div className="value-txt">{dataList.fieldList[2].fieldValue}</div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.first_payment_date')}
                    </div>
                    <div className="value-txt">
                      {moment(dataList.fieldList[3].fieldValue || undefined).format(DATE_FMT)}
                    </div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {individualBusiness === 'individual'
                        ? t('movePaymentManageStandingOrders.formFields.reference')
                        : t('movePaymentManageStandingOrders.formFields.your_reference')}
                    </div>
                    <div className="value-txt">{dataList.fieldList[1].fieldValue}</div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.final_payment_date')}
                    </div>
                    <div className="value-txt">
                      {moment(dataList.fieldList[4].fieldValue || undefined).format(DATE_FMT)}
                    </div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.first_amount')}
                    </div>
                    <div className="value-txt">
                      £ {formatAmount(amountToFloat(dataList.fieldList[5].fieldValue))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.payee_name')}
                    </div>
                    <div className="value-txt">{dataList.fieldList[0].fieldValue}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.regular_amount')}
                    </div>
                    <div className="value-txt">
                      £ {formatAmount(amountToFloat(dataList.orderDetails.regularAmount))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.sort_code')}
                    </div>
                    <div className="value-txt">{dataList.orderDetails.sortCode}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.final_amount')}
                    </div>
                    <div className="value-txt">
                      £ {formatAmount(amountToFloat(dataList.orderDetails.finalAmount))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">
                      {t('movePaymentManageStandingOrders.formFields.account_number')}
                    </div>
                    <div className="value-txt">{dataList.orderDetails.accountNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-area">
          <div className="line-title">
            {t('movePaymentManageStandingOrders.approve_confirmation_from_odyssey')}
          </div>
          <div className="center-txt">
            <img
              src="/assets/mobile-banking-approve.svg"
              alt="approve"
              className="mobile-banking-approve"
            />
            <div className="message">
              <span className="sending-request">
                {t('movePaymentManageStandingOrders.sending_request')}
              </span>
              <span>{t('movePaymentManageStandingOrders.approve_on_phone')}</span>
              <span>{t('movePaymentManageStandingOrders.do_not_refresh')}</span>
            </div>
            <div className="phone-name">
              <span className="label">{t('movePaymentManageStandingOrders.phone_name')}</span>
              <span className="value">John Applessed iPhone</span>
            </div>
          </div>
          <div className="bottom-btns">
            <BaseTextLinkButton
              classNameContainer={`${enabledResent ? '' : 'disabled'}`}
              label={'Resent notification'}
              href={'#javascript'}
              isButton
              onClick={() => null}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewAndSubmitForm
