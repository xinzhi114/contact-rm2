import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../BaseForm/BaseFormFields/BaseTextInput'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

export interface ISearchBarPayeeProps {
  value: string
  expanded?: boolean
  onChange?: (newValue: string) => void
  onToggle?: () => void
}

export const SearchBarPayee: React.FunctionComponent<ISearchBarPayeeProps> = (props) => {
  const { t } = useTranslation()

  const { value, onChange, expanded, onToggle } = props

  return (
    <div className={`search-bar-payee ${expanded ? 'expanded' : ''}`}>
      <img
        src="/assets/search-payee.svg"
        alt="search payee name"
        className="desktop-show mobile-hide"
      />
      <img
        src="/assets/search-payee.svg"
        alt="search payee name"
        className="desktop-hide mobile-show"
        onClick={() => onToggle && onToggle()}
      />
      <BaseTextInput
        id="searchPayeeName"
        pattern="[\s\S]{0,50}"
        value={value}
        onChange={(event) =>
          onChange && onChange(formValidationSvc.validateInputEnteringPattern(event, value))
        }
        placeholder={t('movePaymentManagePayees.search_payee_name')}
      />
    </div>
  )
}
