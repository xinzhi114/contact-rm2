import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'
import { noActivity } from '../../config'
import { withTranslation } from 'react-i18next'
import './styles.scss'

interface IActivityDetectionProps {
  t: any
}

interface IActivityDetectionState {
  showType?: string
}

export class ActivityDetection extends Component<IActivityDetectionProps, IActivityDetectionState> {
  idleTimer: any
  timer: any
  constructor(props: any) {
    super(props)

    this.idleTimer = null
    this.state = {
      showType: '',
    }
  }

  // click Dismiss
  clickDismiss() {
    clearTimeout(this.timer)

    this.setState({
      showType: '',
    })
  }

  handleOnIdle() {
    if (this.state.showType === '') {
      this.setState({
        showType: 'Warning',
      })

      this.timer = setTimeout(() => {
        this.setState({
          showType: 'Error',
        })
      }, noActivity.logoutTimeout)
    }
  }

  render() {
    const { t } = this.props
    const { showType } = { ...this.state }

    return (
      <React.Fragment>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref
          }}
          timeout={noActivity.notificationTimeout}
          onIdle={() => this.handleOnIdle()}
          debounce={250}
        />
        {showType === 'Warning' && (
          <div className="color-tips flex-grid yellow">
            <div className="lefts flex">
              <i className="icons icon-time" />
              <div className="txt">
                {t('common.activityDetection.we_detected')}{' '}
                <span className="bold">{t('common.activityDetection.two_minutes')}.</span>
              </div>
            </div>
            <div className="rights">
              <a
                href="#javascript"
                className="blue-link"
                onClick={(event) => {
                  this.clickDismiss()
                  event.preventDefault()
                }}
              >
                {t('common.btns.dismiss')}
              </a>
            </div>
          </div>
        )}

        {showType === 'Error' && (
          <div className="red-tip-wrap">
            <div className="color-tips flex-grid red">
              <div className="lefts flex">
                <i className="icons icon-time" />
                <div className="txt">{t('common.activityDetection.session_expired')}</div>
              </div>
              <div className="rights">
                <NavLink to="/" className="white-link">
                  {t('common.activityDetection.return_to_login_page')}
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

// @ts-ignore
export default withTranslation()(ActivityDetection)
