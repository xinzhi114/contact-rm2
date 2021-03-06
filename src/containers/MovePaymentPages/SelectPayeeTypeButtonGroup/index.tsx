import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export interface ISelectPayeeTypeButtonGroupProps {
  ukPayeesOnly: boolean
  setUkPayeesOnly: (newValue: boolean) => void
  className?: string
  domesticOrInternationalLabels?: boolean
}

export const SelectPayeeTypeButtonGroup: React.FunctionComponent<ISelectPayeeTypeButtonGroupProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.${key}`)
  const { ukPayeesOnly, setUkPayeesOnly, className, domesticOrInternationalLabels } = props

  return (
    <ButtonGroup className={`select-payee-type-button-group ${className ? className : ''}`}>
      <Button
        variant="primary"
        className={ukPayeesOnly ? '' : 'inactive'}
        onClick={() => !ukPayeesOnly && setUkPayeesOnly(true)}
      >
        {t(domesticOrInternationalLabels ? 'domestic' : 'uk_payees')}
      </Button>
      <Button
        variant="primary"
        className={!ukPayeesOnly ? '' : 'inactive'}
        onClick={() => ukPayeesOnly && setUkPayeesOnly(false)}
      >
        {t(domesticOrInternationalLabels ? 'international' : 'non_uk_payees')}
      </Button>
    </ButtonGroup>
  )
}
