import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import formValidationSvc from '../../../../services/formValidationSvc'

interface IChangeNominatedModalWindowProps {
  onClose?: any
  onSave?: any
}

const ChangeNominatedModalWindow: React.FunctionComponent<IChangeNominatedModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const [sortCode, setSortCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [paymentReference, setPaymentReference] = useState('')

  // validate SortCode
  const validateSortCode = () => {
    if (sortCode === '') {
      return true
    }

    const filter = /^([0-9-]{8})+$/

    return filter.test(sortCode)
  }

  const onKeyDownSortCode = (event: any) => {
    if (event.keyCode === 8) {
      setSortCode(formValidationSvc.validateInputEnteringPatternKeyDownSortCode(event, sortCode))
    }
  }

  // validate Account Number
  const validateAccountNumber = () => {
    if (accountNumber === '') {
      return true
    }

    const filter = /^([0-9]{8})+$/

    return filter.test(accountNumber)
  }

  // is Enabled Save
  const isEnabledSave = () => {
    let pass = true

    if (
      sortCode === '' ||
      accountNumber === '' ||
      paymentReference === '' ||
      !validateSortCode() ||
      !validateAccountNumber()
    ) {
      pass = false
    }

    return pass
  }

  return (
    <div className="modal-default change-nominated-amount-modal">
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
          <div className="blue-title">{t('accountsDashboard.quickActions.change_nominated')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('accountsDashboard.quickActions.sort_code')}</div>
              <div className="control-item">
                <BaseTextInput
                  id="sortCode"
                  placeholder={t('common.labels.enter_value')}
                  showError={!validateSortCode()}
                  errorMessageLabel={t('common.labels.wrong_format_sort_code')}
                  pattern="[0-9-]{0,8}"
                  value={sortCode}
                  onChange={(event) =>
                    setSortCode(
                      formValidationSvc.validateInputEnteringPatternSortCode(event, sortCode)
                    )
                  }
                  onKeyDown={(event: any) => {
                    onKeyDownSortCode(event)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('accountsDashboard.quickActions.account_number')}</div>
              <div className="control-item">
                <BaseTextInput
                  id="accountNumber"
                  placeholder={t('common.labels.enter_value')}
                  showError={!validateAccountNumber()}
                  errorMessageLabel={t('common.labels.wrong_format_account_number')}
                  pattern="[0-9]{0,8}"
                  value={accountNumber}
                  onChange={(event) =>
                    setAccountNumber(
                      formValidationSvc.validateInputEnteringPattern(event, accountNumber)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">
                {t('accountsDashboard.quickActions.payment_reference')}
              </div>
              <div className="control-item">
                <BaseTextInput
                  id="paymentReference"
                  placeholder={t('common.labels.enter_value')}
                  pattern="[\s\S]{0,50}"
                  value={paymentReference}
                  onChange={(event) =>
                    setPaymentReference(
                      formValidationSvc.validateInputEnteringPattern(event, paymentReference)
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${isEnabledSave() ? '' : 'disabled'}`}
            label={t('common.btns.save')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onSave()
            }}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
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

// @ts-ignore
export default ChangeNominatedModalWindow
