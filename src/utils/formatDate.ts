export type FormatDateInput = string | number | Date

const DEFAULT_TIME_ZONE = "Asia/Tokyo"

const partsToMap = (parts: Intl.DateTimeFormatPart[]) => {
  const map = new Map<string, string>()
  parts.forEach((part) => {
    if (part.type !== "literal") {
      map.set(part.type, part.value)
    }
  })
  return map
}

const clampDate = (value: FormatDateInput): Date | null => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatWithTimeZone = (value: Date, timeZone: string) => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const parts = formatter.formatToParts(value)
  const partsMap = partsToMap(parts)
  const year = partsMap.get("year") ?? ""
  const month = partsMap.get("month") ?? ""
  const day = partsMap.get("day") ?? ""
  return `${year}.${month}.${day}`
}

export const formatDate = (value: FormatDateInput, timeZone = DEFAULT_TIME_ZONE) => {
  const date = clampDate(value)
  if (!date) {
    return ""
  }
  return formatWithTimeZone(date, timeZone)
}

export default formatDate
