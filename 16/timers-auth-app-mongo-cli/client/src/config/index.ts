import 'dotenv/config.js'
import os from 'os'
import path from 'path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import axios from 'axios'
import chalk from 'chalk'
import Table from 'cli-table'

const homeDir = os.homedir()
const isWindows = os.type().match(/windows/i)
export const sessionFileName = path.join(homeDir, `${isWindows ? '_' : '.'}sb-timers-session`)
// console.log('File to keep the session ID:', sessionFileName)

export const parser = yargs(hideBin(process.argv))
  .scriptName('index.ts')
  .example('npm run help', 'Все ключи указаны после --api в choices.')
  .example(
    `Пример 1 команды: ${chalk.red('ts-node ./src/index.ts --api signup')}`,
    'Обязательно нужно указать флаг --api и затем необходимую команду к примеру signup.',
  )
  .example('OR', 'OR')
  .example(
    `Пример 2 команды: ${chalk.red('npm run start `Some task`')}`,
    'Также некоторым командам можно задать дополнительный аргумент',
  )
  .example(
    'Все команды:',
    `---------------------------
    ${chalk.gray('npm run signup')}
    ${chalk.gray('npm run login')}
    ${chalk.gray('npm run logout')}
    ${chalk.gray('npm run start `Some task`')}
    ${chalk.gray('npm run status 63d58')}
    ${chalk.gray('npm run stop 63d58')}
    ${chalk.gray('npm run status old')}
  `,
  )
  .example('Дополнительную информацию и команды смотрите в файле в package.json', ``)
  .option('api', {
    choices: ['signup', 'login', 'logout', '', '?isActive=', 'stop'] as const,
    demandOption: true,
    type: 'string',
    nargs: 1,
  })
  .alias('help', 'h')
  .epilog(chalk.blue('(c) 2023 Yanov Mikhail'))

axios.defaults.baseURL = process.env.SERVER

export const api = axios

export const table = new Table({
  head: ['ID', 'Task', 'Time'],
  colWidths: [30, 30, 30],
})
