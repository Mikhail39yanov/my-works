import chalk from 'chalk'
import { api, sessionFileName } from '../config/index.js'
import { consoleAxiosError } from '../utils/consoleAxiosError.js'
import { readSession } from '../utils/readSession.js'

export const stopTimer = async (url: string, arg: (string | number)[]) => {
  try {
    const id = arg.toString()

    if (!id) {
      return console.log(chalk.red('ID Таймера не был указан'))
    }

    const sessionId = await readSession(sessionFileName)

    if (!sessionId) {
      return console.log(chalk.red('Сессия не активирована, сначала выполните команду npm run login or npm run signup'))
    }

    const { status } = await api.post(
      url,
      {},
      {
        headers: { sessionid: sessionId },
      },
    )

    if (status === 200) {
      console.log(`Timer ${chalk.bold.cyan(id)} stopped.`)
    } else if (status === 204) {
      console.log(`createTimer...`)
    }
  } catch (error) {
    consoleAxiosError(error)
  }
}
