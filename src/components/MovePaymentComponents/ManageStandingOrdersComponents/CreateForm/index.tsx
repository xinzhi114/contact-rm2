import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { movePaymentFrequencyDropdownOptions } from '../../../../config'
import SelectComponent from '../../TransferBetweenAccountsComponents/SelectComponent'
import formValidationSvc from '../../../../services/formValidationSvc'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseDropdown } from '../../../../components/BaseForm/BaseFormFields/BaseDropdown'
import { DATE_FORMAT } from '../../../../constants/date'
import { StandingOrder } from '../../../../domain/StandingOrder'
import _ from 'lodash'

interface ICreateFormProps {
  individualBusiness: string
  fromAccountList: {
    label: string
    value: string
    number: string
    availableBalance: string
  }[]
  dataList: StandingOrder
  clickSubmitCreate?: any
  clickCancelCreate?: any
}

const CreateForm: React.FunctionComponent<ICreateFormProps> = (props) => {
  const { t } = useTranslation()

  const [fromAccountList] = useState(props.fromAccountList)
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

  const onKeyDownSortCode = (event: any) => {
    if (event.keyCode === 8) {
      setOrderDetailsValue(
        'sortCode',
        formValidationSvc.validateInputEnteringPatternKeyDownSortCode(
          event,
          dataList.orderDetails.sortCode
        )
      )
    }
  }

  const enableUpdate = () => {
    let pass = true

    for (const key of Object.keys(dataList.orderDetails)) {
      if (key !== 'sortCode') {
        if ((dataList as any).orderDetails[key] === '') {
          pass = false
        }
      } else {
        // check for sort Code
        if ((dataList as any).orderDetails[key].length !== 6) {
          pass = false
        }
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
    <div className="manage-standing-orders-create-form">
      <div className="top-back">
        <a
          href="#javascript"
          className="btn-back label-transparent"
          onClick={() => {
            props.clickCancelCreate()
          }}
        >
          {t('common.btns.back')}
        </a>
        {t('movePaymentManageStandingOrders.create_standing_order')}
      </div>
      <div className="form-title">
        {t('movePaymentManageStandingOrders.create_new_standing_order')}
      </div>
      <div className="form-area">
        <div className="row-line">
          <div className="two-group">
            <div className="items">
              <div className="label-txt">
                {t('movePaymentManageStandingOrders.formFields.from_account')}
              </div>
              <div className="control-item">
                <SelectComponent
                  id="dropdown-basic-select"
                  t={t}
                  label="debitAccount"
                  data={fromAccountList}
                  defaultValue={dataList.orderDetails.fromAccount}
                  callBack={(event: any) => {
                    setOrderDetailsValue('fromAccount', event.value)
                  }}
                />
              </div>
            </div>
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
          </div>
          <div className="two-group">
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
          </div>
          <div className="two-group">
            <div className="items">
              <div className="label-txt">
                {t('movePaymentManageStandingOrders.formFields.payee_name')}
              </div>
              <div className="control-item">
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
            <div className="items">
              <div className="label-txt">
                {t('movePaymentManageStandingOrders.formFields.sort_code')}
              </div>
              <div className="control-item">
                <BaseTextInput
                  id="sortCode"
                  placeholder={t('common.labels.enter_value')}
                  value={dataList.orderDetails.sortCode}
                  pattern="[0-9-]{0,8}"
                  onChange={(event) => {
                    setOrderDetailsValue(
                      'sortCode',
                      formValidationSvc.validateInputEnteringPatternSortCode(
                        event,
                        dataList.orderDetails.sortCode
                      )
                    )
                  }}
                  onKeyDown={(event) => {
                    onKeyDownSortCode(event)
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
              <div className="control-item">
                <BaseTextInput
                  id="accountNumber"
                  placeholder={t('common.labels.enter_value')}
                  value={dataList.orderDetails.accountNumber}
                  pattern="[0-9 ]{0,8}"
                  onChange={(event) => {
                    setOrderDetailsValue(
                      'accountNumber',
                      formValidationSvc.validateInputEnteringPattern(
                        event,
                        dataList.orderDetails.accountNumber
                      )
                    )
                  }}
                />
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
                  value={dataList.fieldList[1].fieldValue}
                  onChange={(event) => {
                    setFieldValue(1, event.target.value)
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
                  showCurrency={true}
                  pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                  value={dataList.fieldList[5].fieldValue}
                  onChange={(event) => {
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
                  showCurrency={true}
                  pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                  value={dataList.orderDetails.regularAmount}
                  onChange={(event) => {
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
                  showCurrency={true}
                  pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
                  value={dataList.orderDetails.finalAmount}
                  onChange={(event) => {
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
          label={t('common.btns.submit')}
          href={'#javascript'}
          isButton={true}
          onClick={() => {
            props.clickSubmitCreate(dataList)
          }}
        />

        <BaseTextLinkButton
          classNameContainer={''}
          label={t('common.btns.cancel')}
          href={'#javascript'}
          onClick={() => {
            props.clickCancelCreate()
          }}
        />
      </div>
    </div>
  )
}

export default CreateForm
