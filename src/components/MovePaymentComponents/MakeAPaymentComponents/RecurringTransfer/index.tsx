import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import * as _ from 'lodash'
import { IListItem } from '../../../../constants/layout'
import { FlexList } from '../../../FlexLayoutComponents/FlexList'
import {
  IBaseFormFields,
  IBaseFormFieldType,
  IBaseFormFieldValue,
} from '../../../../constants/baseForm'
import BaseForm from '../../../BaseForm'
import { IBaseTextInputFormatAs } from '../../../BaseForm/BaseFormFields/BaseTextInput'
import { IBaseDropdownOption } from '../../../BaseForm/BaseFormFields/BaseDropdown'
import { PAYMENT_FREQUENCY_OPTIONS } from '../../../../constants/payment'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { FlexDialog } from '../../../FlexLayoutComponents/FlexDialog'
import { ImportantInformation } from '../../ImportantInformation'
import { MobileBankingApproveModal } from '../../../Modals/MobileBankingApproveModal'
import SuccessModal from '../../../Modals/SuccessModal'
import { ImportantInformationNotificationModal } from '../../../Modals/ImportantInformationNotificationModal'
import {
  initialRecurringTransferFormValue,
  MakeAPaymentFormValue,
  RecurringTransferFormValue,
} from '../../../../constants/reviewableForm/makeAPayment'
import './styles.scss'

export interface IRecurringTransferProps {
  onSuccess: (formValue: RecurringTransferFormValue) => void
  onCancel: () => void
  formValue?: MakeAPaymentFormValue
  onChange?: (newFormValue: { [field: string]: string | Date | null }) => void
}

