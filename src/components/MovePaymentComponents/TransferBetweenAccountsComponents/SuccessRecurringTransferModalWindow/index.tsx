import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface ISuccessRecurringTransferModalWindowProps {
  messageText: string
  onClose?: any
}

const SuccessRecurringTransferModalWindow: React.FunctionComponent<ISuccessRecurringTransferModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const { messageText } = { ...props }

  return (
    <div className="modal-default success-transfer-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close label-transparent"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          {t('common.btns.close')}
        </a>
        <div className="title-area">
          <div className="blue-title">
            {t('movePaymentTransferBetweenAccounts.successTransferModalWindow.recurring_transfer')}
          </div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="icons done-icons">
                <img src="/assets/Illustrations-confirm.svg" alt="img" className="center-img" />
              </div>
              <div className="white-txt">{messageText}</div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={t('movePaymentTransferBetweenAccounts.successTransferModalWindow.complete')}
            href={'/movePaymentPages'}
            isNavLink
            isButton
          />

          <BaseTextLinkButton
            classNameContainer="btn-txt-link"
            label={t(
              'movePaymentTransferBetweenAccounts.successTransferModalWindow.view_my_standing_orders'
            )}
            href={'#javascript'}
          />
        </div>
      </div>
    </div>
  )
}

export default SuccessRecurringTransferModalWindow
