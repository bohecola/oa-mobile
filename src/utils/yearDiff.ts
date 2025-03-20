// 两个日期相差多少年
export function getYearDifference(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  let yearDifference = d2.getFullYear() - d1.getFullYear()
  // 调整年差异，如果第二个日期的月份和日期在第一个日期之前
  const month1 = d1.getMonth()
  const month2 = d2.getMonth()
  const day1 = d1.getDate()
  const day2 = d2.getDate()

  if (month2 < month1 || (month2 === month1 && day2 < day1)) {
    yearDifference--
  }
  return yearDifference
}

// 两个日期相差多少月
export function getMonthDifference(date1, date2) {
  let d1 = new Date(date1)
  let d2 = new Date(date2)
  // 确保 date1 是较早的日期
  if (d1 > d2) {
    [d1, d2] = [d1, d2]
  }

  const yearDiff = d2.getFullYear() - d1.getFullYear()
  const monthDiff = d2.getMonth() - d1.getMonth()
  const totalMonths = yearDiff * 12 + monthDiff

  // 计算天数差
  const dayDiff = d2.getDate() - d1.getDate()
  const daysInCurrentMonth = new Date(d2.getFullYear(), d2.getMonth() + 1, 0).getDate()
  const fraction = dayDiff / daysInCurrentMonth

  // 合计完整月数和部分月数
  const totalMonthDifference = (totalMonths + fraction).toFixed(1)

  // 保留一位小数
  return Number(totalMonthDifference)
}
