import React, { useState } from 'react'
import './App.css'

import Weekdays from './Weekdays'
import { DAYS, MONDAY, MONTHS } from './constants'
import { getDates, getDaysInMonth, getNow } from './utils'

const App = () => {
  const [week, setWeek] = useState(DAYS)
  const [current, setCurrent] = useState(getDates())

  const weekStart = week.indexOf(MONDAY)
  const lastDatePrevMonth = new Date(current.year, current.month, 0)

  const prevMonth = {
    dates: lastDatePrevMonth.getDay() + weekStart,
    month: new Date(current.year, current.month - 1),
  }
  const thisMonth = {
    dates: getDaysInMonth(current.Date),
    month: current.Date,
  }
  const nextMonth = {
    dates: 42 - (prevMonth.dates + thisMonth.dates),
    month: new Date(current.year, current.month + 1),
  }

  const populate = ({ dates, month }) => {
    const days = getDaysInMonth(month)
    return Array.apply(null, new Array(dates)).map((v, i) => {
      const index = i + 1
      const date = month < current.Date ? days - dates + index : index
      return {
        date,
        state: month === current.Date ? 'active' : 'inactive',
        timestamp: month.setDate(date),
        today: +month === +getNow(),
      }
    })
  }

  const dates = [...populate(prevMonth), ...populate(thisMonth), ...populate(nextMonth)].map(
    (date, index) => ({ ...date, day: week[index % 7].toLowerCase() }),
  )

  const onClickDate = timestamp => console.log(timestamp)

  const onChangeMonth = month => {
    const { year } = current
    setCurrent(getDates(new Date(year, month)))
  }

  return (
    <div className="App">
      <header className="header">
        <h1>
          {MONTHS[current.month]} {current.year}
        </h1>
        <button onClick={() => onChangeMonth(current.month - 1)} type="button">{`<<`}</button>
        <button onClick={() => onChangeMonth(current.month + 1)} type="button">{`>>`}</button>
      </header>
      <Weekdays week={week} setWeek={setWeek} />
      <div className="dates">
        {dates.map(({ date, timestamp, ...rest }) => {
          const classes = Object.entries(rest)
            .filter(([key, val]) => val)
            .map(([key, val]) => (typeof val === 'boolean' ? key : val))
          return (
            <div
              className={`date ${classes.join(' ')}`}
              key={timestamp}
              onClick={() => onClickDate(timestamp)}
            >
              <span className="date-label">{date}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
