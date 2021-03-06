import React from 'react'
import { Container } from 'react-bootstrap'
import './styles.scss'

export interface IFlexContainerProps {
  className?: string
  flexDirection?: 'row' | 'column'
}

export const FlexContainer: React.FunctionComponent<IFlexContainerProps> = ({
  children,
  className,
  flexDirection,
}) => {
  return (
    <Container
      className={`flex-container ${className || ''} ${
        flexDirection === 'column' ? flexDirection : ''
      }`}
    >
      {children}
    </Container>
  )
}
