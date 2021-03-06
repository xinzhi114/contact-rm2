import React from 'react'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IAddNewUserSuccessModalWindowProps {
  data: {
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
  onClose?: any
  onConfirm?: any
}

const AddNewUserSuccessModalWindow: React.FunctionComponent<IAddNewUserSuccessModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAccess.${key}`)

  const { data } = { ...props }

  return (
    <div className="modal-default add-new-user-success-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          &nbsp;
        </a>
        <div className="title-area">
          <div className="blue-title">{t('add_new_user_successfully')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="icons done-icons">
                <img src="/assets/Illustrations-confirm.svg" alt="svg" />
              </div>
              <div className="white-txt">{t('new_user_has_been_added_successfully')}</div>
            </div>
          </div>
          <div className="bottom-data">
            <div className="group">
              <div className="top-label">{t('user_name')}</div>
              <div className="values">
                {data.firstName} {data.lastName}
              </div>
            </div>
            <div className="group">
              <div className="top-label">{t('email_id')}</div>
              <div className="values">{data.emailId}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('company_role')}</div>
              <div className="values">{data.companyRole}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('primary_contact_number')}</div>
              <div className="values">{data.primaryContactNumber}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('secondary_contact_number')}</div>
              <div className="values">{data.secondaryContactNumber}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('address')}</div>
              <div className="values">{data.address}</div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={_t('common.btns.confirm')}
            href={'#javascript'}
            isButton
            onClick={(event: any) => {
              props.onConfirm()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AddNewUserSuccessModalWindow
