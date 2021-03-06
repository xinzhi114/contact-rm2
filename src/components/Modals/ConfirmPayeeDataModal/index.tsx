import React from 'react'
import { useTranslation } from 'react-i18next'
import { IListItem } from '../../../constants/layout'
import { Payee } from '../../../containers/MovePaymentPages/ManagePayees'
import { FlexList } from '../../FlexLayoutComponents/FlexList'
import { BaseModal } from '../BaseModal'
import './styles.scss'

export interface IConfirmPayeeDataModalProps {
  payee: Payee
  onConfirm: () => void
  onUpdateData: () => void
}

export const ConfirmPayeeDataModal: React.FunctionComponent<IConfirmPayeeDataModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentMakeAPayment.confirmPayeeDataModal.${key}`)

  const { payee, onConfirm, onUpdateData } = props

  const items: IListItem[] = [
    {
      label: t('name'),
      value: payee.name,
    },
    {
      label: t('account_number'),
      value: payee.accountNumber,
    },
  ]

  if (payee.bic !== undefined) {
    items.push(
      ...[
        {
          label: t('iban'),
          value: payee.iban,
        },
        {
          label: t('bic'),
          value: payee.bic,
        },
      ]
    )
  } else {
    items.push({
      label: t('sort_code'),
      value: payee.sortCode as string,
    })
  }

  return (
    <BaseModal
      title={<>{t('title')}</>}
      primaryText={t('primary')}
      secondaryText={t('secondary')}
      onPrimaryClick={() => onConfirm()}
      onSecondaryClick={() => onUpdateData()}
      className="confirm-payee-data-modal"
    >
      {t('message')}
      <FlexList items={items} />
    </BaseModal>
  )
}
