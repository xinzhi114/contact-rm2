import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IBaseFormFields, IBaseFormFieldValue } from '../../../constants/baseForm'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { IBaseFileInputValue } from '../../BaseForm/BaseFormFields/BaseFileInput'
import BaseForm from '../../BaseForm'
import './styles.scss'

interface ISubjectProps {
}

const Subject: React.FunctionComponent<ISubjectProps> = ( props ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.subject.${ key }` )

  const [subject, setSubject] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [attachedFiles, setAttachedFiles] = useState<IBaseFileInputValue[]>( [] )
  const [editable, setEditable] = useState<boolean>( true )

  const fields: IBaseFormFields = {
    subject: {
      type: 'text',
      value: subject,
      placeholder: t( 'enter_your_subject' ),
      label: t( 'subject' ),
      rowClassName: 'email-subject-row',
      onChange: ( e ) => setSubject( ( e as React.ChangeEvent<HTMLInputElement> ).target.value ),
    },
    description: {
      type: 'textarea',
      value: description,
      flexGrow: true,
      wrapperClassName: 'email-content-wrapper',
      rowClassName: 'email-content-row',
      placeholder: t( 'enter_your_description' ),
      label: t( 'description' ),
      onChange: ( newContent ) =>
        setDescription( ( newContent as React.ChangeEvent<HTMLTextAreaElement> ).target.value ),
    },
    attachedFiles: {
      type: 'file',
      value: attachedFiles,
      accept: '.pdf,.doc,.xls,.png,.jpeg,.jpg',
      wrapperClassName: 'attach-file-wrapper',
      rowClassName: 'attach-file-row',
      onChange: ( newFiles ) => setAttachedFiles( newFiles as IBaseFileInputValue[] ),
    },
  }

  return (
    <div className="border-boxs">
      { editable ?
        <>
          <div className="lefts flex">
            <span className="color-point">1</span>
            <div className="right-txt">
              <div className="titles">{ t( 'subject' ) }</div>
              <div className="sub-titles">{ t( 'first_enter' ) }</div>
              <BaseForm fields={ fields } isShowHelp={ false } disableTranslation />
            </div>
          </div>
        </>
        : <>
          <div className="lefts flex">
            <span className="color-point">1</span>
            <div className="right-txt">
              <div className="titles">{ t( 'subject' ) }</div>
              <div className="three-area">
                <div className="items">
                  <div className="label-txt">{ t( 'subject' ) }</div>
                  <div className="values">{ subject }</div>
                </div>
                <div className="items">
                  <div className="label-txt">{ t( 'description' ) }</div>
                  <div className="values">{ description }</div>
                </div>
              </div>
            </div>
          </div>
          <a href="#javascript" className="icons btn-edit label-transparent">
            { _t( 'common.btns.edit' ) }
          </a>
        </>
      }
    </div>
  )
}

export default Subject