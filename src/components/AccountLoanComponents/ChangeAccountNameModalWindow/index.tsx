import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

export interface IChangeAccountNameModalWindowProps {
  t: any
  accountName: string
  onApply?: any
  onClose?: any
}

interface IChangeAccountNameModalWindowState {
  accountName?: string
}

export class ChangeAccountNameModalWindow extends Component<
  IChangeAccountNameModalWindowProps,
  IChangeAccountNameModalWindowState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      accountName: this.props.accountName,
    }
  }

  // handle Input Change
  handleInputChange(fieldName: string, event: any) {
    this.setState({
      [fieldName]: event.target.value.toString(),
    })
  }

  // clear Input
  clearInput(fieldName: string) {
    this.setState({
      [fieldName]: '',
    })
  }

  render() {
    const { t } = this.props
    const { accountName } = { ...this.state }

    return (
      <div className="modal-default change-account-name-modal">
        <div className="modal-mains">
          <div className="title-area">
            <div className="blue-title">
              {t('accountsDashboard.changeAccountNameModalWindow.change_account_name')}
            </div>
          </div>

          <div className="modal-info">
            <div className="row-line">
              <div className="title flex-grid">
                {t('accountsDashboard.changeAccountNameModalWindow.account_name')}
                <a
                  href="#javascript"
                  className="icons icon-question label-transparent"
                  onClick={(event) => event.preventDefault()}
                >
                  {t('common.btns.question')}
                </a>
              </div>
              <div className="date-boxs">
                <BaseTextInput
                  id="accountName"
                  value={accountName || ''}
                  onChange={(event) => this.handleInputChange('accountName', event)}
                >
                  <span
                    className="icons icon-del "
                    onClick={() => this.clearInput('accountName')}
                  />
                </BaseTextInput>
              </div>
            </div>
            <div className="row-line" />
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              classNameContainer={accountName === '' ? 'disabled' : ''}
              label={t('common.btns.save')}
              href={'#javascript'}
              isButton
              onClick={() => {
                this.props.onApply()
              }}
            />

            <BaseTextLinkButton
              label={t('common.btns.cancel')}
              href={'#javascript'}
              onClick={() => {
                this.props.onClose()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(ChangeAccountNameModalWindow)
