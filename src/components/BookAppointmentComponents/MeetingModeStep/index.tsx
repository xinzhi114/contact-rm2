import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SetEditableHandleTypes, IStepProps } from '../../../constants/appointment';
import { showErrorMsg } from '../../../components/Toast';
import Radio, { RadioGroup, RadioButton } from '../RadioGroup';
import _ from 'lodash';
import './styles.scss'

const DateAndTimeStep: React.ForwardRefRenderFunction<SetEditableHandleTypes, IStepProps> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.meeting_mode.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )

  const { formValue, onChange } = props

  const handleMeetingModeChange = ( value: string ) => {
    onChange( {
      ...formValue,
      meeting_mode: value,
      meeting_way: ''
    } )
  }

  const handleMeetingWayChange = (value: string) => {
    onChange({
      ...formValue,
      meeting_way: value
    })
  }


  useImperativeHandle( ref, () => ( {
    setEditable
  } ) )

  useEffect( () => {
  }, [] )

  return (
    <div className="meeting_mode_step">
      <div className="border-boxs">
        { editable ?
          <>
            <div className="lefts flex">
              <span className="color-point">3</span>
              <div className="right-txt">
                <div className="titles">{ t( 'meeting_mode' ) }</div>
                <div className="meeting-mode-row flex">
                  { t( 'select_preferred' ) }
                  <RadioGroup name="meeting_mode" onChange={(val) => handleMeetingModeChange(val)} value={formValue.meeting_mode}>
                    <Radio value="virtual_metting">{t('virtual_metting')}</Radio>
                    <Radio value="in_person_metting">{t('in_person_metting')}</Radio>
                  </RadioGroup>
                </div>
                {
                  formValue.meeting_mode === 'virtual_metting' 
                  ?
                  <div className="meeting-way-row flex">
                    <RadioGroup name="meeting_way" onChange={(val) => handleMeetingWayChange(val)} value={formValue.meeting_way}>
                      <RadioButton value="phone_call">{t('phone_call')}</RadioButton>
                      <RadioButton value="video_call">{t('video_call')}</RadioButton>
                    </RadioGroup>
                    <div className="meeting-way-title-box">
                      <span className="icon-info" />
                      <span className="title">{t('meeting_using_video_will_be_recorded')}</span>
                    </div>
                  </div>
                  : 
                  <div className="meeting-way-row flex">
                    <RadioGroup name="meeting_way" onChange={(val) => handleMeetingWayChange(val)} value={formValue.meeting_way}>
                      <RadioButton value="at_customer_location">{t('at_customer_location')}</RadioButton>
                      <RadioButton value="at_branch">{t('at_branch')}</RadioButton>
                    </RadioGroup>
                  </div>
                }
              </div>
            </div>
          </>
          : <>
            <div className="lefts flex">
              <span className="color-point">3</span>
              <div className="right-txt">
                <div className="titles">{ t( 'meeting_mode' ) }</div>
                <div className="three-area">
                  <div className="items">
                    <div className="label-txt">{ t( 'captial_meeting_mode' ) }</div>
                    {/* <div className="values">{ formatDateWeekDay(formValue.date) }</div> */}
                  </div>
                  <div className="items">
                    <div className="label-txt">{ t( 'captial_at_customer_location' ) }</div>
                    <div className="values">{ formValue.time_slots.join(', ') }</div>
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
    </div>
  )
}

export default forwardRef( DateAndTimeStep )