import React from 'react'
import './styles.scss'

export interface IReviewFormStepProps {
  component: JSX.Element
  review?: boolean
  noWrap?: boolean
}

export const ReviewFormStep: React.FunctionComponent<IReviewFormStepProps> = ({
  component,
  review,
  noWrap,
}) => {
  return (
    <div className={`form-step ${review && !noWrap ? 'review' : ''}`}>
      {React.cloneElement(component, { review, noWrap })}
    </div>
  )
}
