import React from 'react'
import './styles.scss'

export interface ILoginTopBarProps {
  title: string
  onBackClick: () => void
}

export const LoginTopBar: React.FunctionComponent<ILoginTopBarProps> = (props) => {
  const { title, onBackClick } = props

  return (
    <div className="login-top-bar tablet-show desktop-hide">
      <div className="icon-arrow" onClick={() => onBackClick()} />
      <span>{title}</span>
      <img src="/assets/question-bold-white.svg" alt="question" />
    </div>
  )
}
