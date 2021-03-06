import React from 'react'
import './styles.scss'

export interface IEditStepButtonProps {
  onClick: () => void
}

export const EditStepButton: React.FunctionComponent<IEditStepButtonProps> = ({ onClick }) => {
  return (
    <div className="edit-step-button" onClick={() => onClick()}>
      <img src="/assets/edit-green.svg" alt="edit" />
    </div>
  )
}
