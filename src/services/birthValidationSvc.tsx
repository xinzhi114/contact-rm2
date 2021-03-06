// data service
export default class BirthValidationSvc {
  // validate the birth date
  static validate(day: string, month: string, year: string) {
    if (day === '' || month === '' || year === '') {
      return true
    }

    const yearNumber = parseInt(year, 10)
    const yearCurrent = new Date().getFullYear()

    if (yearNumber < yearCurrent - 130 || yearNumber > yearCurrent - 11) {
      return false
    }

    if (parseInt(month, 10) > 12 || parseInt(day, 10) > 31) {
      return false
    } else {
      const yearValue = parseInt(year, 10)
      const monthValue = parseInt(month, 10) - 1
      const dayValue = parseInt(day, 10)

      const enteredDate = new Date(yearValue, monthValue, dayValue)

      if (
        yearValue !== enteredDate.getFullYear() ||
        monthValue !== enteredDate.getMonth() ||
        dayValue !== enteredDate.getDate()
      ) {
        return false
      } else {
        const today = new Date()

        return today.getTime() >= enteredDate.getTime()
      }
    }
  }
}
