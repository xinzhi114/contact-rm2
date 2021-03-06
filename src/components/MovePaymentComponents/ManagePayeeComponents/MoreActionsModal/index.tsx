import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../../../Modals/BaseModal'
import './styles.scss'

export interface IMoreActionsModalProps {
  onUpdate: () => void
  onDelete: () => void
  onClose: () => void
}

export const MoreActionsModal: React.FunctionComponent<IMoreActionsModalProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.moreActionsModal.${key}`)
  const { onUpdate, onDelete, onClose } = props

  const actions = [
    {
      icon: 'green-update',
      text: 'update_payees',
      onClick: () => onUpdate(),
    },
    {
      icon: 'red-delete',
      text: 'delete_payees',
      onClick: () => onDelete(),
    },
  ]

  return (
    <BaseModal
      primaryText=""
      blackClose
      title={<>{t('title')}</>}
      className="more-actions-modal"
      onClose={() => onClose()}
    >
      <ul>
        {actions.map((action, index) => (
          <li key={index} onClick={action.onClick}>
            <div className="left-info">
              <img src={`/assets/${action.icon}.svg`} alt={t(action.text)} />
              {t(action.text)}
            </div>
            <img src="/assets/expend-blue-arrow.svg" alt="select" className="select-arrow" />
          </li>
        ))}
      </ul>
    </BaseModal>
  )
}
