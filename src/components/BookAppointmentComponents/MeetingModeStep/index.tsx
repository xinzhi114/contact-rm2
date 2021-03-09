import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IDisabledDateAndTime } from '../../../domain/Appointment'
import { SetEditableHandleTypes, IStepProps } from '../../../constants/appointment';
import { showErrorMsg } from '../../../components/Toast';
import _ from 'lodash';
import './styles.scss'

const DateAndTimeStep: React.ForwardRefRenderFunction<SetEditableHandleTypes, IStepProps & { disabledDateAndTime: IDisabledDateAndTime[] }> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.date_and_time.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )
  const [selectedDate, setSelectedDate] = useState<Date>( new Date() )

  const { formValue, onChange, disabledDateAndTime } = props
  const today = new Date()
  const feature30days = today.getDate() + 30
  const feature30Date = new Date( today.setDate( feature30days ) )

  const handleCalendarChange = ( value: any ) => {
    setSelectedDate( value )
    onChange( {
      ...formValue,
      date: value,
      time_slots: []
    } )
  }

  const setDisabledDate = ( date: Date ) => {
    // Creates an object composed of date generated from the disabledDateAndTime
    // disable date other than disabledDateAndTime
    const dictByDate = _.keyBy( disabledDateAndTime, 'date' )
    let disableDate = Object.keys( dictByDate ).map( ( item: any ) => {
      if( dictByDate[item]['time'].length === 7 ) {
        return new Date( item ).toISOString()
      }
    } ).filter( Boolean )
    const isWeekend = [0, 6].includes( date.getDay() )
    const isDisabledDate = disableDate.includes( date.toISOString() )

    return isDisabledDate || isWeekend
  }


  useImperativeHandle( ref, () => ( {
    setEditable
  } ) )

  useEffect( () => {
  }, [selectedDate] )

  return (
    <div className="border-boxs">
      { editable ?
        <>
          <div className="lefts flex">
            <span className="color-point">2</span>
            <div className="right-txt">
              <div className="titles">{ t( 'date_and_time' ) }</div>
              <div className="sub-titles">{ t( 'you_can_select_any_date' ) }</div>
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
  )
}

export default forwardRef( DateAndTimeStep )