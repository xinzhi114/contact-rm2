import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IListItem } from '../../../constants/layout'
import { BaseCheckbox } from '../../BaseForm/BaseFormFields/BaseCheckbox'
import { FlexDialog } from '../../FlexLayoutComponents/FlexDialog'
import { FlexList } from '../../FlexLayoutComponents/FlexList'
import { BaseModal } from '../BaseModal'
import './styles.scss'

export interface INoticeModalProps {
  value: boolean
  onChange: (newValue: boolean) => void
  onUpdateData: () => void
  title: string
  text: string
  listItems: IListItem[]
  flat: boolean
  checkboxText: string
  className?: string
}

export const NoticeModal: React.FunctionComponent<INoticeModalProps> = (props) => {
  const { t } = useTranslation()

  const {
    children,
    value,
    onChange,
    onUpdateData,
    title,
    text,
    listItems,
    flat,
    checkboxText,
    className,
  } = props

  const modalBody = (
    <>
      <div className="text">{text}</div>
      <FlexList items={listItems} />
      {children}
    </>
  )

  const content = (
    <>
      <Modal.Body>
        <div className="top-title">{title}</div>
        {modalBody}
      </Modal.Body>
      <Modal.Footer>
        <BaseCheckbox
          value={[value]}
          options={[checkboxText]}
          onChange={(newValue) => onChange(newValue[0])}
        />
      </Modal.Footer>
    </>
  )
  if (flat) {
    return <FlexDialog className={`notice-modal ${className || ''}`}>{content}</FlexDialog>
  }
  return (
    <BaseModal
      className={`notice-modal ${className || ''}`}
      title={<>{title}</>}
      onClose={() => onUpdateData()}
      customModalFooterContent={
        <>
          <Button variant="secondary" onClick={() => onUpdateData()}>
            {t('movePaymentMakeAPayment.update_data')}
          </Button>
          <Button variant="primary" onClick={() => onChange(true)}>
            {checkboxText}
          </Button>
        </>
      }
      blackClose
    >
      {modalBody}
    </BaseModal>
  )
}
