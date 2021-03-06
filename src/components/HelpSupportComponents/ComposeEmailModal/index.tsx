import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import { IBaseFormFields, IBaseFormFieldValue } from '../../../constants/baseForm'
import { EmailSubject, EmailSubjectArray } from '../../../constants/email'
import BaseForm from '../../BaseForm'
import { BaseModal } from '../../Modals/BaseModal'
import { data } from '../../../__mocks__/data/dataComposeEmail'
import { IBaseFileInputValue } from '../../BaseForm/BaseFormFields/BaseFileInput'
import { BaseCheckbox } from '../../BaseForm/BaseFormFields/BaseCheckbox'
import './styles.scss'

export type IComposeEmailModalProps = {
  dataAdditional?: {
    composeType: string
    customerId: string
    accountNumber: string
    firstName: string
    lastName: string
    primaryContactNumber: string
    secondaryContactNumber: string
    companyRole: string
    emailId: string
    address: string
  }
  onClose?: (success: boolean) => void
}

export const ComposeEmailModal: React.FunctionComponent<IComposeEmailModalProps> = (props) => {
  const { t } = useTranslation()

  const translateSubject = (s: EmailSubject) =>
    t(`helpSupport.contactBankSecureEmailDetails.emailSubjects.${s}`)

  const [isAdditionalInfo, setIsAdditionalInfo] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('compose_new_email')
  const [checkboxValue, setCheckboxValue] = useState<boolean[]>([false])
  const [subject, setSubject] = useState<string>()
  const [emailContent, setEmailContent] = useState<string>('')
  const [attachedFiles, setAttachedFiles] = useState<IBaseFileInputValue[]>([])

  const [customerInfo, setCustomerInfo] = useState([
    {
      label: 'helpSupport.contactBankSecureEmailDetails.customer_id',
      value: data.customerId,
    },
    {
      label: 'helpSupport.contactBankSecureEmailDetails.customer_name',
      value: data.customerName,
    },
  ])

  const fields: IBaseFormFields = {
    emailSubject: {
      type: 'dropdown',
      value: subject,
      placeholder: t('helpSupport.contactBankSecureEmailDetails.select_subject'),
      label: t('helpSupport.contactBankSecureEmailDetails.subject'),
      rowClassName: 'email-subject-row',
      onChange: (newSubject) => setSubject(newSubject as EmailSubject),
      options: EmailSubjectArray.map((s) => translateSubject(s)),
    },
    emailContent: {
      type: 'textarea',
      value: emailContent,
      flexGrow: true,
      wrapperClassName: 'email-content-wrapper',
      rowClassName: 'email-content-row',
      placeholder: t('helpSupport.contactBankSecureEmailDetails.enter_email_content'),
      label: t('helpSupport.contactBankSecureEmailDetails.email_content'),
      onChange: (newContent) =>
        setEmailContent((newContent as React.ChangeEvent<HTMLTextAreaElement>).target.value),
    },
    attachedFiles: {
      type: 'file',
      value: attachedFiles,
      accept: '.pdf,.doc,.xls,.png,.jpeg,.jpg',
      wrapperClassName: 'attach-file-wrapper',
      rowClassName: 'attach-file-row',
      onChange: (newFiles) => setAttachedFiles(newFiles as IBaseFileInputValue[]),
    },
  }

  useEffect(() => {
    if (props.dataAdditional) {
      setIsAdditionalInfo(true)

      switch (props.dataAdditional.composeType) {
        case 'add new user':
          setTitle(`compose_new_email_add_new_user`)

          setEmailContent(
            `Account Number  ${props.dataAdditional.accountNumber}  request to add new user`
          )
          setSubject('Add New User')
          break
        case 'request closure':
          setTitle(`compose_new_email_request_closure`)

          setEmailContent(
            `Account Number  ${props.dataAdditional.accountNumber}  request to closure`
          )
          setSubject('Account Closure')
          break
        default:
          break
      }

      setCustomerInfo([
        {
          label: 'helpSupport.contactBankSecureEmailDetails.customer_id',
          value: props.dataAdditional.customerId,
        },
        {
          label: 'helpSupport.contactBankSecureEmailDetails.customer_name',
          value: `${props.dataAdditional.firstName} ${props.dataAdditional.lastName}`,
        },
      ])
    }
  }, [props.dataAdditional])

  const onCancel = () => {
    if (props.onClose) {
      props.onClose(false)
    }
  }

  const sendForm = () => {
    const formValue = _.keys(fields).reduce((prev, key) => {
      const next: { [key: string]: IBaseFormFieldValue } = {
        ...prev,
      }
      next[key] = fields[key].value
      return next
    }, {})
    if (props.onClose) {
      props.onClose(true)
    }
    return formValue
  }

  return (
    <BaseModal
      title={t('helpSupport.contactBankSecureEmailDetails.' + title)}
      className="compose-email-modal"
      primaryText={t('common.btns.send_email')}
      secondaryText={t('common.btns.cancel')}
      enablePrimary={subject !== undefined && emailContent !== ''}
      onClose={() => onCancel()}
      onPrimaryClick={() => sendForm()}
      onSecondaryClick={() => onCancel()}
      mobileFullScreen="full-navbar"
    >
      <div className="customer-info">
        {customerInfo.map((item, index) => (
          <div key={index}>
            <span className="title">{t(item.label)}</span>
            <span className="value">{item.value}</span>
          </div>
        ))}
      </div>
      {isAdditionalInfo && (
        <div className="customer-info">
          <BaseCheckbox
            value={checkboxValue}
            options={['Request Callback']}
            onChange={(newValue) => {
              setCheckboxValue(newValue)
            }}
          />
        </div>
      )}

      <BaseForm fields={fields} disableTranslation />
    </BaseModal>
  )
}
