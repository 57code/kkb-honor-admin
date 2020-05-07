export function genMonthDateCount() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = new Date(year, month, 0)
  return date.getDate()
}

export function getDateArray() {
  const ret = []
  for (let index = 1; index < genMonthDateCount(); index++) {
    ret.push(index.toString())
  }
  return ret
}
