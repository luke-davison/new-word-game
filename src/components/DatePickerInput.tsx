import './DatePickerInput.css';

import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useContext, useState } from 'react';

import { getDateString } from '../../common/utils/getDateString';
import { AppContext } from '../stores/AppContext';

export const DatePickerInput: React.FC = observer(() => {
  const { today, changeDate } = useContext(AppContext)

  const [value, setValue] = useState<string>(getDateString(today))

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue)

    const [year, month, day] = newValue.split("-")
    if (Number(day) && Number(month) && Number(year)) {
      changeDate(new Date(Number(year), Number(month) - 1, Number(day)))
    }
  }

  const [year, month, day] = value.split("-")


  const isValidDate = !!new Date(Number(year), Number(month) - 1, Number(day))
  
  let className = "date-picker-input-container"
  if (!isValidDate) {
    className += " invalid-date"
  }

  return (
    <div className={className}>
      <input value={value} onChange={onChange}/>
    </div>
  )
})