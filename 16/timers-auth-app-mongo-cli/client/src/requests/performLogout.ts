import chalk from 'chalk'
import { unlink } from 'fs/promises'
import { api, sessionFileName } from '../config/index.js'
import { consoleAxiosError, readSession } from '../utils/index.js'

export const performLogout = async (url: string) => {
  try {
    const sessionId = await readSession(sessionFileName)

    // await api.get(`${url}/?sessionId=${sessionId}`)
    await api.get(url, {
      headers: { sessionid: sessionId },
    })

    unlink(sessionFileName)
    console.log(chalk.green('Logged out successfully! ✅'))
  } catch (error) {
    consoleAxiosError(error)
  }
}
