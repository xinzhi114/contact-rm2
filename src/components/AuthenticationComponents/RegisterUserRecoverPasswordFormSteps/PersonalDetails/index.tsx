import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import { Button } from 'react-bootstrap'
import { IRegisterUserRecoverPasswordFormStepsEnum } from '../../../../config/registerUserRecoverPassword'
import {
  PersonalDetailsFormValue,
  RegisterUserRecoverPasswordFormValue,
} from '../../../../constants/reviewableForm/registerUserRecoverPassword'
import { ReviewFormStepComponent } from '../../../../constants/reviewableForm/reviewableForm'
import { IBaseFormFields, IBaseFormOnChangeNewValue } from '../../../../constants/baseForm'
import BaseForm from '../../../BaseForm'
import { TermsAndConditionsModal } from '../../../Modals/TermsAndConditionsModal'
import './styles.scss'
import { useLocation } from 'react-router-dom'
import { DeclinedTermsAndConditionsModal } from '../../../Modals/DeclinedTermsAndConditionsModal'
import { useIsMounted } from '../../../App/UseIsMounted'
import { IBaseDropdownOption } from '../../../BaseForm/BaseFormFields/BaseDropdown'
import { ASF } from '../../../../common/Api/Services/ApiServiceFactory'
import { CustomerRegistrationService } from '../../../../common/Api/Services/CustomerRegistrationService'
import { showErrorMsg } from '../../../Toast'
import { RegisterReq } from '../../../../common/Api/Domains/req/RegistrationReq'
import { storageService } from '../../../../services/Util'
import { REGISTER_RSP_LOCAL_KEY } from '../RegisterCommon'

