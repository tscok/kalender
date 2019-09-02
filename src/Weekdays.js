import React from 'react'
import { SUNDAY } from './constants'

const Weekdays = ({ week, setWeek }) => {
  const onChangeWeek = () => {
    const newWeek = [...week]
    newWeek[0] === SUNDAY ? newWeek.push(newWeek.shift()) : newWeek.unshift(newWeek.pop())

    setWeek(newWeek)
  }

  return (
    <div className="weekdays" onClick={onChangeWeek}>
      {week.map(weekday => (
        <div key={weekday} className="weekday">
          {weekday.slice(0, 3)}
        </div>
      ))}
    </div>
  )
}

export default Weekdays
