import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

const IconStar: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <a
      href="#javascript"
      className="icons icon-star label-transparent"
      onClick={(event) => event.preventDefault()}
    >
      {t('common.btns.star')}
    </a>
  )
}

export default IconStar
