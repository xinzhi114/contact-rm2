import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IReactiveAccountModalWindowProps {
  accountName: string
  onClose?: any
  onSubmit?: any
}

const ReactiveAccountModalWindow: React.FunctionComponent<IReactiveAccountModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const [accountName] = useState(props.accountName)

  return (
    <div className="modal-default reactive-account-amount-modal">
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
          <div className="blue-title">{t('accountsDashboard.quickActions.reactive_account')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            {t('accountsDashboard.quickActions.are_you_sure_want_reactive_account')} <br />
            <strong>{accountName}</strong>?
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={t('common.btns.submit')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onSubmit()
            }}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
            href={'#javascript'}
            onClick={(event: any) => {
              props.onClose()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
export default ReactiveAccountModalWindow
