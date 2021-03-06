import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import MarketingPreferencesForm from '../MarketingPreferencesForm'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import moment from 'moment'

interface IMarketingPreferencesModalWindowProps extends RouteComponentProps<any> {
  t: any
  onClose?: any
  lastUpdated?: string
}

interface IMarketingPreferencesModalWindowState {
  loading?: boolean
  lastUpdated?: string
}

export class MarketingPreferencesModalWindow extends Component<
  IMarketingPreferencesModalWindowProps,
  IMarketingPreferencesModalWindowState
> {
  formRef: any = undefined

  constructor(props: IMarketingPreferencesModalWindowProps) {
    super(props)

    this.state = { lastUpdated: props.lastUpdated }
  }

  onSave = () => {
    if (this.formRef) {
      this.setState({ loading: true })
      this.formRef.savePref(undefined, (ret: boolean) => {
        this.setState({ loading: false })
        if (ret) {
          this.props.onClose()
        }
      })
    }
  }
  // on Update
  onUpdate() {
    this.setState({ lastUpdated: undefined })
  }

  render() {
    const { t } = this.props
    const { lastUpdated } = { ...this.state }
    const isFirstTime = !lastUpdated

    return (
      <div className="modal-default marketing-preferences-modal">
        <div className="modal-mains">
          <a
            href="#javascript"
            className="btn-close label-transparent"
            onClick={(event) => {
              this.props.onClose()
              event.preventDefault()
            }}
          >
            {t('common.btns.close')}
          </a>
          <div className="title-area">
            <div className="blue-title">
              {t('marketingPreferences.marketingPreferencesModalWindow.marketing_preferences')}
            </div>
          </div>

          <div className="modal-info">
            {lastUpdated && (
              <div className="date-bar">
                <div className="lefts">
                  <div className="left-icons">
                    <i className="icons icon-calender" />
                  </div>
                  <div className="txt-area">
                    <div className="gray-txt">
                      {t('marketingPreferences.marketingPreferencesModalWindow.last_update')}
                    </div>
                    <div className="date-txt">{moment(lastUpdated).format('DD MMMM YYYY')}</div>
                  </div>
                </div>
              </div>
            )}
            <MarketingPreferencesForm
              ref={(r: any) => (this.formRef = r)}
              formType="modal"
              lastUpdated={lastUpdated}
            />
          </div>

          {isFirstTime && (
            <div className="bottom-btns">
              <BaseTextLinkButton
                label={t(
                  'marketingPreferences.marketingPreferencesModalWindow.save_my_preferences'
                )}
                href={'#javascript'}
                isButton
                loading={this.state.loading}
                onClick={this.onSave}
              />

              <BaseTextLinkButton
                label={t('common.btns.cancel')}
                href={'#javascript'}
                onClick={() => this.props.onClose()}
              />
            </div>
          )}

          {!isFirstTime && (
            <div className="bottom-btns">
              <BaseTextLinkButton
                label={t('marketingPreferences.marketingPreferencesModalWindow.update_preferences')}
                href={'#javascript'}
                isButton
                onClick={() => this.onUpdate()}
              />

              <BaseTextLinkButton
                label={t('marketingPreferences.marketingPreferencesModalWindow.keep_preferences')}
                href={'#javascript'}
                isButton
                loading={this.state.loading}
                onClick={() => this.onSave()}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(MarketingPreferencesModalWindow)
