export interface Appointment {
  appointmentRef: string
  dateOfAppointment: string
  dateLabelDay: string
  dateLabelMonth: string
  subject: string
  description: string
  timeOfAppointment: string
  timeOfAppointmentDuration: string
  preferredModeOfMeeting: string
  meetingMode: string
  status: string
  rmProposeNewTime: {
    label: string
    dateOfAppointment: string
    dateLabelDay: string
    dateLabelMonth: string
    timeOfAppointment: string
  }
}

export interface IDisableDateAndTime {
  day: string,
  time: string[]
}