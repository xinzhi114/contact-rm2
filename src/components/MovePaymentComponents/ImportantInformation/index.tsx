import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../../Modals/BaseModal'
import './styles.scss'

export interface IImportantInformationProps {
  showFullModal: boolean
  translationKey: string
  onClose?: () => void
  forceFlat?: boolean
  showNormalDesktop?: boolean
  expandable?: boolean
}

export const ImportantInformation: React.FunctionComponent<IImportantInformationProps> = (
  props
) => {
  const { showFullModal, onClose, translationKey, forceFlat, showNormalDesktop, expandable } = props

  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`${translationKey}.${key}`)

  const [showTablet, setShowTablet] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setShowTablet(e.matches)
    }
    setShowTablet(mql.matches)
    mql.addEventListener('change', handleResize)
    return () => {
      mql.removeEventListener('change', handleResize)
    }
  }, [])

  const wrapperComponent: React.FunctionComponent = ({ children }) =>
    (showTablet || showNormalDesktop) && !forceFlat ? (
      <BaseModal
        show={showFullModal}
        className="important-information"
        mobileFullScreen="simple-navbar"
        customModalContent={<>{children}</>}
        blackClose
      />
    ) : (
      <Modal.Dialog className={`important-information ${forceFlat ? 'force-flat' : ''}`}>
        {children}
      </Modal.Dialog>
    )

  const mainTitle = (
    <>
      <img src="/assets/alert-circle.svg" alt="alert" className="alert-circle" /> {t('title')}
    </>
  )

  const headerContent =
    showTablet || showNormalDesktop ? (
      <Modal.Title>
        <div className="modal-title-text">
          <span>{mainTitle}</span>
          <button
            aria-label="button"
            className="btn btn-close"
            onClick={() => onClose && onClose()}
          />
        </div>
      </Modal.Title>
    ) : expandable ? (
      <Modal.Title>
        <div>
          <span>{mainTitle}</span>
          <button
            aria-label="button"
            className="btn btn-close"
            onClick={() => onClose && onClose()}
          />
        </div>
      </Modal.Title>
    ) : (
      <>{mainTitle}</>
    )

  return React.createElement(
    wrapperComponent,
    null,
    <>
      <Modal.Header>{headerContent}</Modal.Header>
      <Modal.Body tabIndex={0}>
        {[1, 2, 3, 4]
          .slice(0, expandable && !expanded && !forceFlat ? 1 : undefined)
          .map((paragraph) => (
            <p key={paragraph}>{t(`paragraph_${paragraph}`)}</p>
          ))}
        {expandable && !forceFlat && (
          <span className="show-more" onClick={() => setExpanded(!expanded)}>
            {t(`show_${expanded ? 'less' : 'more'}`)}
          </span>
        )}
      </Modal.Body>
      {!forceFlat && (
        <Modal.Footer className="tablet-show desktop-hide">
          <Button variant="primary" onClick={() => onClose && onClose()}>
            {t('primary')}
          </Button>
        </Modal.Footer>
      )}
    </>
  )
}
