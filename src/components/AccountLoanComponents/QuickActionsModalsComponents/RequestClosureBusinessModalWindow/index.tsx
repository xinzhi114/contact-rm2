import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IRequestClosureBusinessModalWindowProps {
  onClose?: any
  onSubmit?: any
}

const RequestClosureBusinessModalWindow: React.FunctionComponent<IRequestClosureBusinessModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  return (
    <div className="modal-default request-closure-modal">
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
          <div className="blue-title">{t('accountsDashboard.quickActions.request_closure')}</div>
        </div>

        <div className="modal-info">
          <div
            className="row-line"
            dangerouslySetInnerHTML={{
              __html: t('accountsDashboard.quickActions.you_will_be_redirected_to_secure_mail'),
            }}
          />
          <div className="row-line">
            {t('accountsDashboard.quickActions.are_you_sure_want_to_navigate_away')}
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
export default RequestClosureBusinessModalWindow
