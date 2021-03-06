import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { movePaymentFrequencyDropdownOptions } from '../../../../config'
import formValidationSvc from '../../../../services/formValidationSvc'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'
import { DATE_FORMAT } from '../../../../constants/date'
import { StandingOrder } from '../../../../domain/StandingOrder'
import _ from 'lodash'

interface IUpdateStandingOrderModalWindowProps {
  individualBusiness: string
  dataList: StandingOrder
  onClose?: any
  onUpdate?: any
}

const UpdateStandingOrderModalWindow: React.FunctionComponent<IUpdateStandingOrderModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const [dataList, setDataList] = useState(props.dataList)
  const { individualBusiness } = { ...props }

  const setFieldValue = (index: number, event: any) => {
    dataList.fieldList[index].fieldValue = event.toString()
    setDataList(_.cloneDeep(dataList))
  }

  const setOrderDetailsValue = (fieldName: string, event: any) => {
    const newList = dataList as any
    newList.orderDetails[fieldName] = event.toString()
    setDataList(_.cloneDeep(newList))
  }

  const enableUpdate = () => {
    let pass = true

    for (const key of Object.keys(dataList.orderDetails)) {
      if ((dataList as any).orderDetails[key] === '') {
        pass = false
      }
    }

    dataList.fieldList.forEach((item) => {
      if (item.fieldName !== 'action') {
        if (item.fieldValue === '') {
          pass = false
        }
      }
    })

    return pass
  }

  return (
    <div className="modal-default update-standing-order-modal">
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
            {t('movePaymentManageStandingOrders.update_standing_order')}
          </div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.from_account')}
                </div>
                <div className="control-item disabled">
                  <BaseDropdown
                    id="dropdown-basic-from-account"
                    value={dataList.fieldList[2].fieldValue}
                    options={movePaymentFrequencyDropdownOptions}
                  />
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.payee_name')}
                </div>
                <div className="control-item disabled">
                  <BaseTextInput
                    id="payeeName"
                    placeholder={t('common.labels.enter_value')}
                    value={dataList.fieldList[0].fieldValue}
                    onChange={(event: any) => {
                      setFieldValue(0, event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.account_number')}
                </div>
                <div className="control-item disabled">
                  <BaseTextInput
                    id="accountNumber"
                    placeholder={t('common.labels.enter_value')}
                    value={dataList.orderDetails.accountNumber}
                  />
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.sort_code')}
                </div>
                <div className="control-item disabled">
                  <BaseTextInput
                    id="sortCode"
                    placeholder={t('common.labels.enter_value')}
                    value={dataList.orderDetails.sortCode}
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.frequency')}
                </div>
                <div className="control-item">
                  <BaseDropdown
                    id="dropdown-basic-frequency"
                    value={dataList.fieldList[2].fieldValue}
                    options={movePaymentFrequencyDropdownOptions}
                    onChange={(event: any) => {
                      setFieldValue(2, event)
                    }}
                  />
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.first_payment_date')}
                </div>
                <div className="control-item">
                  <div className="global-date-container date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={new Date()}
                        selected={new Date(dataList.fieldList[3].fieldValue)}
                        onChange={(event: Date) => {
                          setFieldValue(3, event || new Date())
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.final_payment_date')}
                </div>
                <div className="control-item">
                  <div className="global-date-container date-boxs">
                    <div className="inputs">
                      <DatePicker
                        placeholderText={t(
                          'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                        )}
                        dateFormat={DATE_FORMAT}
                        minDate={new Date(dataList.fieldList[3].fieldValue)}
                        selected={new Date(dataList.fieldList[4].fieldValue)}
                        onChange={(event: Date) => {
                          setFieldValue(4, event || new Date())
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {individualBusiness === 'individual'
                    ? t('movePaymentManageStandingOrders.formFields.reference')
                    : t('movePaymentManageStandingOrders.formFields.your_reference')}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="reference"
                    placeholder={t('common.labels.enter_value')}
                    pattern="[\s\S]{0,50}"
                    value={dataList.fieldList[1].fieldValue}
                    onChange={(event: any) => {
                      setFieldValue(
                        1,
                        formValidationSvc.validateInputEnteringPattern(
                          event,
                          dataList.fieldList[1].fieldValue
                        )
                      )
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.first_amount')}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="firstAmount"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency
                    pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                    value={dataList.fieldList[5].fieldValue}
                    onChange={(event: any) => {
                      setFieldValue(
                        5,
                        formValidationSvc.validateInputEnteringPattern(
                          event,
                          dataList.fieldList[5].fieldValue
                        )
                      )
                    }}
                  />
                </div>
              </div>
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.regular_amount')}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="regularAmount"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency
                    pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                    value={dataList.orderDetails.regularAmount}
                    onChange={(event: any) => {
                      setOrderDetailsValue(
                        'regularAmount',
                        formValidationSvc.validateInputEnteringPattern(
                          event,
                          dataList.orderDetails.regularAmount
                        )
                      )
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="two-group">
              <div className="items">
                <div className="label-txt">
                  {t('movePaymentManageStandingOrders.formFields.final_amount')}
                </div>
                <div className="control-item">
                  <BaseTextInput
                    id="finalAmount"
                    placeholder={t('common.labels.enter_value')}
                    showCurrency
                    pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                    value={dataList.orderDetails.finalAmount}
                    onChange={(event: any) => {
                      setOrderDetailsValue(
                        'finalAmount',
                        formValidationSvc.validateInputEnteringPattern(
                          event,
                          dataList.orderDetails.finalAmount
                        )
                      )
                    }}
                  />
                </div>
              </div>
              <div className="items" />
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${enableUpdate() ? '' : 'disabled'}`}
            label={t('common.btns.update')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onUpdate()
            }}
          />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
export default UpdateStandingOrderModalWindow
