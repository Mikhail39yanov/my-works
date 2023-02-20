import chalk from 'chalk'
import { api, sessionFileName } from '../config/index.js'
import { ITimer } from '../types/ITimer.js'
import { consoleAxiosError, readSession } from '../utils/index.js'

export const createTimer = async (url: string, arg: (string | number)[]) => {
  try {
    const description = arg[0].toString()

    const sessionId = await readSession(sessionFileName)

    if (!sessionId) {
      return console.log(chalk.red('Сессия не активирована, сначала выполните команду npm run login or npm run signup'))
    }

    const { data, status } = await api.post<ITimer>(
      url,
      { description },
      {
        headers: { sessionid: sessionId },
      },
    )

    if (status === 200) {
      console.log(`Started timer ${data.description}, ID: ${chalk.cyan(data.id)}.`)
    } else if (status === 204) {
      console.log(`createTimer...`)
    }
  } catch (error) {
    consoleAxiosError(error)
  }
}
