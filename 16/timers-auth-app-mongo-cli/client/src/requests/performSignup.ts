import chalk from 'chalk'
import inquirer from 'inquirer'
import { api, sessionFileName } from '../config/index.js'
import { questions } from '../consts/data.js'
import { IPerformSignupOrLogin } from '../types/IPerformSignupOrLogin.js'
import { IUserPrompt } from '../types/IUserPrompt.js'
import { consoleAxiosError, makeSessionFile } from '../utils/index.js'

export const performSignup = async (url: string) => {
  try {
    const dataPrompt: IUserPrompt = await inquirer.prompt(questions)

    if (dataPrompt.username.length === 0 || dataPrompt.password.length === 0) {
      return console.error(chalk.red('Username и password не может быть пустой строкой ❌'))
    }

    const { data, status } = await api.post<IPerformSignupOrLogin>(url, dataPrompt)

    if (status === 200) {
      makeSessionFile(sessionFileName, data.sessionId)
      console.log(chalk.green('Signed up successfully! ✅'))
    } else if (status === 204) {
      console.log(chalk.yellow(`Пользователь ${dataPrompt.username} уже есть в базе`))
    }
  } catch (error) {
    consoleAxiosError(error)
  }
}
