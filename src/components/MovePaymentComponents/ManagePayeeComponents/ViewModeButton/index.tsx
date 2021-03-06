import React from 'react'
import './styles.scss'

export interface IViewModeButtonProps {
  value: 'grid' | 'list'
  onChange?: (newMode: 'grid' | 'list') => void
}

export const ViewModeButton: React.FunctionComponent<IViewModeButtonProps> = (props) => {
  const { value, onChange } = props

  const getOppositeMode = () => {
    return value === 'grid' ? 'list' : 'grid'
  }

  return (
    <div className="view-mode-button" onClick={() => onChange && onChange(getOppositeMode())}>
      <img src={`/assets/${getOppositeMode()}-view.svg`} alt="view mode" />
    </div>
  )
}
