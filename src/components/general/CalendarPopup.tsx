import './styles/CalendarPopup.css';

import React, { useEffect, useState } from 'react';

// import { Calendar } from './Calendar';

interface CalendarPopupProps {
  onClose: () => void
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose }) => {
  const [streak] = useState<number | undefined>()

  useEffect(() => {
    const listener = () => {
      onClose()
    }

    document.body.addEventListener('click', listener);
    return () => document.body.removeEventListener('click', listener)
  }, [onClose])

  return (
    <div className="calendar-popup">
      {/* <Calendar/> */}
      <div>{`You have a streak of ${streak}`}</div>
    </div>
  )
}