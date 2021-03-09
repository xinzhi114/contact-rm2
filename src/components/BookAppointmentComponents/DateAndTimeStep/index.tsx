import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import Calendar from 'react-calendar';
import { DATE_FORMAT } from '../../../constants/date'
import { IBaseFormFields, IBaseFormFieldValue } from '../../../constants/baseForm'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import { IBaseFileInputValue } from '../../BaseForm/BaseFormFields/BaseFileInput'
import BaseForm from '../../BaseForm'
import { IStepProps, SetEditableHandleTypes, MorningSlots, AfternoonSlots } from '../../../constants/appointment';
import moment from 'moment';
import './styles.scss'
import './calendar.css'

const DateAndTimeStep: React.ForwardRefRenderFunction<SetEditableHandleTypes, IStepProps> = ( props, ref ) => {
  const { t: _t } = useTranslation()
  const t = ( key: string ) => _t( `bookAppointment.right.date_and_time.${ key }` )

  const [editable, setEditable] = useState<boolean>( true )
  const [selectedDate, setSelectedDate] = useState<Date | null>( new Date() )
  const [formatedDate, setFormatedDate] = useState( '&nvsp;' )
  const [timeSlots, setTimeSlots] = useState( [] )

  const { formValue, onChange } = props
  const today = new Date()
  const feature30days = today.getDate() + 30
  const feature30Date = new Date( today.setDate( feature30days ) )

  const handleCalendarChange = ( value: any ) => {
    setSelectedDate( value )
    console.log( value, 'value' )
  }

  const handleFormatDate = ( date: Date | null ): void => {
    if( date ) {
      const formatDate = moment( date ).format( "dddd, D MMM YYYY" )
      setFormatedDate( formatDate )
    } else {
      setFormatedDate( '' )
    }
  }

  useImperativeHandle( ref, () => ( {
    setEditable
  } ) )

  useEffect( () => {
    handleFormatDate( selectedDate )
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
                  tileDisabled={ ( { date } ) => [0, 6].includes( date.getDay() ) }
                  onChange={ handleCalendarChange } />
                <div className="time-slots-container">
                  <div className="selected-date">{ formatedDate }</div>
                  <div className="mt20">
                    <div className="slots">MORNING (3 SLOT AVAILABLE)</div>
                    <div className="slots-wrapper">
                      { MorningSlots.map( ( slot, index ) => {
                        return (
                          <div key={ index } className="slot-cell slot-cell-available">{ slot }</div>
                        )
                      } ) }
                    </div>
                  </div>
                  <div className="mt20">
                    <div className="slots">AFTERNOON (2 SLOT AVAILABLE)</div>
                    <div className="slots-wrapper">
                      { AfternoonSlots.map( ( slot, index ) => {
                        return (
                          <div key={ index } className="slot-cell slot-cell-available">{ slot }</div>
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

export default forwardRef( DateAndTimeStep )