import React, { useCallback, useEffect, useState } from 'react'
import * as _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { IBaseFormFields } from '../../../../constants/baseForm'
import BaseForm from '../../../BaseForm'
import { Payee } from '../../../../containers/MovePaymentPages/ManagePayees'
import { IBaseTextInputFormatAs } from '../../../BaseForm/BaseFormFields/BaseTextInput'

export interface IPayeeFormProps {
  isUkPayee: boolean
  // If this prop is provided, the form will be controlled, otherwise, it handles its own state
  payee?: Payee | null
  initialPayee?: Payee
  onChange?: (newFormValue: { [field: string]: string }) => void
}

export const PayeeForm: React.FunctionComponent<IPayeeFormProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = useCallback((key: string) => _t(`movePaymentManagePayees.payeeForm.${key}`), [_t])

  const { isUkPayee, initialPayee, payee, onChange } = props

  const [formValue, setFormValue] = useState<{ [field: string]: string }>({})

  if (payee && !_.isEqual(formValue, payee)) {
    setFormValue(payee as { [field: string]: string })
  }

  useEffect(() => {
    setFormValue({
      ...{
        name: initialPayee ? initialPayee.name : '',
        accountNumber: initialPayee ? initialPayee.accountNumber : '',
      },
      ...(isUkPayee
        ? {
            sortCode: initialPayee ? (initialPayee.sortCode as string) : '',
          }
        : {
            iban: initialPayee ? initialPayee.iban : '',
            bic: initialPayee && initialPayee.bic ? initialPayee.bic : '',
          }),
      ...{
        reference: initialPayee ? initialPayee.reference : '',
      },
    })
  }, [isUkPayee, initialPayee])

  const fields = {} as IBaseFormFields

  _.keys(formValue).forEach((key) => {
    if (key === 'userNameColor' || key === 'userNameLabelColor') {
      return
    }

    if (isUkPayee) {
      if (['iban', 'bic'].includes(key)) {
        return
      }
    } else {
      if (['sortCode'].includes(key)) {
        return
      }
    }
    let formatAs: IBaseTextInputFormatAs | undefined
    switch (key) {
      case 'name':
        formatAs = 'payee-name'
        break
      case 'accountNumber':
        formatAs = 'account-number'
        break
      case 'reference':
        formatAs = 'reference'
        break
      case 'sortCode':
        formatAs = 'sort-code'
        break
      case 'iban':
        formatAs = 'iban'
        break
      case 'bic':
        formatAs = 'bic'
        break
    }
    const underlinedKey = key.replace(/[A-Z]/, (v) => `_${v.toLowerCase()}`)
    fields[key] = {
      id: underlinedKey,
      type: 'text',
      value: formValue[key],
      label: t(`${underlinedKey}_label`),
      placeholder: t(`${underlinedKey}_placeholder`),
      onChange: (e) => {
        const newFormValue = { ...formValue }
        newFormValue[key] = (e as React.ChangeEvent<HTMLInputElement>).target.value
        setFormValue(newFormValue)
        if (onChange) {
          onChange(newFormValue)
        }
      },
      formatAs,
    }
    if (key === 'reference') {
      fields[key].showHelp = true
      fields[key].helpTooltipText = t('reference_tooltip')
    } else {
      fields[key].showHelp = false
    }
  })

  useEffect(() => {
    if (onChange) {
      onChange(formValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <BaseForm fields={fields} disableTranslation={true} />
}
