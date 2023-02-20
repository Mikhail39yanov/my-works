import { table } from '../config/index.js'
import { ITimer } from '../types/ITimer.js'
import { formatDuration } from './index.js'

export const showTable = (data: ITimer[]) => {
  data.forEach((t) => {
    table.push([String(t._id), t.description, formatDuration(t.progress)])
  })
  console.log(table.toString())
}
