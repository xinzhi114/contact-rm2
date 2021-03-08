import { IBaseFileInputValue } from '../components/BaseForm/BaseFormFields/BaseFileInput'
import { SetStateAction, Dispatch } from 'react'

export const MeetingMode = ['virtual_meeting', 'in_person_meeting'] as const
export const VirtualMeetingWay = ['phone_call', 'video_call'] as const
export const InPersonMeetingWay = ['at_customer_location', 'at_branch'] as const

export type MeetingModeTypes = typeof MeetingMode[number]
export type SetEditableHandleTypes = {
  setEditable: Dispatch<SetStateAction<boolean>>
}

export interface IStepProps {
  ref: HTMLDivElement
  formValue: IBookAppointmentProps
  onChange: ( formValue: IBookAppointmentProps ) => void
}

export interface IBookAppointmentProps {
  subject: string
  description: string
  attachedFiles: IBaseFileInputValue[]
  date: string
  time_slots: string[]
  meeting_mode: string
  meeting_way: string
  meeting_address?: string
}