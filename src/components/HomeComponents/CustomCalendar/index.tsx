import React, { Component } from 'react'
import $ from 'jquery'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface ICustomCalendarProps {
  t: any
  dataList: {
    dateLabelYear: string
    dateLabelDay: string
    dateLabelMonth: string
    eventsList: {
      title: string
      dueTime: string
      amount: string
      accountType: string
      accountId: string
    }[]
  }[]
}

const today = new Date()
let year: number
let month: number
const showOtherMonthDate = false // config for show/hide the other month date

year = today.getFullYear()
month = today.getMonth() + 1

class CustomCalendar extends Component<ICustomCalendarProps> {
  componentDidMount() {
    const monthText = this.convertMonthText(month) + ' ' + year
    $('.month-title label').html(monthText)
    this.initCalendar()
  }

  initCalendar() {
    const Nowdate = new Date(today)
    const MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1).getTime()
    const vToday = new Date(MonthNextFirstDay - 86400000)

    const totalDays = vToday.getDate()

    vToday.setDate(1)
    let weeks = 0

    const table = $('.calendar-box').find('table tbody')
    table.find('td label').html('')

    table.find('td.current-event').removeClass('current-event')
    table.find('td.disable-text').removeClass('disable-text')

    table.find('td a').remove()
    table.find('td label').show()
    table.find('td.past-event').removeClass('past-event')
    table.find('td.next-event').removeClass('next-event')

    if (table.find('tr').length > 5)
      table
        .find('tr')
        .eq(table.find('tr').length - 1)
        .remove()

    let newRow: any
    if (table.find('tr').length < 5) {
      newRow = table.find('tr').eq(0).clone()
      newRow.find('td label').html('')
      newRow.find('td a').remove()
      newRow.find('td label').show()
      newRow
        .find('td')
        .removeClass('current-event')
        .removeClass('past-event')
        .removeClass('next-event')
      table.append(newRow)
    }

    for (let i = 1; i <= totalDays; i++) {
      vToday.setDate(i)
      let weekDay = vToday.getDay() // 0-6

      weekDay = weekDay - 1 // reset first week day from Sunday to be Monday
      if (weekDay < 0) weekDay = 6

      const row = table.find('tr').eq(weeks)
      const cell = row.find('td').eq(weekDay)
      if (this.isToday(vToday)) cell.addClass('current-event')
      cell.find('label').html(i.toString())

      const returnValue = this.setEvent(vToday)

      let j = 0
      let label = ''
      let html = ''
      if (returnValue !== null) {
        if (!cell.hasClass('current-event')) cell.addClass('next-event')
        label = cell.find('label').html()
        cell.find('label').hide()
        const elementData = returnValue.data
        let eventHtml = ''
        for (const eventElement of elementData.eventsList) {
          eventHtml += `<div class='line-row'>\
                          <div class='lefts'>\
                            <i class='icons icon-bank'></i>\
                            <div class='right-txt'>\
                              <div class='txt'>${eventElement.title}</div>\
                              <div class='gray-txt'>${eventElement.dueTime}</div>\
                            </div>\
                          </div>\
                          <div class='rights'>\
                            <div class='money-txt'>${eventElement.amount}</div>\
                            <div class='gray-txt'>${eventElement.accountType} ${eventElement.accountId}</div>\
                          </div>\
                        </div>`
        }
        html = `<a class="date-cell" href='javascript:;'>
                  <div>
                    <label>${label}</label>\
                    <div class='date-popup'>\
                      <div class='top-line flex-grid'>\
                        <span class='bold-txt'>${elementData.dateLabelDay} ${elementData.dateLabelMonth} ${elementData.dateLabelYear}</span>\
                        <a href='javascript:;' class='icons btn-close label-transparent'>close</a>\
                      </div>${eventHtml}\
                    </div>\
                  </div>\
                </a>`
        cell.append(html)
      }

      if (i === totalDays) {
        let k = 1
        for (j = weekDay + 1; j <= 6; j++) {
          row.find('td').eq(j).addClass('disable-text')
          row
            .find('td')
            .eq(j)
            .find('label')
            .html(showOtherMonthDate ? k.toString() : '')
          k++
        }

        const firstRow = table.find('tr').eq(0)
        let blankCount = 0
        let cellFirstRow: any
        for (j = 0; j <= 6; j++) {
          cellFirstRow = firstRow.find('td').eq(j)
          if (cellFirstRow.find('label').html() === '') blankCount++
        }

        vToday.setMonth(vToday.getMonth())
        vToday.setDate(0)
        const prevTotalDays = vToday.getDate()

        for (j = 0; j < blankCount; j++) {
          cellFirstRow = firstRow.find('td').eq(j).addClass('disable-text')
          cellFirstRow
            .find('label')
            .html(showOtherMonthDate ? (prevTotalDays - blankCount + j + 1).toString() : '')
        }
      }

      if (weekDay === 6 && i < totalDays) {
        weeks++
        if (weeks > 4 && i < totalDays) {
          newRow = table.find('tr').eq(0).clone()
          newRow.find('td label').html('')
          newRow.find('td a').remove()
          newRow.find('td label').show()
          newRow
            .find('td')
            .removeClass('current-event')
            .removeClass('past-event')
            .removeClass('next-event')
          table.append(newRow)
        }
      }
    }

