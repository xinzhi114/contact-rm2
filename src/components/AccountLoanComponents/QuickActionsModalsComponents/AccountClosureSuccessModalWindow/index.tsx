import React from 'react'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { amountToFloat, formatAmount } from '../../../../services/Util'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface RequestClosureIndividualData {
  buttonLabel: string
  fromAccount: string
  fromAccountId: string
  toAccount: string
  toAccountId: string
  transferAmount: string
}

interface IAccountClosureSuccessModalWindowProps {
  data: RequestClosureIndividualData
  onClose?: any
  onConfirm?: any
}

const AccountClosureSuccessModalWindow: React.FunctionComponent<IAccountClosureSuccessModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.quickActions.${key}`)

  const { data } = { ...props }

  return (
    <div className="modal-default account-closure-success-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          &nbsp;
        </a>
        <div className="title-area">
          <div className="blue-title">{t('account_closure_successfully')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="icons done-icons">
                <img src="/assets/Illustrations-confirm.svg" alt="svg" />
              </div>
              <div className="white-txt">{t('your_closure_request_has_been_received')}</div>
            </div>
          </div>
          <div className="bottom-data">
            <div className="group">
              <div className="top-label">{t('from_account')}</div>
              <div className="values">{data.fromAccount}</div>
              <div className="values">{data.fromAccountId}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('to_account')}</div>
              <div className="values">{data.toAccount}</div>
              <div className="values">{data.toAccountId}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('transfer_amount')}</div>
              <div className="values green-txt">
                £{formatAmount(amountToFloat(data.transferAmount))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={_t('common.btns.confirm')}
            href={'#javascript'}
            isButton
            onClick={(event: any) => {
              props.onConfirm()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountClosureSuccessModalWindow
