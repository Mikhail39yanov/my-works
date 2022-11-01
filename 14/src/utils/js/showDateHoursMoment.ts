import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('ru')

export function showDateHoursMoment(date: number): string {
  const created = new Date(date * 1000)
  return moment(created).startOf('hour').fromNow()
}