    if (weeks === 3) {
      table.find('tr').eq(4).remove()
    }

    $(document).on('click', '.date-cell', function () {
      $('.date-popup').hide()
      $(this).next().show()
    })

    $(document).on('click', '.btn-close', function () {
      $(this).parent().parent().hide()
    })
  }

  // prev month
  handlePrevClick() {
    today.setDate(15)
    today.setMonth(today.getMonth() - 1)

    year = today.getFullYear()
    month = today.getMonth() + 1

    const monthText = this.convertMonthText(month) + ' ' + year
    $('.month-title label').html(monthText)

    $('.date-popup').hide()
    this.initCalendar()
  }

  // next month
  handleNextClick() {
    today.setDate(15)
    today.setMonth(today.getMonth() + 1)

    year = today.getFullYear()
    month = today.getMonth() + 1
    const monthText = this.convertMonthText(month) + ' ' + year
    $('.month-title label').html(monthText)

    $('.date-popup').hide()
    this.initCalendar()
  }

  // check Event day
  setEvent(vToday: any) {
    const newToday = new Date()
    const dateDayNextPrev = new Date(
      newToday.getFullYear() + '/' + (newToday.getMonth() + 1) + '/' + newToday.getDate()
    )
    for (const element of this.props.dataList) {
      const day = new Date(
        `${element.dateLabelDay} ${element.dateLabelMonth} ${element.dateLabelYear}`
      )

      const dateDay = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
      const dateVToday =
        vToday.getFullYear() + '-' + (vToday.getMonth() + 1) + '-' + vToday.getDate()
      const dateVTodayNextPrev = new Date(
        vToday.getFullYear() + '/' + (vToday.getMonth() + 1) + '/' + vToday.getDate()
      )

      if (dateDay === dateVToday) {
        if (dateVTodayNextPrev.getTime() < dateDayNextPrev.getTime()) {
          return {
            isFurture: false,
            data: element,
          }
        }
        if (dateVTodayNextPrev.getTime() >= dateDayNextPrev.getTime()) {
          return {
            isFurture: true,
            data: element,
          }
        }
      }
    }
    return null
  }

  // check if the date is on today
  isToday(vToday: any) {
    const newToday = new Date()

    const dateDay =
      newToday.getFullYear() + '-' + (newToday.getMonth() + 1) + '-' + newToday.getDate()
    const dateVToday = vToday.getFullYear() + '-' + (vToday.getMonth() + 1) + '-' + vToday.getDate()
    if (dateDay === dateVToday) return true
    else return false
  }

  // convert month text
  convertMonthText(monthValue: number) {
    let monthText = ''
    switch (monthValue) {
      case 1:
        monthText = 'January'
        break
      case 2:
        monthText = 'February'
        break
      case 3:
        monthText = 'March'
        break
      case 4:
        monthText = 'April'
        break
      case 5:
        monthText = 'May'
        break
      case 6:
        monthText = 'June'
        break
      case 7:
        monthText = 'July'
        break
      case 8:
        monthText = 'August'
        break
      case 9:
        monthText = 'September'
        break
      case 10:
        monthText = 'October'
        break
      case 11:
        monthText = 'November'
        break
      case 12:
        monthText = 'December'
        break
    }
    return monthText
  }

  render() {
    const { t } = this.props

    return (
      <div className="calendar-box">
        <div className="month-title">
          <label>July 2014</label>
          <a
            href="#javascript"
            className="btn-prev label-transparent"
            onClick={(event) => {
              this.handlePrevClick()
              event.preventDefault()
            }}
          >
            {t('common.btns.prev_arrow')}
          </a>
          <a
            href="#javascript"
            className="btn-next label-transparent"
            onClick={(event) => {
              this.handleNextClick()
              event.preventDefault()
            }}
          >
            {t('common.btns.next_arrow')}
          </a>
        </div>

        <div className="calendar-table">
          <table>
            <colgroup>
              <col className="col10" />
              <col className="col14" />
              <col className="col14" />
              <col className="col14" />
              <col className="col14" />
              <col className="col14" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>MON</th>
                <th>TUE</th>
                <th>WED</th>
                <th>THU</th>
                <th>FRI</th>
                <th>SAT</th>
                <th>SUN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td className="last-column">
                  <label />
                </td>
              </tr>
              <tr>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td className="last-column">
                  <label />
                </td>
              </tr>
              <tr>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td className="last-column">
                  <label />
                </td>
              </tr>
              <tr>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td className="last-column">
                  <label />
                </td>
              </tr>
              <tr>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td className="last-column">
                  <label />
                </td>
              </tr>
              <tr>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td>
                  <label />
                </td>
                <td className="last-column">
                  <label />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bottom-bar">
          <div className="two-points flex">
            <div className="items">
              <span className="points green" />
              <span className="txt">{t('home.dashboardFinanceManager.today')}</span>
            </div>
            <div className="items">
              <span className="points blue" />
              <span className="txt">{t('home.dashboardFinanceManager.upcoming_payment')}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(CustomCalendar)
