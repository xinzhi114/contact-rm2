import React from 'react'
import { LoadingSpinner } from '../../LoadingSpinner'
import './styles.scss'

export interface ILoadingToastProps {
  messageText: string
}

export const LoadingToast: React.FunctionComponent<ILoadingToastProps> = (props) => {
  const { messageText } = props

  return (
    <div className="loading-toast">
      <LoadingSpinner />
      <span>{messageText}</span>
    </div>
  )
}
