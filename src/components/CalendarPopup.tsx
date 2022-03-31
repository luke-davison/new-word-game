import './CalendarPopup.css';

import React, { useEffect } from 'react';

import { Calendar } from './Calendar';

interface CalendarPopupProps {
  onClose: () => void
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose }) => {
  useEffect(() => {
    const listener = () => {
      onClose()
    }

    document.body.addEventListener('click', listener);
    return () => document.body.removeEventListener('click', listener)
  }, [])

  return (
    <div className="calendar-popup">
      <Calendar/>
    </div>
  )
}