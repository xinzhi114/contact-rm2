import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import * as _ from 'lodash'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'
import BaseForm from '../../BaseForm'
import { IBaseFormFields } from '../../../constants/baseForm'
import { PFMAccountOption } from '../PFMSelect'
import { GET_TIME_LINE_OPTIONS, getSpendCategory } from '../PFMConfigProvider'
import { amountToFloat, getCurrencySymbol } from '../../../services/Util'
import moment from 'moment'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'
import { PFMService } from '../../../common/Api/Services/PFMService'
import { showErrorMsg } from '../../Toast'

export interface IBudgetModalData {
  amount: number
  account: string
  frequency: string
  category: string
  currency: string
}

interface ICreateEditBudgetModalWindowProps {
  isEdit: boolean
  budgetModalData: IBudgetModalData
  accountFrequencyDropdownOptions: PFMAccountOption[]
  onSubmit?: any
  onClose?: any
}

export const CreateEditBudgetModalWindow: React.FunctionComponent<ICreateEditBudgetModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const { isEdit } = { ...props }
  const FREQUENCY_OPTIONS = GET_TIME_LINE_OPTIONS()
  const [loading, setLoading] = useState(false)
  const [budgetModalData, setBudgetModalData] = useState<IBudgetModalData>(
    _.cloneDeep(props.budgetModalData)
  )

  // on change dropdown
  const onChangeDropdown = (fieldName: string, event: any) => {
    setBudgetModalData({ ...budgetModalData, [fieldName]: event })
  }

  // handle Spend Limit Input Change
  const handleSpendLimitInputChange = (event: any, fieldNameValueCurrent?: string) => {
    const newV = formValidationSvc.validateInputEnteringPattern(event, fieldNameValueCurrent)
    setBudgetModalData({ ...budgetModalData, amount: newV })
  }

  /**
   * on submit
   */
  const onSubmit = () => {
    setLoading(true)
    const accParts = budgetModalData.account.split('-')
    const body = {
      accountType: accParts[0],
      accountNumber: accParts[1],
      currency: budgetModalData.currency,
      budgetCategory: budgetModalData.category,
      budgetFrequence: budgetModalData.frequency,
      budgetLimit: amountToFloat(budgetModalData.amount + ''),
      budgetStartDate: moment().format('YYYY-MM-DD'),
    }
    ASF.getService(PFMService)
      .updateBudget(body)
      .then(() => {
        props.onSubmit()
      })
      .catch((e) => {
        setLoading(false)
        showErrorMsg(e)
      })
  }

  // valid  Form
  const validForm = () => {
    return budgetModalData.amount + '' !== ''
  }

  const fields01: IBaseFormFields = {
    accountSelection: {
      type: 'dropdown',
      value: budgetModalData.account,
      label: 'financeManager.createEditBudgetModalWindow.account',
      className: 'date-boxs',
      disableTranslation: true,
      options: props.accountFrequencyDropdownOptions,
      onChange: (newValue) => onChangeDropdown('account', newValue),
    },
    frequencySelection: {
      type: 'dropdown',
      value: budgetModalData.frequency,
      label: 'financeManager.createEditBudgetModalWindow.frequency',
      className: 'date-boxs',
      disableTranslation: true,
      options: FREQUENCY_OPTIONS,
      onChange: (newValue) => {
        onChangeDropdown('frequency', newValue)
      },
    },
  }
  const fields02: IBaseFormFields = {
    spendLimit: {
      type: 'text',
      value: budgetModalData.amount.toString(),
      label: t('financeManager.createEditBudgetModalWindow.spend_limit', {
        symbol: getCurrencySymbol(budgetModalData.currency),
      }),
      pattern: '[0-9]{0,15}',
      onChange: (event) => handleSpendLimitInputChange(event, budgetModalData.amount + ''),
    },
  }

  return (
    <div className="modal-default create-edit-budget-modal">
      <div className="modal-mains">
        <div className="title-area">
          <div className="blue-title">
            {isEdit ? t('common.btns.edit') : t('common.btns.create')}{' '}
            {t('financeManager.createEditBudgetModalWindow.budget')}
            <a
              href="#javascript"
              className="icons right-close label-transparent mobile-close desktop-show"
              onClick={(event) => {
                if (props.onClose) {
                  props.onClose()
                }
                event.preventDefault()
              }}
            >
              {t('common.btns.close')}
            </a>
          </div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="title flex-grid">
              {getSpendCategory(budgetModalData.category).title}
            </div>
          </div>
          <BaseForm isShowHelp={false} fields={fields01} />
          <BaseForm isShowHelp={false} disableTranslation fields={fields02} />
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={!validForm() ? 'disabled' : ''}
            label={t('common.btns.submit')}
            href={'#javascript'}
            loading={loading}
            isButton
            onClick={onSubmit}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
            href={'#javascript'}
            onClick={() => {
              if (props.onClose) {
                props.onClose()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateEditBudgetModalWindow
