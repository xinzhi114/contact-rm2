import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IGeneralGrayConfirmModalWindowProps {
  titleText: string
  messageText: string
  confirmBtnText: string
  href?: string
  onClose?: any
  onConfirm?: any
}

const GeneralGrayConfirmModalWindow: React.FunctionComponent<IGeneralGrayConfirmModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const { titleText, messageText, confirmBtnText, href } = { ...props }

  return (
    <div className={`modal-default general-gray-confirm-modal gray-bg`}>
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
          <span className="icon-info" />
          <div className="blue-title">{titleText}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="white-txt" dangerouslySetInnerHTML={{ __html: messageText }} />
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={confirmBtnText}
            href={href}
            isNavLink={!!href}
            isButton
            onClick={() => {
              props.onConfirm()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralGrayConfirmModalWindow
