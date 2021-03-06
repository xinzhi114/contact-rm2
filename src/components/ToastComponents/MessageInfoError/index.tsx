import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IMessageInfoErrorProps {
  messageText: string
  timeout?: number
  realTxt?: boolean
  onClose?: () => void
  onRetry?: () => void
}

const MessageInfoError: React.FunctionComponent<IMessageInfoErrorProps> = (props) => {
  const { t } = useTranslation()
  const { messageText } = { ...props }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.onClose) {
        props.onClose()
      }
    }, props.timeout)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line
  }, [])

  /**
   * get txt of message
   */
  const getTxt = () => {
    return props.realTxt ? props.messageText : t('common.dynamicLabels.' + messageText)
  }

  /**
   * render button
   */
  const renderBtn = (title: string, cb?: () => void) => {
    return (
      <a
        href="#javascript"
        className="white-link"
        onClick={(event) => {
          if (cb) {
            cb()
          }
          event.preventDefault()
        }}
      >
        {title}
      </a>
    )
  }

  return (
    <div className="error-tip-wrap">
      <div className="error-color-tips flex-grid red">
        <div className="lefts flex">
          <i className="icons icon-time" />
          <div className="txt">{getTxt()}</div>
        </div>
        <div className="rights">
          {!!props.onClose
            ? renderBtn(t('common.close'), props.onClose)
            : renderBtn(t('common.btns.retry'), props.onRetry)}
        </div>
      </div>
    </div>
  )
}

export default MessageInfoError
