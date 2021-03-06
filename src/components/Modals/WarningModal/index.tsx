import React from 'react'
import { BaseModal } from '../BaseModal'
import './styles.scss'

export interface IWarningModalProps {
  title: JSX.Element
  onClose: () => void
  footerContent: JSX.Element
  className?: string
}

export const WarningModal: React.FunctionComponent<IWarningModalProps> = (props) => {
  const { children, title, onClose, footerContent, className } = props

  return (
    <BaseModal
      className={`warning-modal ${className ? className : ''}`}
      title={title}
      blackClose
      onClose={onClose}
      customModalFooterContent={footerContent}
    >
      <img src="/assets/caution.png" className="caution" alt="caution" />
      {children}
    </BaseModal>
  )
}
