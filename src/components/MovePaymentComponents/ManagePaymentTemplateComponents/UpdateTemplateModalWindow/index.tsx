import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import { DATE_FORMAT } from '../../../../constants/date'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import SelectComponent from '../../TransferBetweenAccountsComponents/SelectComponent'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'

interface IUpdateTemplateModalWindowProps {
  fromAccountList: {
    label: string
    value: string
    number: string
    availableBalance: string
  }[]
  dataList: {
    debitAccountId: string
    debitAccountAvailableBalance: string
    fieldList: {
      fieldType: string
      fieldName: string
      fieldValue: string
      queryHide: boolean
    }[]
    expandData: {
      areaTitle: string
      fieldList: {
        fieldType: string
        fieldName: string
        fieldValue: string
      }[]
    }
  } | null
  onClose?: any
  onUpdate?: any
}

const UpdateTemplateModalWindow: React.FunctionComponent<IUpdateTemplateModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const [dataList, setDataList] = useState(props.dataList)
  const [fromAccountList] = useState(props.fromAccountList)
  const [templateName, setTemplateName] = useState(dataList?.fieldList[1].fieldValue || '')
  const [debitAccount, setDebitAccount] = useState(dataList?.fieldList[0].fieldValue || '')
  const [debitAccountId, setDebitAccountId] = useState(dataList?.debitAccountId || '')
  const [debitAccountAvailableBalance, setDebitAccountAvailableBalance] = useState(
    dataList?.debitAccountAvailableBalance || ''
  )

  const [paymentDate, setPaymentDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    setDataList(props.dataList)
    if (props.dataList) {
      setTemplateName(props.dataList.fieldList[1].fieldValue)
      setDebitAccount(props.dataList.fieldList[0].fieldValue)
      setPaymentDate(new Date(props.dataList.fieldList[2].fieldValue))
    }
  }, [props.dataList])

  // is Enabled Update
  const isEnabledUpdate = () => {
    let pass = true

    if (templateName === '' || debitAccount === '' || paymentDate === undefined) {
      pass = false
    }

    return pass
  }

  /**
   * save From data
   * @param data
   * @param accountPrompt
   */
  const setFromData = (data: any) => {
    setDebitAccount(data.value)
    fromAccountList.forEach((item: any) => {
      if (item.value === data.value) {
        setDebitAccountId(item.number)
        setDebitAccountAvailableBalance(item.availableBalance)
      }
    })
  }

  return (
    <div className="modal-default update-template-modal">
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
          <div className="blue-title">{t('movePaymentManagePaymentTemplate.update_template')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('movePaymentManagePaymentTemplate.template_name')}</div>
              <div className="control-item">
                <BaseTextInput
                  id="templateName"
                  placeholder={t('common.labels.enter_value')}
                  pattern="[\s\S]{0,35}"
                  value={templateName}
                  onChange={(event) =>
                    setTemplateName(
                      formValidationSvc.validateInputEnteringPattern(event, templateName)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('movePaymentManagePaymentTemplate.debit_account')}</div>
              <div className="control-item">
                <SelectComponent
                  id="dropdown-basic-select"
                  t={t}
                  label="debitAccount"
                  data={fromAccountList}
                  defaultValue={`${debitAccount} (${debitAccountId})`}
                  callBack={(event: any) => {
                    setFromData(event)
                  }}
                />
                <div className="bottom-txt flex-grid">
                  <div className="txt">
                    {t('movePaymentTransferBetweenAccounts.formBox.available_balance')}
                    <span className="bold-txt"> £ {debitAccountAvailableBalance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('movePaymentManagePaymentTemplate.payment_date')}</div>
              <div className="control-item date-boxs">
                <div className="inputs">
                  <DatePicker
                    placeholderText={t(
                      'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                    )}
                    dateFormat={DATE_FORMAT}
                    minDate={new Date()}
                    selected={paymentDate}
                    onChange={(event: Date) => {
                      setPaymentDate(event)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${isEnabledUpdate() ? '' : 'disabled'}`}
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
export default UpdateTemplateModalWindow
