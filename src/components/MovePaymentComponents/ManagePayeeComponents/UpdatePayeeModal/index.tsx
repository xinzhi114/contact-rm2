import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import { BaseModal } from '../../../Modals/BaseModal'
import { PayeeForm } from '../PayeeForm'
import './styles.scss'
import { Payee } from '../../../../containers/MovePaymentPages/ManagePayees'

export interface IUpdatePayeeModalProps {
  isUkPayee: boolean
  payee: Payee
  onUpdate: (newPayeeValues: { [field: string]: string }) => void
  onClose: () => void
}

export const UpdatePayeeModal: React.FunctionComponent<IUpdatePayeeModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.updatePayeeModal.${key}`)

  const { isUkPayee, payee, onUpdate, onClose } = props

  const [formValue, setFormValue] = useState<{ [field: string]: string } | null>(null)

  const enablePrimary = formValue !== null && !_.values(formValue).some((value) => value === '')

  return (
    <BaseModal
      primaryText={t('primary')}
      enablePrimary={enablePrimary}
      blackClose
      title={<>{t('title')}</>}
      className="update-payee-modal"
      onPrimaryClick={() => formValue !== null && onUpdate(formValue)}
      onClose={() => onClose()}
      ignoreCloseOnAction
    >
      <PayeeForm
        isUkPayee={isUkPayee}
        initialPayee={payee}
        onChange={(newValue) => setFormValue(newValue)}
      />
    </BaseModal>
  )
}
