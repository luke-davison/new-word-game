import './styles/Calendar.css'

import { observer } from 'mobx-react-lite'
import { FunctionComponent, MouseEvent, useState } from 'react'

const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayHeadings: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

interface CalendarProps {
  startDate: Date;
  minDate: Date;
  maxDate: Date;
  renderDate?: (date: Date) => JSX.Element
}

export const Calendar: FunctionComponent<CalendarProps> = observer(({ startDate, minDate, maxDate, renderDate }) => {
  const [dayInCurrentMonth, setDayInCurrentMonth] = useState<Date>(startDate)

  const year = dayInCurrentMonth.getFullYear()
  const month = dayInCurrentMonth.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7
  const days = [...Array(daysInMonth)]

  const onClickCalendar = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const showPreviousMonthButton: boolean = 
    year > minDate.getFullYear() ||
    (year === minDate.getFullYear() && month > minDate.getMonth())

  const showNextMonthButton: boolean = 
    year < maxDate.getFullYear() ||
    (year === maxDate.getFullYear() && month < maxDate.getMonth())

  const goToPreviousMonth = () => {
    const newDate = new Date(year, month - 1, 1)
    setDayInCurrentMonth(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(year, month + 1, 1)
    setDayInCurrentMonth(newDate)
  }

  return (
    <div className="calendar" onClick={onClickCalendar}>
      <div className="calendar-header">
        <div className="calendar-navigation">
          { showPreviousMonthButton && (
            <button onClick={goToPreviousMonth}>
              &lt;
            </button>
          )}
        </div>
        <div className="calendar-title">
          {`${months[month]} ${year}` }
        </div>
        <div className="calendar-navigation">
          { showNextMonthButton && (
            <button onClick={goToNextMonth}>
              &gt;
            </button>
          )}
        </div>
      </div>
      <div className="calendar-container">
        <div className="calendar-column-headers">
          {dayHeadings.map((day, index) => (
            <div key={index} className="calendar-column-header">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-main">
          {days.map((x, index) => {
            
            let className = 'calendar-day'
            if (index === 0) {
              className += ' calendar-day-offset-' + firstDayOfWeek
            }
            if (month === startDate.getMonth() && year === startDate.getFullYear() && index + 1 === startDate.getDate()) {
              className += ' calendar-day-today'
            }

            return (
              <div key={index} className={className}>
                { renderDate ? renderDate(new Date(year, month, index + 1)) : (
                  <div>
                    { index + 1 }
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})