import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { data } from '../../../__mocks__/data/dataComposeEmail'
import './styles.scss'

export type IBaseModalProps = {
  title?: JSX.Element
  primaryText?: string | JSX.Element
  secondaryText?: string | JSX.Element
  customModalContent?: string | JSX.Element
  customModalFooterContent?: string | JSX.Element
  whiteClose?: boolean
  blackClose?: boolean
  mobileFullScreen?: 'full-navbar' | 'simple-navbar'
  className?: string
  show?: boolean
  flat?: boolean
  enablePrimary?: boolean
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  ignoreCloseOnAction?: boolean
  customRef?: React.Ref<any>
}

export const BaseModal: React.FunctionComponent<IBaseModalProps> = (props) => {
  const {
    className,
    children,
    title,
    show,
    flat,
    onClose,
    whiteClose,
    blackClose,
    mobileFullScreen,
    enablePrimary,
    customModalContent,
    customModalFooterContent,
    onPrimaryClick,
    onSecondaryClick,
    primaryText,
    secondaryText,
    ignoreCloseOnAction,
    customRef,
  } = props

  const handleButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, isPrimary?: boolean) => {
    if (onClose && !ignoreCloseOnAction) {
      onClose(e)
    }
    if (isPrimary) {
      if (onPrimaryClick) {
        onPrimaryClick()
      }
    } else {
      if (onSecondaryClick) {
        onSecondaryClick()
      }
    }
  }

  const modalClass = `base-modal ${className ? className : ''} ${blackClose ? 'black-close' : ''} ${
    whiteClose ? 'white-close' : ''
  } ${mobileFullScreen ? `mobile-${mobileFullScreen}` : ''}`

  const modalContent = customModalContent ? (
    customModalContent
  ) : (
    <>
      <Modal.Header>
        <Modal.Title className="modal-title">
          <div className="modal-title-text">
            <button
              aria-label="button"
              className="btn btn-close-mobile"
              onClick={(e) => onClose && onClose(e)}
            />
            <span>{title}</span>
            <button
              aria-label="button"
              className="btn btn-close"
              onClick={(e) => onClose && onClose(e)}
            />
          </div>
          {mobileFullScreen && (
            <div className="customer-data">
              {data.customerId} - {data.customerName}
            </div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {customModalFooterContent ? (
          customModalFooterContent
        ) : (
          <>
            <Button
              variant="primary"
              onClick={(e) => handleButtonClick(e, true)}
              disabled={typeof enablePrimary === 'boolean' ? !enablePrimary : false}
            >
              {primaryText}
            </Button>
            {secondaryText && (
              <Button variant="link" onClick={(e) => handleButtonClick(e)}>
                {secondaryText}
              </Button>
            )}
          </>
        )}
      </Modal.Footer>
    </>
  )

  if (flat) {
    return (show !== undefined ? show : true) ? (
      <div className={modalClass} ref={customRef}>
        {modalContent}
      </div>
    ) : (
      <></>
    )
  }

  return (
    <Modal show={show !== undefined ? show : true} className={modalClass} ref={customRef}>
      {modalContent}
    </Modal>
  )
}
