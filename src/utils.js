export function getDates(date = new Date()) {
  const month = date.getMonth()
  const year = date.getFullYear()

  return {
    Date: new Date(year, month),
    date: date.getDate(),
    month,
    timestamp: new Date(year, month, date.getDate()).getTime(),
    year,
  }
}

export function getNow() {
  const { year, month, date } = getDates()
  return new Date(year, month, date)
}

export function getDaysInMonth(date = new Date()) {
  const { year, month } = getDates(date)
  return 32 - new Date(year, month, 32).getDate()
}
