import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Form } from 'react-bootstrap'
import { IBaseFormFieldProps } from '../../../../constants/baseForm'
import './styles.scss'

export type IBaseFileInputValue = { name: string; data: string; bytes: number }

export type IBaseFileInputProps = IBaseFormFieldProps & {
  value: IBaseFileInputValue[]
  accept: string
  onChange?: (newFiles: IBaseFileInputValue[]) => void
}

export const BaseFileInput: React.FunctionComponent<IBaseFileInputProps> = (props) => {
  const { t } = useTranslation()
  const { id, className, value, accept, onChange, disableTranslation, placeholder } = props

  const fileInputRef = useRef<HTMLInputElement>(null)

  const getPlaceholder = () => {
    if (!placeholder) {
      return t('common.btns.attach_file')
    }
    return disableTranslation ? placeholder : t(placeholder)
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', (readerEvent) => {
        if (readerEvent.target && onChange) {
          onChange([
            ...value,
            {
              name: files[0].name,
              data: readerEvent.target.result as string,
              bytes: files[0].size,
            },
          ])
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      })
      reader.readAsDataURL(files[0])
    }
  }

  const clearFile = (index: number) => {
    if (onChange) {
      const newFiles = value.slice()
      newFiles.splice(index, 1)
      onChange(newFiles)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`base-file-input ${className ? className : ''}`}>
      {!!value &&
        value.map((file, index) => (
          <div className="selected-file" key={index}>
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">({Math.floor(file.bytes / 1024)}K)</span>
            </div>
            <img src="/assets/icon-close-black.svg" alt="remove" onClick={() => clearFile(index)} />
          </div>
        ))}
      <Button className="attach-button" variant="link" onClick={() => handleClick()}>
        <img src="/assets/attach.svg" alt="attach" />
        {getPlaceholder()}
      </Button>
      <Form.File
        ref={fileInputRef}
        hidden
        id={id}
        custom
        accept={accept}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
      />
    </div>
  )
}
