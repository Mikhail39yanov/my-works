import express from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { findUserByUsername } from '../utils/findUserByUsername.js'
import { createSession } from '../utils/createSession.js'
import { getHash } from '../utils/getHash.js'

const routerLogin = express.Router()

routerLogin.post('/', async (req: ICustomRequest, res) => {
  const database = req.db
  if (!database) return

  const { username, password } = req.body

  try {
    const user = await findUserByUsername(database, username)

    if (!user || user.password !== getHash(password)) {
      // return res.json({ username, messageError: `Wrong username or password!` })
      return res.sendStatus(204)
    }

    const sessionId = await createSession(database, String(user._id))

    res.json({ sessionId })
  } catch (error) {
    if (error instanceof Error) {
      // res.status(400).send(error.message)
      res.json({ error: 'routerLogin...' })
      return
    } else {
      console.error('Unexpected error', error)
      return
    }
  }
})

export { routerLogin }
