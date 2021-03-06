import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextarea } from '../../../components/BaseForm/BaseFormFields/BaseTextarea'
import formValidationSvc from '../../../services/formValidationSvc'
import _ from 'lodash'

interface IAddNewUserModalWindowProps {
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
  onSubmit?: any
}

const AddNewUserModalWindow: React.FunctionComponent<IAddNewUserModalWindowProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAccess.${key}`)

  const [data, setData] = useState(props.data)

  useEffect(() => {
    if (props.data) {
      setData(props.data)
    }
  }, [props.data])

  // set Form Data
  const setFormData = (fieldName: string, value: string) => {
    const dataTemp = data as any

    dataTemp[fieldName] = value
    setData(_.cloneDeep(dataTemp))
  }

  // is Enabled Submit
  const isEnabledSubmit = () => {
    let pass = true

    if (
      data.firstName === '' ||
      data.lastName === '' ||
      data.primaryContactNumber === '' ||
      data.companyRole === '' ||
      data.emailId === '' ||
      !formValidationSvc.validateEmail(data.emailId)
    ) {
      pass = false
    }

    return pass
  }

  return (
    <div className="modal-default add-new-user-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close label-transparent"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          {_t('common.btns.close')}
        </a>
        <div className="title-area">
          <div className="blue-title">{t('add_new_user')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('first_name')} *</div>
              <div className="control-item">
                <BaseTextInput
                  id="firstName"
                  placeholder={_t('common.labels.enter_value')}
                  pattern="[a-zA-Z -.]{0,35}"
                  value={data.firstName}
                  onChange={(event) =>
                    setFormData(
                      'firstName',
                      formValidationSvc.validateInputEnteringPattern(event, data.firstName)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('last_name')} *</div>
              <div className="control-item">
                <BaseTextInput
                  id="lastName"
                  placeholder={_t('common.labels.enter_value')}
                  pattern="[a-zA-Z -.]{0,35}"
                  value={data.lastName}
                  onChange={(event) =>
                    setFormData(
                      'lastName',
                      formValidationSvc.validateInputEnteringPattern(event, data.lastName)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('primary_contact_number')} *</div>
              <div className="control-item">
                <BaseTextInput
                  id="primaryContactNumber"
                  placeholder={_t('common.labels.enter_value')}
                  pattern="[0-9]{0,12}"
                  value={data.primaryContactNumber}
                  onChange={(event) =>
                    setFormData(
                      'primaryContactNumber',
                      formValidationSvc.validateInputEnteringPattern(
                        event,
                        data.primaryContactNumber
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('secondary_contact_number')}</div>
              <div className="control-item">
                <BaseTextInput
                  id="secondaryContactNumber"
                  placeholder={_t('common.labels.enter_value')}
                  pattern="[0-9]{0,12}"
                  value={data.secondaryContactNumber}
                  onChange={(event) =>
                    setFormData(
                      'secondaryContactNumber',
                      formValidationSvc.validateInputEnteringPattern(
                        event,
                        data.secondaryContactNumber
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('company_role')}</div>
              <div className="control-item">
                <BaseTextInput
                  id="companyRole"
                  placeholder={_t('common.labels.enter_value')}
                  pattern="[a-zA-Z -.]{0,35}"
                  value={data.companyRole}
                  onChange={(event) =>
                    setFormData(
                      'companyRole',
                      formValidationSvc.validateInputEnteringPattern(event, data.companyRole)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('email_id')} *</div>
              <div className="control-item">
                <BaseTextInput
                  showError={!formValidationSvc.validateEmail(data.emailId)}
                  errorMessageLabel={_t('common.labels.wrong_format_email_format')}
                  id="emailId"
                  placeholder={_t('common.labels.enter_value')}
                  pattern="[0-9a-zA-Z. @]{0,80}"
                  value={data.emailId}
                  onChange={(event) =>
                    setFormData(
                      'emailId',
                      formValidationSvc.validateInputEnteringPattern(event, data.emailId)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line full-width">
            <div className="items">
              <div className="label-txt">{t('address')}</div>
              <div className="control-item">
                <BaseTextarea
                  id="address"
                  placeholder={_t('common.labels.enter_value')}
                  value={data.address}
                  onChange={(event) =>
                    setFormData(
                      'address',
                      formValidationSvc.validateInputEnteringPattern(event, data.address)
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${isEnabledSubmit() ? '' : 'disabled'}`}
            label={_t('common.btns.submit')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onSubmit(data)
            }}
          />

          <BaseTextLinkButton
            label={_t('common.btns.cancel')}
            href={'#javascript'}
            onClick={(event: any) => {
              props.onClose()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AddNewUserModalWindow
