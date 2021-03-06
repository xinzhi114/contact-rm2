import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface ISpendingMovedModalWindowProps {
  t: any
  extraText1?: string
  extraText2?: string
  onDismiss?: any
}

class SpendingMovedModalWindow extends Component<ISpendingMovedModalWindowProps> {
  render() {
    const { t, extraText1, extraText2 } = this.props

    return (
      <div className="modal-default modal-spending-moved">
        <div className="modal-mains">
          <div className="title-area flex-grid">
            <div className="white-title">{t('common.messageInfo.spending_has_been_moved')}</div>
            <a
              href="#javascript"
              className="close-img"
              onClick={(event) => {
                this.props.onDismiss()
                event.preventDefault()
              }}
            >
              <img src="/assets/white-close.svg" alt="svg" className="img-icon" />
            </a>
          </div>
          <div className="center-info">
            <div className="big-img">
              <img src="/assets/Illustrations-confirm.svg" alt="img" className="center-img" />
            </div>
            <div className="p-txt">
              {extraText2} {t('common.messageInfo.has_been_moved_to')} {extraText1}
            </div>
          </div>
          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('common.btns.dismiss')}
              href={'#javascript'}
              isButton
              onClick={() => {
                this.props.onDismiss()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(SpendingMovedModalWindow)
