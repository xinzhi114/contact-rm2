import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/auth'
import './styles.scss'

export interface ILogoutButtonProps {
  showLabel?: boolean
}

export const LogoutButton: React.FunctionComponent<ILogoutButtonProps> = ({ showLabel }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  return (
    <div
      className={`logout-button icons label-transparent icon-logout ${
        !showLabel ? 'mobile-hide' : 'show-label'
      }`}
      onClick={() => dispatch(logout())}
    >
      {showLabel ? t('common.labels.log_out') : ''}
    </div>
  )
}
