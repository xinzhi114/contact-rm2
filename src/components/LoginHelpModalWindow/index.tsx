import React from 'react'
import YouTube from 'react-youtube'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface ILoginHelpModalWindowProps {
  title: string
  videoId?: string
  onClose?: any
}

export const LoginHelpModalWindow: React.FunctionComponent<ILoginHelpModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const { title, videoId, onClose } = { ...props }

  const opts: any = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <div className="modal-panel">
      <div className="main-panel">
        <div className="top-panel">
          <div className="left-txt">{t('common.loginHelpModalWindow.' + title)}</div>
          <a
            href="#javascript"
            className="icons icon-close label-transparent"
            onClick={(event) => {
              if (onClose) {
                onClose()
              }
              event.preventDefault()
            }}
          >
            {t('common.btns.close')}
          </a>
        </div>
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  )
}
