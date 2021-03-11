import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RightUpdateAppointment from '../RightUpdateAppointment'
import CancelAppointmentModalWindow from '../CancelAppointmentModalWindow'
import GeneralGrayConfirmModalWindow from '../../../components/GeneralGrayConfirmModalWindow'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { Appointment, IDisabledDateAndTime } from '../../../domain/Appointment'
import _ from 'lodash'
import './styles.scss'

interface IRightAppointmentProps {
  relationshipManagerName: string
  dataList: Appointment[]
  disabledDateAndTime: IDisabledDateAndTime[]
}

const RightAppointment: React.FunctionComponent<IRightAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.appointmentTab.${key}`)

  const [showUpdateAppointment, setShowUpdateAppointment] = useState(false)

  const [isShowDeleteConfirmModalWindow, setIsShowDeleteConfirmModalWindow] = useState(false)
  const [isShowAcceptConfirmModalWindow, setIsShowAcceptConfirmModalWindow] = useState(false)
  const [isShowCancelConfirmModalWindow, setIsShowCancelConfirmModalWindow] = useState(false)
  const [isShowCancelledModalWindow, setIsShowCancelledModalWindow] = useState(false)

  const [cancelledAppointmentRef, setCancelledAppointmentRef] = useState('')
  const [cancelledDateOfAppointment, setCancelledDateOfAppointment] = useState('')

  const [rowIndex, setRowIndex] = useState(0)

  const [dataList, setDataList] = useState(props.dataList)
  const [appointmentData, setAppointmentData] = useState<Appointment | null>(null)

  const relationshipManagerName = props.relationshipManagerName
  
  const disabledDateAndTime = props.disabledDateAndTime

  // click Cancel Appointment
  const clickCancelAppointment = (index: number) => {
    setRowIndex(index)
    setCancelledAppointmentRef(dataList[index].appointmentRef)
    setCancelledDateOfAppointment(dataList[index].dateOfAppointment)
    setIsShowCancelConfirmModalWindow(true)
  }

  // confirm Cancelled Appointment
  const confirmCancelledAppointment = () => {
    dataList[rowIndex].status = 'Rejected'

    setDataList(_.cloneDeep(dataList))
  }

  // confirm Delete Appointment
  const confirmDeleteAppointment = () => {
    dataList.splice(rowIndex, 1)
    setDataList(_.cloneDeep(dataList))

    setIsShowDeleteConfirmModalWindow(false)
  }

  // confirm Accept Appointment
  const confirmAcceptAppointment = () => {
    dataList[rowIndex].status = 'Confirmed'
    dataList[rowIndex].dateOfAppointment = dataList[rowIndex].rmProposeNewTime.dateOfAppointment
    dataList[rowIndex].dateLabelDay = dataList[rowIndex].rmProposeNewTime.dateLabelDay
    dataList[rowIndex].dateLabelMonth = dataList[rowIndex].rmProposeNewTime.dateLabelMonth
    dataList[rowIndex].timeOfAppointment = dataList[rowIndex].rmProposeNewTime.timeOfAppointment

    setDataList(_.cloneDeep(dataList))

    setIsShowAcceptConfirmModalWindow(false)
  }

  // update Appointment
  const updateAppointment = (index: number) => {
    setRowIndex(index)
    setAppointmentData(dataList[index])

    setShowUpdateAppointment(true)
  }

  return (
    <div className="contact-rm-right-appointment">
      {isShowCancelConfirmModalWindow && (
        <CancelAppointmentModalWindow
          data={dataList[rowIndex]}
          onClose={() => {
            setIsShowCancelConfirmModalWindow(false)
          }}
          onCancelAppointment={() => {
            setIsShowCancelConfirmModalWindow(false)
            setIsShowCancelledModalWindow(true)
          }}
        />
      )}

      {isShowCancelledModalWindow && !!dataList[rowIndex] && (
        <GeneralConfirmModalWindow
          titleText={t('cancel_appointment')}
          messageText={`${_t(
            'contactRM.appointmentTab.your_appointment_with_reference_no_is_cancelled_successfully',
            {
              appointmentRef: cancelledAppointmentRef,
              dateOfAppointment: cancelledDateOfAppointment.split(', ')[1],
            }
          )}`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            confirmCancelledAppointment()
            setIsShowCancelledModalWindow(false)
          }}
        />
      )}

      {isShowDeleteConfirmModalWindow && (
        <GeneralGrayConfirmModalWindow
          titleText={t('delete_appointment')}
          messageText={`${t('are_you_sure_to_delete')}`}
          confirmBtnText={_t('common.btns.delete')}
          onClose={() => {
            setIsShowDeleteConfirmModalWindow(false)
          }}
          onConfirm={() => {
            confirmDeleteAppointment()
          }}
        />
      )}

      {isShowAcceptConfirmModalWindow && (
        <GeneralGrayConfirmModalWindow
          titleText={t('accept_appointment')}
          messageText={`${t('are_you_sure_to_accept')}`}
          confirmBtnText={_t('common.btns.accept')}
          onClose={() => {
            setIsShowAcceptConfirmModalWindow(false)
          }}
          onConfirm={() => {
            confirmAcceptAppointment()
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="right-contents appointment-module">
            {!showUpdateAppointment && (
              <div className="line-title">
                <i className="icons date-clock" />
                <span className="title">{t('appointment')}</span>
              </div>
            )}
            <div className="module-content">
              {dataList.length === 0 && (
                <div className="gray-no-found">
                  <div className="center-txt">
                    <i className="icons icon-app" />
                    <p className="txt">{t('no_appointments_found_start_booked_appointment')}</p>
                  </div>
                </div>
              )}

              {dataList.length > 0 && (
                <React.Fragment>
                  {!showUpdateAppointment && (
                    <div className="existing-app-list">
                      <div className="title-bar">
                        <div className="titles">
                          {t('existing_appointments')} ({dataList.length})
                        </div>
                        <p className="txt">{t('select_an_appointment_to_see_full_details')}</p>
                      </div>
                      <div className="app-border-list">
                        {dataList.map((item, index) => (
                          <div className="border-boxs flex-grid" key={index}>
                            <div className="lefts flex">
                              <div className="icons icon-calender">
                                <div className="date-number">{item.dateLabelDay}</div>
                                <div className="little-txt">{item.dateLabelMonth}</div>
                              </div>
                              <div className="right-txt">
                                <div className="gray-txt">
                                  {t('appointment_ref')} #{item.appointmentRef}
                                </div>
                                <div className="titles">{item.dateOfAppointment}</div>
                                <div className="three-area">
                                  <div className="items">
                                    <div className="label-txt">{t('time')}</div>
                                    <div className="values">{item.timeOfAppointment}</div>
                                  </div>
                                  <div className="items">
                                    <div className="label-txt">{t('subject')}</div>
                                    <div className="values">{item.subject}</div>
                                  </div>
                                  <div className="items">
                                    <div className="label-txt">{t('mode')}</div>
                                    <div className="values">{item.meetingMode}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rights">
                              {item.status === 'RM Propose new time' && (
                                <div className="top-box flex-grid">
                                  <div className="gray-block flex-grid">
                                    <div className="left-area flex">
                                      <i className="icons icon-clock" />
                                      <div className="txt-area">
                                        <div className="bold-title">{t('rm_propose_new_time')}</div>
                                        <div className="thin-txt">
                                          {item.rmProposeNewTime.label}
                                        </div>
                                      </div>
                                    </div>
                                    <i
                                      className="icons icon-done clickable"
                                      onClick={() => {
                                        setRowIndex(index)
                                        setIsShowAcceptConfirmModalWindow(true)
                                      }}
                                    >
                                      <span className="black-panel w72">{t('accept')}</span>
                                    </i>
                                  </div>
                                  <a
                                    href="#javascript"
                                    className="icons btn-close clickable"
                                    onClick={() => {
                                      clickCancelAppointment(index)
                                    }}
                                  >
                                    <span className="black-panel w150">
                                      {t('cancel_appointment')}
                                    </span>
                                  </a>
                                </div>
                              )}

                              {item.status === 'Pending confirmation' && (
                                <div className="top-box">
                                  <span className="txt">{t('pending_confirmation')}</span>
                                  <a
                                    href="#javascript"
                                    className="icons btn-close clickable"
                                    onClick={() => {
                                      clickCancelAppointment(index)
                                    }}
                                  >
                                    <span className="black-panel w150">
                                      {t('cancel_appointment')}
                                    </span>
                                  </a>
                                </div>
                              )}

                              {item.status === 'Confirmed' && (
                                <div className="top-box text-right">
                                  <span className="icon-txt">
                                    <i className="icons icon-done" />
                                    <span className="blue-txt">{t('confirmed')}</span>
                                  </span>
                                </div>
                              )}

                              {item.status === 'Rejected' && (
                                <div className="top-box text-right">
                                  <span className="icon-txt">
                                    <i className="icons icon-rejected" />
                                    <span className="blue-txt">{t('rejected')}</span>
                                  </span>
                                  <a
                                    href="#javascript"
                                    className="icons icon-trash label-transparent"
                                    onClick={() => {
                                      setRowIndex(index)
                                      setIsShowDeleteConfirmModalWindow(true)
                                    }}
                                  >
                                    {_t('common.btns.delete')}
                                  </a>
                                </div>
                              )}

                              <div className="bottom-btn">
                                <BaseTextLinkButton
                                  classNameContainer={`btn-border-green`}
                                  label={t('update_appointment')}
                                  isButton
                                  onClick={() => updateAppointment(index)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showUpdateAppointment && (
                    <RightUpdateAppointment
                      relationshipManagerName={relationshipManagerName}
                      dataList={appointmentData}
                      disabledDateAndTime={disabledDateAndTime}
                      confirmCancelledAppointment={() => {
                        setShowUpdateAppointment(false)
                        confirmCancelledAppointment()
                      }}
                      confirmDeleteAppointment={() => {
                        setShowUpdateAppointment(false)
                        confirmDeleteAppointment()
                      }}
                      confirmAcceptAppointment={() => {
                        setShowUpdateAppointment(false)
                        confirmAcceptAppointment()
                      }}
                      goBack={() => setShowUpdateAppointment(false)}
                    />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default RightAppointment
