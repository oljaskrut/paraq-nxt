import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday.js"
import isYesterday from "dayjs/plugin/isYesterday.js"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(isYesterday)
dayjs.extend(isToday)
dayjs.extend(utc)
dayjs.extend(timezone)

function ddd() {
  return process.env.NODE_ENV === "production"
    ? dayjs()
    : dayjs().add(6, "hours")
}

export function thisMonth() {
  return ddd().subtract(1, "month").toDate()
}
export function thisWeek() {
  return ddd().subtract(1, "week").toDate()
}

export function todayDate() {
  return ddd().subtract(24, "hours").toDate()
}

export function formatDateX(date: Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm")
}

export function formatDate(date: Date) {
  const d = dayjs(date).subtract(6, "hours")
  if (d.isToday()) {
    return "Сегодня, " + d.format("HH:mm")
  }
  if (d.isYesterday()) {
    return "Вчера, " + d.format("HH:mm")
  }
  return d.format("DD.MM HH:mm")
}

export function formatTime(date: Date) {
  const d = dayjs(date).subtract(6, "hours")
  return d.format("HH:mm")
}

export function formatSimple(date: Date) {
  const d = dayjs(date).subtract(6, "hours")
  return d.format("DD.MM HH:mm")
}
