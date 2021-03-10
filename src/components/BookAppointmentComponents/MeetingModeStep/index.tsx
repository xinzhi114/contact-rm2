import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SetEditableHandleTypes, IStepProps } from '../../../constants/appointment';
import { showErrorMsg } from '../../../components/Toast';
import Radio, { RadioGroup } from '../RadioGroup';
import _ from 'lodash';
import './styles.scss'

const DateAndTimeStep: React.ForwardRefRenderFunction<SetEditableHandleTypes, IStepProps> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.meeting_mode.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )
  const [virtualMeetingMode, setVirtualMeetingMode] = useState(true)
  const [inPersonMettingMode, setInPersonMettingMode] = useState(false)
  const [phoneCall, setPhoneCall] = useState(false)
  const [videoCall, setVideoCall] = useState(false)

  const { formValue, onChange } = props

  const handleCalendarChange = ( value: any ) => {

    onChange( {
      ...formValue,
    } )
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
                <div className="meeting_mode_row flex">
                  { t( 'select_preferred' ) }
                  <div className="radio-group">
                    <div className="radio-wrap">
                      <input
                        type="radio"
                        name="meeting_mode"
                        id="virtualMeetingMode"
                        checked={virtualMeetingMode}
                        onChange={(event) => {
                          setVirtualMeetingMode(event.target.checked)
                          setInPersonMettingMode(false)
                        }}
                      />
                      <label htmlFor="virtualMeetingMode">{t('virtual_metting')}</label>
                    </div>
                    <div className="radio-wrap">
                      <input
                        type="radio"
                        name="meeting_mode"
                        id="inPersonMettingMode"
                        checked={inPersonMettingMode}
                        onChange={(event) => {
                          setVirtualMeetingMode(false)
                          setInPersonMettingMode(event.target.checked)
                        }}
                      />
                      <label htmlFor="inPersonMettingMode">
                        {t('in_person_metting')}
                      </label>
                    </div>
                  </div>
                </div>

                <RadioGroup name="meeting_way" onChange={(val) => {console.log(val,'kkkkk');}} value="phone_call">
                  <Radio value="phone_call">Phone call</Radio>
                  <Radio value="video_call">Video Call</Radio>
                </RadioGroup>
                  {/* <div className="radio-group">
                    <label htmlFor="phoneCall" className="radio-wrap radio-button-wrapper" style={{'backgroundColor': phoneCall ? 'red' : 'green'}}>
                      <input
                        type="radio"
                        name="meeting_way"
                        id="phoneCall"
                        checked={phoneCall}
                        onChange={(event) => {
                          setPhoneCall(event.target.checked)
                          setVideoCall(false)
                        }}
                      />
                      <span>{t('phone_call')}</span>
                    </label>
                    <label className="radio-wrap radio-button-wrapper" style={{'backgroundColor': videoCall ? 'red' : 'green'}}>
                      <input
                        type="radio"
                        name="meeting_way"
                        id="videoCall"
                        checked={videoCall}
                        onChange={(event) => {
                          setVideoCall(event.target.checked)
                          setPhoneCall(false)
                        }}
                      />
                      <span>{t('video_call')}</span>
                    </label>
                  </div> */}

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