import React from 'react'
import { useTranslation } from 'react-i18next'
import { ITransaction } from '../../../../constants/transaction'
import { BaseModal } from '../../../Modals/BaseModal'
import { PayeeDeletedDetails } from '../PayeeDeletedDetails'
import './styles.scss'

export interface IDeletePayeeModalProps {
  onDelete: (deleteTransactions?: boolean) => void
  onClose: () => void
  canceledTransactions: ITransaction[]
}

export const DeletePayeeModal: React.FunctionComponent<IDeletePayeeModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.deletePayeeModal.${key}`)

  const { onDelete, onClose, canceledTransactions } = props

  return (
    <BaseModal
      primaryText={t('primary')}
      onPrimaryClick={() => onDelete()}
      secondaryText={t('secondary')}
      onSecondaryClick={() => onDelete(true)}
      blackClose
      title={
        <>
          <img src="/assets/alert-circle.svg" alt="alert" className="alert-circle" /> {t('title')}
        </>
      }
      onClose={() => onClose()}
      className="delete-payee-modal"
      mobileFullScreen="simple-navbar"
      ignoreCloseOnAction
    >
      <div className="delete-warning">
        <span>{t('delete_warning')}</span>
        <span>{t('delete_confirmation')}</span>
      </div>
      <PayeeDeletedDetails canceledTransactions={canceledTransactions} />
    </BaseModal>
  )
}
