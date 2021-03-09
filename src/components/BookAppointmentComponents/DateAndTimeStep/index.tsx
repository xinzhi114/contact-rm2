import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import Calendar from 'react-calendar';
import { IDisabledDateAndTime } from '../../../domain/Appointment'
import { SetEditableHandleTypes, MorningSlots, AfternoonSlots, IStepProps } from '../../../constants/appointment';
import moment from 'moment';
import { showErrorMsg } from '../../../components/Toast';
import { DATE_WEEKDAY_FORMAT } from '../../../constants/date';
import _ from 'lodash';
import './styles.scss'
import './calendar.css'

const formatDateWeekDay = (date: Date) => moment(date).format(DATE_WEEKDAY_FORMAT)

const DateAndTimeStep: React.ForwardRefRenderFunction<SetEditableHandleTypes, IStepProps & { disabledDateAndTime: IDisabledDateAndTime[] }> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.date_and_time.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )
  const [selectedDate, setSelectedDate] = useState<Date>( new Date() )
  const [formatedDate, setFormatedDate] = useState( '' )
  const [disabledTime, setDisabledTime] = useState<string[]>( [] )

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
  // format choosen date
  const handleFormatDate = ( date: Date | null ): void => {
    if( date ) {
      setFormatedDate( formatDateWeekDay(date) )
    } else {
      setFormatedDate( '' )
    }
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

  const setDisableTime = ( date: Date ): void => {
    const formatedDate = formatDateWeekDay(date)
    if (formatedDate && disabledDateAndTime) {
      const dateObj = disabledDateAndTime.find( ( item: any ) => item['date'] === formatedDate )
      const disabledTime = dateObj ? dateObj['time'] : []
      setDisabledTime(disabledTime)
    }
  }

  const handleSelectSlot = (slot: string) => {
    if (formValue.time_slots.length === 4) {
      showErrorMsg('You can only select 4 time slot at most')
      return false
    }
    const new_time_slots = [...formValue.time_slots]
    const idx = new_time_slots.indexOf(slot)
    if (idx > -1) {
      new_time_slots.splice(idx, 1)
    } else {
      new_time_slots.push(slot)
    }
    onChange( {
      ...formValue,
      time_slots: new_time_slots
    } )
  }

  useImperativeHandle( ref, () => ( {
    setEditable
  } ) )

  useEffect( () => {
    handleFormatDate( selectedDate )
    setDisableTime(selectedDate)
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
              <div className="calendar-container">
                <Calendar
                  locale="en-US"
                  value={ selectedDate }
                  minDate={ new Date() }
                  maxDate={ feature30Date }
                  tileDisabled={ ( { date } ) => setDisabledDate( date ) }
                  onChange={ handleCalendarChange } />
                <div className="time-slots-container">
                  <div className="selected-date">{ formatedDate }</div>
                  <div className="mt20">
                    <div className="slots">MORNING (3 SLOT AVAILABLE)</div>
                    <div className="slots-wrapper">
                      { MorningSlots.map( ( slot: string, index: number ) => {
                        let klassName = 'slot-cell slot-cell-available'
                        if (disabledTime.includes(slot)) {
                          return (
                            <div key={ index } className="slot-cell slot-cell-disabled">{ slot }</div>
                          )
                        } 
                        if (formValue.time_slots.includes(slot)) {
                          klassName = 'slot-cell slot-cell-selected'
                        }
                        return (
                          <div key={ index } className={ klassName } onClick={() => handleSelectSlot(slot)}>{ slot }</div>
                        )  
                      } ) }
                    </div>
                  </div>
                  <div className="mt20">
                    <div className="slots">AFTERNOON (2 SLOT AVAILABLE)</div>
                    <div className="slots-wrapper">
                      { AfternoonSlots.map( ( slot: string, index: number ) => {
                        let klassName = 'slot-cell slot-cell-available'
                        if (disabledTime.includes(slot)) {
                          return (
                            <div key={ index } className="slot-cell slot-cell-disabled">{ slot }</div>
                          )
                        } 
                        if (formValue.time_slots.includes(slot)) {
                          klassName = 'slot-cell slot-cell-selected'
                        }
                        return (
                          <div key={ index } className={ klassName } onClick={() => handleSelectSlot(slot)}>{ slot }</div>
                        )  
                      } ) }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        : <>
          <div className="lefts flex">
            <span className="color-point">2</span>
            <div className="right-txt">
              <div className="titles">{ t( 'date_and_time' ) }</div>
              <div className="three-area">
                <div className="items">
                  <div className="label-txt">{ t( 'captial_appointment_date' ) }</div>
                  <div className="values">{ formatDateWeekDay(formValue.date) }</div>
                </div>
                <div className="items">
                  <div className="label-txt">{ t( 'captial_appointment_time' ) }</div>
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