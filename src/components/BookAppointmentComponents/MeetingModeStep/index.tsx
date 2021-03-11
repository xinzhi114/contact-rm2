import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SetEditableHandleTypes, IStepProps } from '../../../constants/appointment';
import Radio, { RadioGroup, RadioButton } from '../RadioGroup';
import './styles.scss'

const AddressList = [
  {
    type: 'RESIDENTIAL ADDRESS',
    value: '70 Crown Street LONDON, W2 8HF'
  },
  {
    type: 'CORRESPONDENCE ADDRESS',
    value: '108 Sandyhill Rd FROSTENDEN, BR34 3WL'
  }
]

const DateAndTimeStep: React.ForwardRefRenderFunction<SetEditableHandleTypes, IStepProps> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.meeting_mode.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )

  const { formValue, onChange, prevStep } = props

  const handleMeetingModeChange = ( value: string ) => {
    onChange( {
      ...formValue,
      meeting_mode: value,
      meeting_way: '',
      meeting_address: ''
    } )
  }

  const handleMeetingWayChange = (value: string) => {
    onChange({
      ...formValue,
      meeting_way: value
    })
  }

  const handleMeetingAddressChange = (value: string) => {
    onChange({
      ...formValue,
      meeting_address: value
    })
  }

  useImperativeHandle( ref, () => ( {
    setEditable
  } ) )

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
                    <Radio value={t('virtual_metting')}>{t('virtual_metting')}</Radio>
                    <Radio value={t('in_person_metting')}>{t('in_person_metting')}</Radio>
                  </RadioGroup>
                </div>
                {
                  formValue.meeting_mode === t('virtual_metting')
                  ?
                  <div className="meeting-way-row flex">
                    <RadioGroup 
                      name="meeting_way_v" 
                      onChange={(val) => handleMeetingWayChange(val)} 
                      value={formValue.meeting_way}
                    >
                      <RadioButton value="phone_call">{t('phone_call')}</RadioButton>
                      <RadioButton value="video_call">{t('video_call')}</RadioButton>
                    </RadioGroup>
                    <div className="meeting-way-title-box">
                      <span className="icon-info" />
                      <span className="title">{t('meeting_using_video_will_be_recorded')}</span>
                    </div>
                  </div>
                  : 
                  <div className="meeting-way-row">
                    <RadioGroup 
                      name="meeting_way_i" 
                      onChange={(val) => handleMeetingWayChange(val)} 
                      value={formValue.meeting_way}
                    >
                      <RadioButton value="at_customer_location">{t('at_customer_location')}</RadioButton>
                      <RadioButton value="at_branch">{t('at_branch')}</RadioButton>
                    </RadioGroup>
                    <div>
                    <RadioGroup direction="column"
                      name="meeting_address" 
                      onChange={(val) => handleMeetingAddressChange(val)} 
                      value={formValue.meeting_address!}
                    >
                      {AddressList.map((item, index) => (
                        <div className="mb20 mt20">
                          <Radio value={item.value} key={index}>
                            <div className="address-type">{item.type}</div>
                            <div className="address-value">{item.value}</div>
                          </Radio>
                        </div>
                      ))}
                    </RadioGroup>
                    </div>
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
                    <div className="values">{ formValue.meeting_mode }</div>
                  </div>
                  { formValue.meeting_mode === t('virtual_metting') && (
                    <div className="items">
                      <div className="label-txt">{ t( 'captial_meeting_way' ) }</div>
                      <div className="values">{ formValue.meeting_way }</div>
                    </div>
                    )
                  }
                  { formValue.meeting_mode === t('in_person_metting') && (
                    <div className="items">
                      <div className="label-txt">{ t( formValue.meeting_way ) }</div>
                      <div className="values">{ formValue.meeting_address }</div>
                    </div>
                    )
                  }
                </div>
              </div>
            </div>
            <span className="btn-edit label-transparent" 
              onClick={(e) => { 
                setEditable(true)
                prevStep('meeting_mode')
              }}
            >
            </span>
          </>
        }
      </div>
    </div>
  )
}

export default forwardRef( DateAndTimeStep )