import './Calendar.css';

import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { getDateString } from 'shared/utils/getDateString';

import { AppContext } from '../stores/AppContext';

const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayHeadings: string[] = ["M", "T", "W", "T", "F", "S", "S"]

export const Calendar: React.FC = observer(() => {
  const { today, scoreMap} = useContext(AppContext)

  const [dayInCurrentMonth, setDayInCurrentMonth] = useState<Date>(today)

  const year = dayInCurrentMonth.getFullYear();
  const month = dayInCurrentMonth.getMonth();


  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7
  const days = [...Array(daysInMonth)]

  const onClickCalendar = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }

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
        <div className="calendar-navigation" onClick={goToPreviousMonth}>
          &lt;
        </div>
        <div className="calendar-title">
          {`${months[month]} ${year}` }
        </div>
        <div className="calendar-navigation" onClick={goToNextMonth}>
          &gt;
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
            
            let className = "calendar-day";
            if (index === 0) {
              className += " calendar-day-offset-" + firstDayOfWeek
            }
            if (month === today.getMonth() && year === today.getFullYear() && index + 1 === today.getDate()) {
              className += " calendar-day-today"
            }
            
            const dayString = getDateString(new Date(year, month, index + 1))
            const scoreInfo = scoreMap.get(dayString)

            if (!scoreInfo?.exists) {
              className += " calendar-day-not-exists"
            } else if (scoreInfo?.metSecretTarget) {
              className += " calendar-day-met-secret-target"
            } else if (scoreInfo?.metTarget) {
              className += " calendar-day-met-target"
            } else if (scoreInfo?.attempted) {
              className += " calendar-day-attempted"
            }

            return (
              <div key={index} className={className}>
                <div>
                  { index + 1 }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})