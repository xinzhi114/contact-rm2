import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import SelectComponent from '../../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/SelectComponent'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'

interface IRequestClosureIndividualModalWindowProps {
  fromAccountList: {
    label: string
    value: string
    number: string
    availableBalance: string
  }[]
  onClose?: any
  onConfirm?: any
}

const RequestClosureIndividualModalWindow: React.FunctionComponent<IRequestClosureIndividualModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.quickActions.${key}`)

  const [fromAccountList] = useState(props.fromAccountList)

  const [internalTransfer, setInternalTransfer] = useState(true)
  const [withdrawalToNominatedAccount, setWithdrawalToNominatedAccount] = useState(false)

  const [fromAccount, setFromAccount] = useState('')
  const [fromAccountId, setFromAccountId] = useState('')

  const [toAccount, setToAccount] = useState('')
  const [toAccountId, setToAccountId] = useState('')

  const [transferAmount, setTransferAmount] = useState('')

  // is Enabled Update
  const isEnabledUpdate = () => {
    let pass = true

    if (
      fromAccount === '' ||
      fromAccountId === '' ||
      toAccount === '' ||
      toAccountId === '' ||
      transferAmount === ''
    ) {
      pass = false
    }

    return pass
  }

  /**
   * save From data
   * @param data
   * @param accountPrompt
   */
  const setFromData = (data: any) => {
    setFromAccount(data.value)
    fromAccountList.forEach((item: any) => {
      if (item.value === data.value) {
        setFromAccountId(item.number)
      }
    })
  }

  /**
   * save To data
   * @param data
   * @param accountPrompt
   */
  const setToData = (data: any) => {
    setToAccount(data.value)
    fromAccountList.forEach((item: any) => {
      if (item.value === data.value) {
        setToAccountId(item.number)
      }
    })
  }

  // click Confirm
  const clickConfirm = (buttonLabel: string) => {
    props.onConfirm({
      buttonLabel,
      fromAccount,
      fromAccountId,
      toAccount,
      toAccountId,
      transferAmount,
    })
  }

  return (
    <div className="modal-default request-closure-individual-modal">
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
          <div className="blue-title">{t('request_closure')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line radio-bar">
            <div className="description-txt">{t('select_how_the_remaining_balance')}</div>

            <div className="radio-group">
              <div className="radio-wrap">
                <input
                  type="radio"
                  name="how-to-send"
                  id="internalTransfer"
                  checked={internalTransfer}
                  onChange={(event) => {
                    setInternalTransfer(event.target.checked)
                    setWithdrawalToNominatedAccount(false)
                  }}
                />
                <label htmlFor="internalTransfer">{t('internal_transfer')}</label>
              </div>
              <div className="radio-wrap">
                <input
                  type="radio"
                  name="how-to-send"
                  id="withdrawalToNominatedAccount"
                  checked={withdrawalToNominatedAccount}
                  onChange={(event) => {
                    setInternalTransfer(false)
                    setWithdrawalToNominatedAccount(event.target.checked)
                  }}
                />
                <label htmlFor="withdrawalToNominatedAccount">
                  {t('withdrawal_to_nominated_account')}
                </label>
              </div>
            </div>
          </div>

          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('from_account')}</div>
              <div className="control-item">
                <SelectComponent
                  id="dropdown-basic-select-from"
                  t={t}
                  label="debitAccount"
                  data={props.fromAccountList}
                  defaultValue={`${fromAccount} - ${fromAccountId}`}
                  callBack={(event: any) => {
                    setFromData(event)
                  }}
                />
              </div>
            </div>

            <div className="icons icon-arrow">&nbsp;</div>

            <div className="items">
              <div className="label-txt">{t('to_account')}</div>
              <div className="control-item">
                <SelectComponent
                  id="dropdown-basic-select-to"
                  t={t}
                  label="debitAccount"
                  data={props.fromAccountList}
                  defaultValue={`${toAccount} - ${toAccountId}`}
                  callBack={(event: any) => {
                    setToData(event)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('transfer_amount')}</div>
              <div className="control-item">
                <BaseTextInput
                  id="transferAmount"
                  placeholder={_t('common.labels.enter_value')}
                  showCurrency={true}
                  pattern="[0-9]{0,15}"
                  value={transferAmount}
                  onChange={(event: any) => {
                    setTransferAmount(
                      formValidationSvc.validateInputEnteringPattern(event, transferAmount)
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          {internalTransfer && (
            <BaseTextLinkButton
              classNameContainer={`${isEnabledUpdate() ? '' : 'disabled'}`}
              label={_t('common.btns.confirm_transfer')}
              href={'#javascript'}
              isButton={true}
              onClick={() => {
                clickConfirm('confirm_transfer')
              }}
            />
          )}

          {withdrawalToNominatedAccount && (
            <React.Fragment>
              <BaseTextLinkButton
                classNameContainer={`${isEnabledUpdate() ? '' : 'disabled'}`}
                label={_t('common.btns.confirm_withdrawal')}
                href={'#javascript'}
                isButton={true}
                onClick={() => {
                  clickConfirm('confirm_withdrawal')
                }}
              />

              <BaseTextLinkButton
                classNameContainer={`${isEnabledUpdate() ? '' : 'disabled'}`}
                label={_t('common.btns.change_nominated_account')}
                href={'#javascript'}
                isButton={true}
                onClick={() => {
                  clickConfirm('change_nominated_account')
                }}
              />
            </React.Fragment>
          )}

          <BaseTextLinkButton
            label={_t('common.btns.cancel')}
            href={'#javascript'}
            onClick={() => {
              props.onClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
export default RequestClosureIndividualModalWindow
