import './CalendarPopup.css';

import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../stores/AppContext';
import { Calendar } from './Calendar';

interface CalendarPopupProps {
  onClose: () => void
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose }) => {
  const { loadStreakScore } = useContext(AppContext)
  const [streak, setStreak] = useState<number | undefined>()

  useEffect(() => {
    const streak = loadStreakScore();
    setStreak(streak)
  }, [])

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
        <div>{`You have a streak of ${streak}`}</div>
    </div>
  )
}