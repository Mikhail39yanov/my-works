import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('ru')

export function showDateFullMoment(date: number): string {
  const created = new Date(date * 1000)
  return moment(created).format('lll')
}