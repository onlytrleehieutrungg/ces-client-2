import { format, getTime, formatDistanceToNow } from 'date-fns'

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  if (date) return format(new Date(date), 'dd MMMM yyyy')
  else return 'Nah'
}

export function fDateVN(date: Date | string | number) {
  if (date) return format(new Date(date), 'dd/MM/yyyy')
  else return ''
}

export function fTime(date: Date | string | number) {
  if (date) return format(new Date(date), 'hh:mm a')
  else return ''
}

export function fDateParam(date: Date | string | number) {
  if (date) return format(new Date(date), 'yyyy-MM-dd')
  else return 'Nah'
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p')
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date))
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p')
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}
