import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IBaseFormFields, IBaseFormFieldValue } from '../../../constants/baseForm'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import { IBaseFileInputValue } from '../../BaseForm/BaseFormFields/BaseFileInput'
import BaseForm from '../../BaseForm'
import { IStepProps, SetEditableHandleTypes } from '../../../constants/appointment';
import './styles.scss'

const SubjectStep: React.ForwardRefRenderFunction<SetEditableHandleTypes,IStepProps> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.subject.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )

  const { formValue, onChange } = props

  const fields: IBaseFormFields = {
    subject: {
      type: 'text',
      value: formValue.subject,
      placeholder: t( 'enter_your_subject' ),
      label: t( 'subject' ),
      onChange: ( e ) =>
        onChange( {
          ...formValue,
          subject: ( e as React.ChangeEvent<HTMLInputElement> ).target.value
        } ),
    },
    description: {
      type: 'textarea',
      value: formValue.description,
      flexGrow: true,
      wrapperClassName: 'email-content-wrapper',
      rowClassName: 'email-content-row',
      placeholder: t( 'enter_your_description' ),
      label: t( 'description' ),
      onChange: ( e ) =>
        onChange( {
          ...formValue,
          description: ( e as React.ChangeEvent<HTMLTextAreaElement> ).target.value
        } ),
    },
    attachedFiles: {
      type: 'file',
      value: formValue.attachedFiles,
      accept: '.pdf,.doc,.xls,.png,.jpeg,.jpg',
      wrapperClassName: 'attach-file-wrapper',
      rowClassName: 'attach-file-row',
      onChange: ( newFiles ) =>
        onChange( {
          ...formValue,
          attachedFiles: newFiles as IBaseFileInputValue[]
        } ),
    },
  }

  useImperativeHandle(ref, () => ({
    setEditable
  }))

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
                  <div className="values">{ formValue.subject }</div>
                </div>
                <div className="items">
                  <div className="label-txt">{ t( 'description' ) }</div>
                  <div className="values">{ formValue.description }</div>
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

export default forwardRef(SubjectStep)