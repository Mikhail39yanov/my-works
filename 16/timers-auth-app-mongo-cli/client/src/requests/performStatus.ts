import chalk from 'chalk'
import Table from 'cli-table'
import { api, sessionFileName, table } from '../config/index.js'
import { ITimer } from '../types/ITimer.js'
import { consoleAxiosError, readSession, showTable } from '../utils/index.js'

export const performStatus = async (url: string, arg: (string | number)[] = []) => {
  try {
    const id = arg.toString()
    const sessionId = await readSession(sessionFileName)

    if (!sessionId) {
      return console.log(chalk.red('Сессия не активирована, сначала выполните команду npm run login or npm run signup'))
    }

    const { data, status } = await api.get<ITimer[]>(url, {
      headers: { sessionid: sessionId },
    })

    if (status === 200) {
      if (data) {
        if (id) {
          const timer = data.filter((t) => t.id === id)
          timer.length !== 0
            ? showTable(timer)
            : id === 'old'
            ? showTable(data)
            : console.log(`Unknown timer ID: ${chalk.bold.cyan(id)}.`)
        } else if (data.length !== 0) {
          showTable(data)
        } else {
          console.log(chalk.yellowBright('You have no active timers. 🤔'))
        }
      } else {
        console.log(chalk.yellowBright('You have no active timers. 🤔'))
      }
    } else if (status === 204) {
      console.log(`performStatus...`)
    }
  } catch (error) {
    consoleAxiosError(error)
  }
}
