// form Validation service
export default class FormValidationSvc {
  // validate the pattern input entering
  static validateInputEnteringPattern(event: any, fieldNameValueCurrent?: string) {
    return event.target.validity.valid
      ? event.target.value.toString()
      : (fieldNameValueCurrent || '').toString()
  }

  // validate the pattern input entering of Sort Code
  static validateInputEnteringPatternSortCode(event: any, fieldNameValueCurrent?: string) {
    let value = ''
    if (event.target.validity.valid) {
      value = event.target.value.toString()
    } else {
      value = (fieldNameValueCurrent || '').toString()
    }

    if (/^([0-9]{2})+$/.test(value) || /^([0-9]{2}-[0-9]{2})+$/.test(value)) {
      value += '-'
    }

    return value
  }

  // validate the pattern input entering of Key Down on Sort Code
  static validateInputEnteringPatternKeyDownSortCode(event: any, fieldNameValueCurrent?: string) {
    let value = ''
    if (event.target.validity.valid) {
      value = event.target.value.toString()
    } else {
      value = (fieldNameValueCurrent || '').toString()
    }

    if (/^([0-9]{2}-[0-9]{2}-)+$/.test(value)) {
      const matchedStr = value.match(/([0-9]{2}-[0-9]{2})+/)
      if (matchedStr !== null) {
        value = matchedStr[0]
      }
    } else if (/^([0-9]{2}-)+$/.test(value)) {
      const matchedStr = value.match(/([0-9]{2})+/)
      if (matchedStr !== null) {
        value = matchedStr[0]
      }
    }

    return value
  }

  // validate the date input entering
  static validateInputEnteringDate(fieldName: string, event: any, fieldNameValueCurrent?: string) {
    let fieldNameValue = event.target.validity.valid
      ? event.target.value.toString()
      : fieldNameValueCurrent

    if (fieldName === 'birthDate' && event.target.value.toString() !== '') {
      fieldNameValue =
        parseInt(event.target.value.toString(), 10) <= 31 ? event.target.value.toString() : 31
    }

    if (fieldName === 'birthMonth' && event.target.value.toString() !== '') {
      fieldNameValue =
        parseInt(event.target.value.toString(), 10) <= 12 ? event.target.value.toString() : 12
    }

    return fieldNameValue
  }

  static validateEmail(mail: string) {
    if (mail === '') {
      return true
    }
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
    if (filter.test(mail)) {
      return true
    } else {
      return false
    }
  }
}
