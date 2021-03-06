import React from 'react'
import { Modal } from 'react-bootstrap'
import './styles.scss'

export interface IFlexDialogProps {
  fullHeight?: boolean
  className?: string
}

export const FlexDialog: React.FunctionComponent<IFlexDialogProps> = ({
  children,
  fullHeight,
  className,
}) => {
  return (
    <Modal.Dialog className={`flex-dialog ${fullHeight ? 'full-height' : ''} ${className || ''}`}>
      {children}
    </Modal.Dialog>
  )
}