export const PersonalDetails: ReviewFormStepComponent<
  PersonalDetailsFormValue,
  RegisterUserRecoverPasswordFormValue,
  IRegisterUserRecoverPasswordFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`registration.formSteps.personalDetails.${key}`)

  const location = useLocation()
  const isMounted = useIsMounted()
  const [titles, setTitles] = useState<IBaseDropdownOption[]>()
  const [loading, setLoading] = useState(false)

  const { formValue, onChange, onEditClick, formStepsEnum } = props

  const fetchTitles = () => {
    if (titles) {
      return
    }
    ASF.getService(CustomerRegistrationService)
      .getTitles()
      .then((titleRsp) => {
        if (isMounted.current) {
          setTitles(
            titleRsp.body.map((tr) => ({
              key: tr.customerTitle,
              value: tr.titleId + '-' + tr.customerTitle,
            }))
          )
        }
      })
      .catch((e) => showErrorMsg(e))
  }
  useEffect(fetchTitles, [])

  const isResetPasscode = location.pathname.startsWith('/resetPasscode')

  // Modals
  const [showTermsAndConditionsModal, setShowTermsAndConditionsModal] = useState<boolean>(false)
  const [showDeclinedTermsAndConditionsModal, setShowDeclinedTermsAndConditionsModal] = useState<
    boolean
  >(false)

  const getLabelAndPlaceholder = (name: string, required?: boolean) => ({
    label: `${t(`${name}__label`)}${required ? ' *' : ''}`,
    placeholder: t(`${name}__placeholder`),
    showHelp: false,
  })

  const getPersonalDetailsOnChangeHandler = (name: string) => {
    return (newValue: IBaseFormOnChangeNewValue) => {
      const newPersonalDetails = { ...formValue.personalDetails }
      _.set(newPersonalDetails, name, newValue)
      onChange({
        ...formValue,
        personalDetails: newPersonalDetails,
      })
    }
  }

  const accountDetailsFields: IBaseFormFields = {
    ...(isResetPasscode
      ? {
          userId: {
            type: 'text',
            value: formValue.accountDetails.userId as string,

            rowClassName: 'user-id',
            ...getLabelAndPlaceholder('user_id', true),
            onChange: (newValue) =>
              onChange({
                ...formValue,
                accountDetails: {
                  ...formValue.accountDetails,
                  userId: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
                },
              }),
          },
        }
      : {}),
    accountNumber: {
      type: 'text',
      formatAs: 'account-number',
      value: formValue.accountDetails.accountNumber,
      rowClassName: 'account-number',
      ...getLabelAndPlaceholder('account_number', true),
      onChange: (newValue) =>
        onChange({
          ...formValue,
          accountDetails: {
            ...formValue.accountDetails,
            accountNumber: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
          },
        }),
    },
    sortCode: {
      type: 'text',
      formatAs: 'sort-code',
      value: formValue.accountDetails.sortCode,
      ...getLabelAndPlaceholder('sortcode', true),
      onChange: (newValue) =>
        onChange({
          ...formValue,
          accountDetails: {
            ...formValue.accountDetails,
            sortCode: (newValue as React.ChangeEvent<HTMLInputElement>).target.value,
          },
        }),
    },
  }

  const nonUkCustomerFields: IBaseFormFields = {
    nonUkCustomer: {
      type: 'checkbox',
      value: [formValue.personalDetails.isNonUkCustomer],
      options: [t('i_am_non_uk_customer')],
      onChange: (newValue) => {
        onChange({
          ...formValue,
          personalDetails: {
            ...formValue.personalDetails,
            isNonUkCustomer: (newValue as boolean[])[0],
          },
        })
      },
    },
  }
  const personalDetailsFields: IBaseFormFields = {
    title: {
      type: 'dropdown',
      value: formValue.personalDetails.title,
      options: titles || [],
      rowClassName: 'title',
      ...getLabelAndPlaceholder('title', true),
      onChange: (newValue) => {
        onChange({
          ...formValue,
          personalDetails: {
            ...formValue.personalDetails,
            title: newValue as string,
          },
        })
      },
    },
    firstName: {
      type: 'text',
      value: formValue.personalDetails.firstName,
      rowClassName: 'first-name',
      ...getLabelAndPlaceholder('first_name', true),
      onChange: (newValue) =>
        getPersonalDetailsOnChangeHandler('firstName')(
          (newValue as React.ChangeEvent<HTMLInputElement>).target.value
        ),
    },
    lastName: {
      type: 'text',
      value: formValue.personalDetails.lastName,
      rowClassName: 'last-name',
      ...getLabelAndPlaceholder('last_name', true),
      onChange: (newValue) =>
        getPersonalDetailsOnChangeHandler('lastName')(
          (newValue as React.ChangeEvent<HTMLInputElement>).target.value
        ),
    },
    dateOfBirth: {
      type: 'date-of-birth',
      value: formValue.personalDetails.dateOfBirth,
      rowClassName: 'date-of-birth',
      ...getLabelAndPlaceholder('date_of_birth', true),
      onChange: getPersonalDetailsOnChangeHandler('dateOfBirth'),
      maxDate: new Date(),
    },
    nonUkCustomer: {
      ...nonUkCustomerFields.nonUkCustomer,
      rowClassName: 'non-uk-customer tablet-show desktop-hide',
    },
    ...(!formValue.personalDetails.isNonUkCustomer
      ? {
          postcode: {
            type: 'text',
            formatAs: 'postcode',
            value: formValue.personalDetails.postcode,
            rowClassName: 'postcode',
            ...getLabelAndPlaceholder('postcode', true),
            onChange: (newValue) =>
              getPersonalDetailsOnChangeHandler('postcode')(
                (newValue as React.ChangeEvent<HTMLInputElement>).target.value
              ),
          },
        }
      : {}),
  }

  const agreeToTermsAndConditionsFields: IBaseFormFields = {
    agreeToTermsAndConditions: {
      type: 'checkbox',
      value: [formValue.agreeToTermsAndConditions],
      rowClassName: 'terms-and-conditions',
      options: [
        <>
          {t('i_have_read_and_agree_to')}{' '}
          <span
            className="link"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowTermsAndConditionsModal(true)
            }}
          >
            {t('terms_and_conditions')}
          </span>
        </>,
      ],
      onChange: (newValue) => {
        onChange({
          ...formValue,
          agreeToTermsAndConditions: (newValue as boolean[])[0],
        })
      },
    },
  }

  const dateOfBirthFilled =
    formValue.personalDetails.dateOfBirth[0].length > 0 &&
    formValue.personalDetails.dateOfBirth[1].length > 0 &&
    formValue.personalDetails.dateOfBirth[2].length === 4

  const submitIsDisabled =
    (formValue.accountDetails.userId !== null ? formValue.accountDetails.userId === '' : false) ||
    _.entries(formValue.personalDetails)
      .filter(
        (e) =>
          e[0] !== 'isNonUkCustomer' &&
          e[0] !== 'dateOfBirth' &&
          (formValue.personalDetails.isNonUkCustomer ? e[0] !== 'postcode' : true)
      )
      .some((e) => e[1] === '' || e[1] === null) ||
    !dateOfBirthFilled ||
    !formValue.agreeToTermsAndConditions

  /**
   * on submit register
   */
  const onSubmit = () => {
    if (!isResetPasscode) {
      onRegister()
    } else {
      onEditClick(formStepsEnum.OTP_CODE)
    }
  }

  const onRegister = () => {
    const { personalDetails, accountDetails } = formValue
    const userTitle = (personalDetails.title || '').split('-')
    const isUK = !formValue.personalDetails.isNonUkCustomer

    const registerReq: RegisterReq = {
      accountNumber: accountDetails.accountNumber,
      title: userTitle[1] || '',
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      dateOfBirth: [...personalDetails.dateOfBirth].reverse().join('-'),
      sortCode: accountDetails.sortCode,
      titleId: parseInt(userTitle[0] || '0', 10),
      resident: isUK,
      decision: true,
      tcId: formValue.tcId,
      postCode: isUK ? personalDetails.postcode : undefined,
    }

    setLoading(true)
    ASF.getService(CustomerRegistrationService)
      .register(registerReq)
      .then((rsp) => {
        if (isMounted.current) {
          storageService.storeData(REGISTER_RSP_LOCAL_KEY, rsp.body).then(() => {
            onEditClick(formStepsEnum.OTP_CODE)
          })
        }
      })
      .catch((e) => showErrorMsg(e))
      .finally(() => {
        if (isMounted.current) {
          setLoading(false)
        }
      })
  }
  return (
    <div className="personal-details-step">
      <div className="form-section">
        <div className="section-title">
          {t('account_details')}{' '}
          <span className="mandatory-fields tablet-show desktop-hide">
            {_t('registration.fields_marked_are_mandatory')}
          </span>
        </div>
        <BaseForm fields={accountDetailsFields} disableTranslation />
      </div>
      <div className="form-section">
        <div className="section-title">
          <span>{t('personal_details')}</span>
          <div className="tablet-hide desktop-show">
            <BaseForm fields={nonUkCustomerFields} disableTranslation />
          </div>
        </div>
        <BaseForm fields={personalDetailsFields} disableTranslation />
      </div>
      <div className="form-section terms-and-conditions-section">
        <BaseForm fields={agreeToTermsAndConditionsFields} disableTranslation />
      </div>
      <div className="submit-section">
        <Button variant="primary" onClick={onSubmit} disabled={submitIsDisabled || loading}>
          {loading ? _t('common.loading') : _t('common.btns.submit')}
        </Button>
      </div>
      {showTermsAndConditionsModal && (
        <TermsAndConditionsModal
          onClose={(agree, tnc) => {
            setShowTermsAndConditionsModal(false)
            if (agree !== undefined) {
              if (agree !== formValue.agreeToTermsAndConditions) {
                onChange({
                  ...formValue,
                  agreeToTermsAndConditions: agree,
                  tcId: tnc?.tcId || 0,
                })
              }
              if (!agree) {
                setShowDeclinedTermsAndConditionsModal(true)
              }
            }
          }}
        />
      )}
      {showDeclinedTermsAndConditionsModal && (
        <DeclinedTermsAndConditionsModal
          onClose={(action) => {
            switch (action) {
              case 'view-terms':
                setShowTermsAndConditionsModal(true)
                break
              case 'contact-support':
                // TODO
                break
            }
            setShowDeclinedTermsAndConditionsModal(false)
          }}
        />
      )}
    </div>
  )
}
