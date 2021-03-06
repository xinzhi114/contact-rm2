import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IMessageInfoProps {
  messageType: string
  classes?: string
  onDismiss?: any
  extraText1?: string
  extraText2?: string
}

const MessageInfo: React.FunctionComponent<IMessageInfoProps> = (props) => {
  const { t } = useTranslation()
  const { messageType, classes, extraText1, extraText2 } = { ...props }

  return (
    <div className={`blue-tips flex-grid ${classes}`}>
      <div className="lefts flex">
        <i className="icons icon-done" />
        {messageType === 'showResetMessage' && (
          <div className="txt">{t('common.messageInfo.your_passcode_successfully_changed')}.</div>
        )}
        {messageType === 'showNewUserMessage' && (
          <div className="txt">{t('common.messageInfo.your_user_id_successfully_created')}.</div>
        )}
        {messageType === 'showAccountClosureMessage' && (
          <div className="txt">
            {t('common.messageInfo.your_account_closure_sent_successfully')}.
          </div>
        )}
        {messageType === 'showRequestConsolidated7YearSuccessMessage' && (
          <div className="txt">
            {t('common.messageInfo.request_consolidated_7_year_eStatement_submitted')}.
          </div>
        )}
        {messageType === 'showRequestCurrentTaxYearSuccessMessage' && (
          <div className="txt">{t('common.messageInfo.request_current_tax_year_submitted')}.</div>
        )}
        {messageType === 'showReactNativeSuccess' && (
          <div className="txt">
            {extraText2} {t('common.messageInfo.has_been_moved_to')} {extraText1}
          </div>
        )}
      </div>
      <BaseTextLinkButton
        label={t('common.btns.dismiss')}
        href={'#javascript'}
        onClick={() => {
          if (props.onDismiss) {
            props.onDismiss()
          }
        }}
      />
    </div>
  )
}

export default MessageInfo
