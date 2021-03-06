import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IReactivateISACheckModalWindowProps {
  accountName: string
  accountNumber: string
  onClose?: any
}

const ReactivateISACheckModalWindow: React.FunctionComponent<IReactivateISACheckModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const [accountName] = useState(props.accountName)
  const [accountNumber] = useState(props.accountNumber)

  return (
    <div className="modal-default request-closure-submitted-modal">
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
          <div className="blue-title">{t('accountsDashboard.quickActions.request_submitted')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="icons done-icons">
                <img src="/assets/Illustrations-confirm.svg" alt="svg" />
              </div>
              <div className="white-txt">
                <div className="row-txt">
                  {t('accountsDashboard.quickActions.thank_you_for_reaching_us')}
                </div>
                {t('accountsDashboard.quickActions.we_would_respond')}{' '}
                <span className="bold-txt">13-Nov-2020</span>.&nbsp;
                {t('accountsDashboard.quickActions.we_will_send_message')}
              </div>
            </div>
          </div>
          <div className="bottom-data">
            <div className="group">
              <div className="top-label">{t('accountsDashboard.quickActions.account_name')}</div>
              <div className="values">{accountName}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('accountsDashboard.quickActions.account_number')}</div>
              <div className="values">{accountNumber}</div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={t('common.btns.confirm')}
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

export default ReactivateISACheckModalWindow
