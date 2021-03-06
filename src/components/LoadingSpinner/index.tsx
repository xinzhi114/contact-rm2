import React from 'react'
import './styles.scss'

export const LoadingSpinner: React.FunctionComponent = () => {
  return (
    <div className="loading-spinner">
      <img src="/assets/loading-spinner.png" alt="loading" />
    </div>
  )
}

export default LoadingSpinner