export const RecurringTransfer: React.FunctionComponent<IRecurringTransferProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.recurringTransfer.${key}`)

  const { onSuccess: onSubmit, onCancel, formValue: paymentFormValue, onChange } = props

  // Modals
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showImportantInformationModal, setShowImportantInformationModal] = useState<boolean>(false)
  const [
    showImportantInformationNotificationModal,
    setShowImportantInformationNotificationModal,
  ] = useState<boolean>(true)

  const [showNormalDesktop, setShowNormalDesktop] = useState<boolean>(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1280px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setShowNormalDesktop(e.matches)
    }
    setShowNormalDesktop(mql.matches)
    mql.addEventListener('change', handleResize)
    return () => {
      mql.removeEventListener('change', handleResize)
    }
  }, [])

  const [formValue, setFormValue] = useState<RecurringTransferFormValue>(
    // If payment form is valid, fill values
    !(!paymentFormValue || paymentFormValue.payee.payee === null)
      ? {
          yourReference: paymentFormValue.payee.payee.reference,
          frequency: 'Monthly',
          firstPaymentDate: paymentFormValue.date.date,
          finalPaymentDate: paymentFormValue.date.date,
          firstAmount: paymentFormValue.payment.amount,
          regularAmount: paymentFormValue.payment.amount,
          finalAmount: paymentFormValue.payment.amount,
        }
      : initialRecurringTransferFormValue
  )

  if (!paymentFormValue || paymentFormValue.payee.payee === null) {
    return <></>
  }

  const accountItems: IListItem[] = [
    {
      label: _t('movePaymentMakeAPayment.from_account'),
      title: paymentFormValue.account.account ? paymentFormValue.account.account.name : '--',
      subTitle: paymentFormValue.account.account
        ? paymentFormValue.account.account.accountNumber
        : '--',
    },
    {
      icon: '/assets/mobile-back.svg',
      alt: 'to account',
      flip: true,
    },
    {
      label: _t('movePaymentMakeAPayment.to'),
      title: paymentFormValue.account.toAccount
        ? paymentFormValue.payee.payee
          ? paymentFormValue.payee.payee.name
          : '--'
        : '--',
      subTitle: paymentFormValue.payee.payee ? paymentFormValue.payee.payee.accountNumber : '--',
    },
    {
      label: t('first_transfer_date'),
      value: moment(paymentFormValue.date.date).format('DD MMM YYYY'),
    },
  ]

  const fields = {} as IBaseFormFields
  _.keys(formValue).forEach((key) => {
    let formatAs: IBaseTextInputFormatAs | undefined
    const underlinedKey = key.replace(/[A-Z]/g, (v) => `_${v.toLowerCase()}`)
    let type: IBaseFormFieldType | undefined
    let options: IBaseDropdownOption[] | undefined
    if (key === 'frequency') {
      type = 'dropdown'
      options = PAYMENT_FREQUENCY_OPTIONS.slice()
    } else if (key.includes('Amount')) {
      formatAs = 'amount'
    } else if (key.includes('Date')) {
      type = 'date'
    }
    fields[key] = {
      id: underlinedKey,
      type: type ? type : 'text',
      value: formValue[key] as IBaseFormFieldValue,
      label: t(`${underlinedKey}_label`),
      placeholder: t(`${underlinedKey}_placeholder`),
      onChange: (e) => {
        const newFormValue = { ...formValue }
        if (!type) {
          newFormValue[key] = (e as React.ChangeEvent<HTMLInputElement>).target.value
        } else if (type === 'date') {
          newFormValue[key] = e as Date | null
        } else if (type === 'dropdown') {
          newFormValue[key] = e as string
        }
        if (key === 'firstPaymentDate') {
          if (moment(newFormValue.firstPaymentDate).diff(newFormValue.finalPaymentDate) > 0) {
            newFormValue.finalPaymentDate = newFormValue.firstPaymentDate
          }
        }
        setFormValue(newFormValue)
        if (onChange) {
          onChange(newFormValue)
        }
      },
      formatAs,
      options,
      showHelp: false,
      showCurrency: key.includes('Amount'),
      minDate:
        key === 'firstPaymentDate' && paymentFormValue.date.date
          ? paymentFormValue.date.date
          : key === 'finalPaymentDate' && formValue.firstPaymentDate
          ? formValue.firstPaymentDate
          : undefined,
    }
  })

  const handleSubmitClick = () => {
    setShowApproveModal(true)
  }

  return (
    <Row className="recurring-transfer">
      <Col xs={showNormalDesktop ? 12 : 9}>
        <FlexDialog fullHeight>
          <Modal.Header className="recurring-transfer-header">
            <img src="/assets/mobile-back.svg" alt="back" onClick={() => onCancel()} />{' '}
            {t('make_recurring_transfer')}
            <div
              className="show-important-information-wrapper"
              onClick={() => setShowImportantInformationModal(true)}
            >
              <div className="show-important-information mobile-show desktop-hide">
                <img src="/assets/question-bold-white.svg" alt="show important information" />
              </div>
              <div className="show-important-information tablet-show desktop-normal-show mobile-hide desktop-hide">
                <img src="/assets/question-bold.svg" alt="show important information" />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className="recurring-transfer-body">
            <div className="top-title">{t('create_new_recurring_transfer')}</div>
            <FlexList items={accountItems} className="account-summary" />
            <BaseForm fields={fields} />
          </Modal.Body>
          <Modal.Footer className="recurring-transfer-footer">
            <Button
              variant="primary"
              disabled={_.values(formValue).some((v) => v === '' || v === null)}
              onClick={() => handleSubmitClick()}
            >
              {_t('common.btns.submit')}
            </Button>
            <Button variant="secondary" onClick={() => onCancel()}>
              {_t('common.btns.cancel')}
            </Button>
          </Modal.Footer>
        </FlexDialog>
      </Col>
      <Col xs={3} className="desktop-show desktop-normal-hide">
        <FlexDialog fullHeight>
          <Modal.Body className="important-information-wrapper">
            <ImportantInformation
              showFullModal={showImportantInformationModal}
              onClose={() => setShowImportantInformationModal(false)}
              translationKey="movePaymentMakeAPayment.recurringTransfer.importantInformation"
              showNormalDesktop={showNormalDesktop}
            />
          </Modal.Body>
        </FlexDialog>
      </Col>

      {showApproveModal ? (
        <MobileBankingApproveModal
          onApproved={() => {
            setShowApproveModal(false)
            setShowSuccessModal(true)
          }}
        />
      ) : (
        showSuccessModal && (
          <SuccessModal
            title={t('successModal.title')}
            mobileFullScreen
            successText={
              <>
                {t('successModal.text_1')} {paymentFormValue.payee.payee.name}{' '}
                <span className="bold">({paymentFormValue.payee.payee.accountNumber})</span>{' '}
                {t('successModal.text_2')}
              </>
            }
            onClose={() => onSubmit(formValue)}
          />
        )
      )}
      {showImportantInformationNotificationModal && (
        <ImportantInformationNotificationModal
          onOpen={() => {
            setShowImportantInformationModal(true)
            setShowImportantInformationNotificationModal(false)
          }}
          onClose={() => setShowImportantInformationNotificationModal(false)}
          showNormalDesktop
        />
      )}
    </Row>
  )
}
