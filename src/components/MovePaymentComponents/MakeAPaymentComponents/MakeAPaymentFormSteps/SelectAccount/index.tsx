import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { loadAccounts } from '../../../../../store/actions/account'
import { IAccount, ToAccountArray } from '../../../../../constants/account'
import { IBaseFormFields } from '../../../../../constants/baseForm'
import { ReviewFormStepComponent } from '../../../../../constants/reviewableForm/reviewableForm'
import {
  MakeAPaymentFormValue,
  SelectAccountFormValue,
} from '../../../../../constants/reviewableForm/makeAPayment'
import { IAppState } from '../../../../../store/constants'
import BaseForm from '../../../../BaseForm'
import { BaseCheckbox } from '../../../../BaseForm/BaseFormFields/BaseCheckbox'
import { FlexList } from '../../../../FlexLayoutComponents/FlexList'
import { AccountInfo } from '../../AccountInfo'
import { EditStepButton } from '../../EditStepButton'
import './styles.scss'
import { IMakeAPaymentFormStepsEnum } from '../../../../../config/makeAPayment'

export const SelectAccount: ReviewFormStepComponent<
  SelectAccountFormValue,
  MakeAPaymentFormValue,
  IMakeAPaymentFormStepsEnum
> = (props) => {
  const dispatch = useDispatch()

  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.${key}`)

  const {
    formValue,
    allFormValues,
    onChange,
    onChangeOtherForm,
    onEditClick,
    review,
    noWrap,
    formStepsEnum,
  } = props
  const { account, toAccount } = formValue

  const accounts = useSelector<IAppState>((state) => state.account.accounts) as IAccount[]

  const fromAccountFields: IBaseFormFields = {
    account: {
      type: 'dropdown',
      value: account ? account.name : '',
      label: t('from_account'),
      showHelp: false,
      placeholder: _t('common.dynamicLabels.Select'),
      options: accounts.map((accountOption) => ({
        title: accountOption.name,
        subTitle: accountOption.accountNumber,
      })),
      onChange: (e) => {
        const newAccount = accounts.find((accountOption) => accountOption.name === (e as string))
        onChange({
          ...formValue,
          account: newAccount ? newAccount : null,
        })
      },
    },
  }

  const toAccountFields: IBaseFormFields = {
    toAccount: {
      type: 'checkbox',
      value: ToAccountArray.map((key) => key === toAccount),
      checkboxType: 'radio',
      label: t('to'),
      showHelp: false,
      options: ToAccountArray.map((key) => t(key)),
      onChange: (e) => {
        const newToAccount = ToAccountArray.find((_key, index) => (e as boolean[])[index])
        onChange({
          ...formValue,
          toAccount: newToAccount ? newToAccount : null,
        })
      },
    },
  }

  const formattedBalance =
    account !== null
      ? `£${String(account.balance.toFixed(2)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`
      : ''

  useEffect(() => {
    dispatch(loadAccounts())
  }, [dispatch])

  if (review && !noWrap) {
    return (
      <div className="select-account-review">
        <FlexList
          items={[
            {
              label: t('from_account'),
              title: account ? account.name : '--',
              subTitle: account ? account.accountNumber : '--',
            },
            {
              icon: '/assets/mobile-back.svg',
              alt: 'to account',
              flip: true,
            },
            {
              label: t('to'),
              title: toAccount
                ? allFormValues.payee.payee
                  ? allFormValues.payee.payee.name
                  : '--'
                : '--',
              subTitle: allFormValues.payee.payee ? allFormValues.payee.payee.accountNumber : '--',
            },
          ]}
        />
        {toAccount === 'new_payee' && (
          <BaseCheckbox
            value={[allFormValues.payee.savePayee]}
            options={[t('selectPayee.save_payee')]}
            onChange={(newValue) =>
              onChangeOtherForm('payee', {
                ...allFormValues.payee,
                savePayee: newValue[0],
              })
            }
            disableTranslation
          />
        )}
        <EditStepButton onClick={() => onEditClick(formStepsEnum.PAYEE)} />
      </div>
    )
  }

  return (
    <div className={`select-account-wrap ${toAccount !== null ? 'to-account-selected' : ''}`}>
      <div className="top-title">{t('select_account')}</div>
      <div className="select-account">
        <div className="from-account">
          <BaseForm fields={fromAccountFields} disableTranslation />
          {account !== null && (
            <div className="available-balance desktop-show tablet-hide">
              {t('available_balance')}: <span className="balance-amount">{formattedBalance}</span>
            </div>
          )}
        </div>
        <div className="to-account">
          {account !== null && (
            <>
              <img
                src="/assets/mobile-back.svg"
                alt="to account"
                className="desktop-show tablet-hide"
              />
              <BaseForm fields={toAccountFields} disableTranslation />
            </>
          )}
        </div>
        <div className="desktop-hide tablet-show">
          {account !== null && <AccountInfo account={account} balance={formattedBalance} />}
        </div>
      </div>
    </div>
  )
}
