import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { StandingOrder } from '../../../../domain/StandingOrder'
import { amountToFloat, formatAmount } from '../../../../services/Util'
import './styles.scss'

interface ICancelStandingOrderModalWindowProps {
  individualBusiness: string
  dataList: StandingOrder
  onSubmit?: any
  onClose?: any
}

const CancelStandingOrderModalWindow: React.FunctionComponent<ICancelStandingOrderModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const [dataList] = useState(props.dataList)
  const { individualBusiness } = { ...props }

  return (
    <div className="modal-default manage-standing-orders-cancel-modal">
      {dataList && (
        <div className="modal-mains">
          <a
            href="#javascript"
            className="btn-close label-transparent"
            onClick={(event) => {
              props.onClose()
              event.preventDefault()
            }}
          >
            {t('common.btns.close')}
          </a>
          <div className="title-area">
            <div className="blue-title">
              {t('movePaymentManageStandingOrders.cancel_standing_order')}
            </div>
          </div>

          <div className="modal-info">
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
                    <div className="value-txt">{dataList.fieldList[3].fieldValue}</div>
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
                    <div className="value-txt">{dataList.fieldList[4].fieldValue}</div>
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

          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('common.btns.submit')}
              isButton={true}
              onClick={() => {
                props.onSubmit()
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CancelStandingOrderModalWindow
