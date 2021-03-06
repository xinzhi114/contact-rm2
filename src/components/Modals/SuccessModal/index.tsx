import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../BaseModal'
import './styles.scss'

interface ISuccessModalProps {
  title: string
  successText: string | JSX.Element
  customModalFooterContent?: string | JSX.Element
  onClose?: () => void
  mobileFullScreen?: boolean
  className?: string
}

const SuccessModal: React.FunctionComponent<ISuccessModalProps> = (props) => {
  const { t } = useTranslation()
  const {
    title,
    successText,
    customModalFooterContent,
    onClose,
    children,
    mobileFullScreen,
    className,
  } = props

  return (
    <BaseModal
      className={`success-modal ${mobileFullScreen ? 'mobile-full-screen' : ''} ${
        className ? className : ''
      }`}
      whiteClose
      title={
        <>
          <img className="mobile-success" src="/assets/success-check.svg" alt="success" />
          {title}
        </>
      }
      primaryText={t('common.btns.dismiss')}
      onClose={() => {
        if (onClose) {
          onClose()
        }
      }}
      customModalFooterContent={customModalFooterContent}
    >
      <img src="/assets/download-success.svg" alt="icons" />
      <span>{successText}</span>
      {children}
    </BaseModal>
  )
}

export default SuccessModal
