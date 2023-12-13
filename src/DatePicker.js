import React, { useState } from 'react'
import './DatePicker.css';
import './Control.css'
import './PickerHeader.css'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DAYS_MAP_STR, MONTHS_MAP_STR } from './constants';
import { getMonthDetails } from './day-utils';

export default function DatePicker() {

  const [showDatePicker, setShowPicker] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [monthDetails, setMonthDetails] = useState(getMonthDetails(currentYear, currentMonth));
  const [pureDate, setPureDate] = useState(new Date().toISOString().substr(0, 10))
  const setMonth = (offset) => {
    let year = currentYear;
    let month = currentMonth + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    setCurrentYear(year)
    setCurrentMonth(month)
    setMonthDetails(getMonthDetails(year, month))
  }
  const onSelectDay = (day) => {
    console.log(day)
    setPureDate(day.pureDate)
    setShowPicker(false)
  }
  return (
    <div className='MyDatePicker'>
      <div className='mdp-input' onClick={() => setShowPicker(true)}>
        <input type='date' value={pureDate} onChange={(e) => { console.log(e) }} />
      </div>
      {showDatePicker && <div className='mdp-container'>
        <div className='picker-header'>
          <IconButton aria-label="left" onClick={() => setMonth(-1)}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <div className='header-month-year-title'>{MONTHS_MAP_STR[currentMonth]} {currentYear}</div>
          <IconButton aria-label="left" onClick={() => setMonth(1)}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>

        <div className='day-header'>
          {DAYS_MAP_STR.map(day => {
            return <Typography key={day} variant="caption" display="block" >
              {day.slice(0, 2)}
            </Typography>
          })}
        </div>

        <div className='calender-days'>
          {
            monthDetails.map((day, index) => {
              return (
                <div key={index} className={'calender-day ' + (day.month !== 0 ? 'calender-day-disabled' : '')} onClick={() => onSelectDay(day)}>
                  <span>
                    {day.date}
                  </span>
                </div>
              )
            })
          }

        </div>
      </div >}
    </div >
  )
}
