import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IGeneralConfirmModalWindowProps {
  titleText: string
  messageText: string
  confirmBtnText: string
  href?: string
  onClose?: any
}

const GeneralConfirmModalWindow: React.FunctionComponent<IGeneralConfirmModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const { titleText, messageText, confirmBtnText, href } = { ...props }

  return (
    <div className="modal-default general-confirm-modal">
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
          <div className="blue-title">{titleText}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="icons done-icons">
                <img src="/assets/Illustrations-confirm.svg" alt="img" className="center-img" />
              </div>
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
              props.onClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralConfirmModalWindow
