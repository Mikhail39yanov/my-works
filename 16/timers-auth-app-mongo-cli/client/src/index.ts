import 'dotenv/config.js'
import { EActionCLIApiClient, EApiTimers } from './types/EActionCLIApiClient.js'
import { parser } from './config/index.js'
import { createTimer, performLogin, performLogout, performSignup, performStatus, stopTimer } from './requests/index.js'
import { switchIsActiveParams } from './utils/index.js'
;(async () => {
  const args = await parser.argv

  switch (args.api) {
    case EActionCLIApiClient.signup:
      return performSignup(`/${args.api}`)

    case EActionCLIApiClient.login:
      return performLogin(`/${args.api}`)

    case EActionCLIApiClient.logout:
      return performLogout(`/${args.api}`)

    case EActionCLIApiClient.status:
      return performStatus(`/${EApiTimers.apiTimers}/${args.api}${switchIsActiveParams(args._)}`, args._)

    case EActionCLIApiClient.start:
      return createTimer(`/${EApiTimers.apiTimers}${args.api}`, args._)

    case EActionCLIApiClient.stop:
      return stopTimer(`/${EApiTimers.apiTimers}/${args._[0]}/${args.api}`, args._)

    default:
      break
  }
})()
