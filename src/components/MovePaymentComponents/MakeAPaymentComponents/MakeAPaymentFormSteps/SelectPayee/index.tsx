import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as _ from 'lodash'
import { ReviewFormStepComponent } from '../../../../../constants/reviewableForm/reviewableForm'
import { BaseCheckbox } from '../../../../BaseForm/BaseFormFields/BaseCheckbox'
import { PayeeForm } from '../../../ManagePayeeComponents/PayeeForm'
import { useTranslation } from 'react-i18next'
import { Payee } from '../../../../../containers/MovePaymentPages/ManagePayees'
import { PayeeList } from '../../../PayeeList'
import { SelectPayeeTypeButtonGroup } from '../../../../../containers/MovePaymentPages/SelectPayeeTypeButtonGroup'
import { SearchBarPayee } from '../../../SearchBarPayee'
import './styles.scss'
import { getMovePaymentManagePayeesData } from '../../../../../store/actions/dataAction'
import { formatAmount, getCurrencySymbol } from '../../../../../services/Util'
import {
  initialMakeAPaymentFormValue,
  MakeAPaymentFormValue,
  SelectPayeeFormValue,
} from '../../../../../constants/reviewableForm/makeAPayment'
import { IMakeAPaymentFormStepsEnum } from '../../../../../config/makeAPayment'

export const SelectPayee: ReviewFormStepComponent<
  SelectPayeeFormValue,
  MakeAPaymentFormValue,
  IMakeAPaymentFormStepsEnum
> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.selectPayee.${key}`)
  const dispatch = useDispatch()

  const dataList = useSelector<any>((state) =>
    state.dataReducer.movePaymentManagePayees
      ? state.dataReducer.movePaymentManagePayees.dataList
      : null
  ) as {
    ukPayees: Payee[]
    nonUkPayees: Payee[]
  } | null

  const [searchText, setSearchText] = useState<string>('')
  const [searchBarExpanded, setSearchBarExpanded] = useState(false)
  const [showTablet, setShowTablet] = useState<boolean>(false)

  const {
    formValue,
    allFormValues,
    onChange,
    onChangeOtherForm,
    onChangeAllForms,
    onEditClick,
    review,
    formStepsEnum,
  } = props

  const filteredPayees = dataList
    ? (!allFormValues.payment.international
        ? dataList.ukPayees
        : dataList.nonUkPayees
      ).filter((p) =>
        _.values(p).some((v) => v && v.toLowerCase().includes(searchText.toLowerCase()))
      )
    : []

  useEffect(() => {
    dispatch(getMovePaymentManagePayeesData())
  }, [dispatch])

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setShowTablet(e.matches)
    }
    setShowTablet(mql.matches)
    mql.addEventListener('change', handleResize)
    return () => {
      mql.removeEventListener('change', handleResize)
    }
  }, [])

  if (review) {
    return <></>
  }

  return (
    <div className="select-payee">
      {allFormValues.account.toAccount === 'new_payee' ? (
        <PayeeForm
          isUkPayee={!allFormValues.payment.international}
          payee={formValue.payee}
          onChange={(newPayee) =>
            onChange({
              ...formValue,
              payee: newPayee as Payee,
            })
          }
        />
      ) : (
        allFormValues.account.toAccount !== null && (
          <>
            <div className="payee-list-top-bar">
              <div className="left-title desktop-show tablet-hide">
                <img src="/assets/payee.svg" alt="payees" />
                <span>{_t(`movePaymentMakeAPayment.${allFormValues.account.toAccount}`)}</span>
              </div>
              <div className="right-actions">
                <SearchBarPayee
                  value={searchText}
                  onChange={(newValue) => setSearchText(newValue)}
                  onToggle={() => setSearchBarExpanded(!searchBarExpanded)}
                  expanded={searchBarExpanded}
                />
                <SelectPayeeTypeButtonGroup
                  ukPayeesOnly={!allFormValues.payment.international}
                  setUkPayeesOnly={(domestic) =>
                    onChangeOtherForm('payment', {
                      ...allFormValues.payment,
                      international: !domestic,
                    })
                  }
                  domesticOrInternationalLabels
                />
              </div>
            </div>
            <PayeeList
              hideActionIcons
              payees={
                allFormValues.account.toAccount === 'existing_payee'
                  ? filteredPayees
                  : filteredPayees.map((p) => ({
                      ...p,
                      amount: `${getCurrencySymbol('GBP')} ${formatAmount(1)}`,
                    }))
              }
              viewMode={showTablet ? 'grid' : 'list'}
              onPayeeClick={(payee) => {
                const newPayee = _.cloneDeep(payee)
                delete newPayee.amount
                if (allFormValues.account.toAccount === 'existing_payee') {
                  onChangeAllForms({
                    ...initialMakeAPaymentFormValue,
                    account: allFormValues.account,
                    payee: {
                      payee: newPayee,
                      savePayee: false,
                    },
                    payment: {
                      ...initialMakeAPaymentFormValue.payment,
                      international: allFormValues.payment.international,
                    },
                  })
                  onEditClick(formStepsEnum.PAYMENT)
                } else {
                  // Get data from API instead
                  onChangeAllForms({
                    ...initialMakeAPaymentFormValue,
                    account: allFormValues.account,
                    payee: {
                      payee: newPayee,
                      savePayee: false,
                    },
                    date: {
                      date: new Date(),
                    },
                    moreDetails: {
                      reference: 'mock reference',
                      spentCategory: ['bills'],
                    },
                    payment: {
                      ...allFormValues.payment,
                      currency: !allFormValues.payment.international
                        ? _t('movePaymentMakeAPayment.selectPayment.pound')
                        : _t('movePaymentMakeAPayment.selectPayment.euro'),
                      amount: payee.amount ? payee.amount.split(' ')[1] : '',
                      paymentMethod: allFormValues.payment.international ? 'sepa' : 'chaps',
                      acceptRatesAndFees: true,
                    },
                  })
                  onEditClick(formStepsEnum.FINAL_REVIEW)
                }
              }}
            />
          </>
        )
      )}

      {allFormValues.account.toAccount === 'new_payee' && (
        <div>
          <BaseCheckbox
            value={[formValue.savePayee]}
            options={[t('save_payee')]}
            onChange={(newValue) =>
              onChange({
                ...formValue,
                savePayee: newValue[0],
              })
            }
            disableTranslation
          />
        </div>
      )}
    </div>
  )
}
