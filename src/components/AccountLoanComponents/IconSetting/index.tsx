import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IIconSettingProps {
  isActive: boolean
  onClick: any
}

const IconSetting: React.FunctionComponent<IIconSettingProps> = (props) => {
  const { t } = useTranslation()
  const { isActive } = { ...props }

  return (
    <a
      href="#javascript"
      className={`icons icon-line-setting label-transparent ${isActive ? 'enabled' : ''}`}
      onClick={(event) => {
        props.onClick()
        event.preventDefault()
      }}
    >
      {t('common.btns.setting')}
    </a>
  )
}

export default IconSetting
