import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import { BaseTextarea } from '../../../components/BaseForm/BaseFormFields/BaseTextarea'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

export interface IInitiateAccountClosureModalWindowProps {
  t: any
  reasonDropdownOptions?: string[]
  productForAutoClosure: {
    title: string
    category: string
  }[]
  onApply?: any
  onClose?: any
}

interface IInitiateAccountClosureModalWindowState {
  reasonSelection?: string
  specifyReason?: string
}

export class InitiateAccountClosureModalWindow extends Component<
  IInitiateAccountClosureModalWindowProps,
  IInitiateAccountClosureModalWindowState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      reasonSelection: 'Select',
      specifyReason: '',
    }
  }

  // handle Input Change
  handleInputChange(fieldName: string, event: any) {
    this.setState({
      [fieldName]: event.target.value.toString(),
    })
  }

  // on change dropdown
  onChangeDropdown = (event: any) => {
    this.setState({
      reasonSelection: event,
    })
  }

  formValid() {
    if (this.state.reasonSelection !== 'Select') {
      if (this.state.reasonSelection !== 'Other') {
        return true
      } else {
        if (this.state.specifyReason !== '') {
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  }

  render() {
    const { t } = this.props
    const { reasonDropdownOptions, productForAutoClosure } = { ...this.props }

    const { reasonSelection, specifyReason } = { ...this.state }

    return (
      <div className="modal-default initiate-account-closure-modal">
        <div className="modal-mains">
          <div className="title-area">
            <div className="blue-title">
              {t('accountsDashboard.initiateAccountClosureModalWindow.initiate_account_closure')}
            </div>
          </div>

          <div className="modal-info">
            <div className="row-line">
              <div className="title flex-grid">
                {t('accountsDashboard.initiateAccountClosureModalWindow.reason_for_closure')}

                <a
                  href="#javascript"
                  className="icons icon-question label-transparent"
                  onClick={(event) => event.preventDefault()}
                >
                  {t('common.btns.question')}
                </a>
              </div>
              <Dropdown bsPrefix="drop-module" onSelect={(event) => this.onChangeDropdown(event)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic-reason">
                  {t('common.dynamicLabels.' + reasonSelection)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {!!reasonDropdownOptions &&
                    reasonDropdownOptions.map((item, index) => (
                      <Dropdown.Item eventKey={item} key={index}>
                        {t('common.dynamicLabels.' + item)}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {reasonSelection === 'Other' && (
              <div className="row-line">
                <BaseTextarea
                  placeholder={t(
                    'accountsDashboard.initiateAccountClosureModalWindow.specify_your_reason'
                  )}
                  value={specifyReason ? specifyReason : ''}
                  onChange={(event) => this.handleInputChange('specifyReason', event)}
                />
              </div>
            )}
            <div className="row-line">
              <div className="title">
                {t('accountsDashboard.initiateAccountClosureModalWindow.product_auto_closure')}
              </div>
              <div className="four-gray">
                {productForAutoClosure &&
                  productForAutoClosure.map((item, index) => (
                    <div className="items" key={index}>
                      <a
                        href="#javascript"
                        className="blue-txt"
                        onClick={(event) => event.preventDefault()}
                      >
                        {item.title}
                      </a>
                      <div className="gray-txt">{item.category}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              classNameContainer={!this.formValid() ? 'disabled' : ''}
              label={t('common.btns.submit_request')}
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
export default withTranslation()(InitiateAccountClosureModalWindow)
