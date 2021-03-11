import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CancelAppointmentModalWindow from '../CancelAppointmentModalWindow'
import SuccessUpdateAppointmentModalWindow from '../SuccessUpdateAppointmentModalWindow'
import GeneralGrayConfirmModalWindow from '../../../components/GeneralGrayConfirmModalWindow'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import { Appointment, IDisabledDateAndTime } from '../../../domain/Appointment'
import RightBookAppointment from '../../../components/BookAppointmentComponents/RightBookAppointment';
import './styles.scss'
interface IRightUpdateAppointmentProps {
  relationshipManagerName: string
  dataList: Appointment | null
  disabledDateAndTime: IDisabledDateAndTime[]
  confirmCancelledAppointment: () => void
  confirmDeleteAppointment: () => void
  confirmAcceptAppointment: () => void
  goBack: () => void
}

const RightUpdateAppointment: React.FunctionComponent<IRightUpdateAppointmentProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`contactRM.appointmentTab.${key}`)

  const [isShowCancelConfirmModalWindow, setIsShowCancelConfirmModalWindow] = useState(false)
  const [isShowCancelledModalWindow, setIsShowCancelledModalWindow] = useState(false)
  const [isShowUpdateConfirmModalWindow, setIsShowUpdateConfirmModalWindow] = useState(false)
  const [isShowDeleteConfirmModalWindow, setIsShowDeleteConfirmModalWindow] = useState(false)
  const [isShowAcceptConfirmModalWindow, setIsShowAcceptConfirmModalWindow] = useState(false)

  const [cancelledAppointmentRef, setCancelledAppointmentRef] = useState('')
  const [cancelledDateOfAppointment, setCancelledDateOfAppointment] = useState('')

  const { relationshipManagerName, dataList, disabledDateAndTime } = { ...props }

  return (
    <React.Fragment>
      {isShowCancelConfirmModalWindow && (
        <CancelAppointmentModalWindow
          data={dataList}
          onClose={() => {
            setIsShowCancelConfirmModalWindow(false)
          }}
          onCancelAppointment={() => {
            setIsShowCancelConfirmModalWindow(false)
            setIsShowCancelledModalWindow(true)
          }}
        />
      )}

      {isShowCancelledModalWindow && !!dataList && (
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
            setIsShowCancelledModalWindow(false)
            props.confirmCancelledAppointment()
          }}
        />
      )}

      {isShowUpdateConfirmModalWindow && (
        <SuccessUpdateAppointmentModalWindow
          relationshipManagerName={relationshipManagerName}
          data={dataList}
          onClose={() => {
            setIsShowUpdateConfirmModalWindow(false)
          }}
          onComplete={() => {
            setIsShowUpdateConfirmModalWindow(false)
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
            props.confirmDeleteAppointment()
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
            props.confirmAcceptAppointment()
          }}
        />
      )}

      {!!dataList && (
        <RightBookAppointment 
          managerName={relationshipManagerName} 
          disabledDateAndTime={ disabledDateAndTime } 
          goBack={props.goBack}
          dataList={dataList}
          confirmCancelledAppointment={props.confirmCancelledAppointment}
        />
      )}
    </React.Fragment>
  )
}

export default RightUpdateAppointment
