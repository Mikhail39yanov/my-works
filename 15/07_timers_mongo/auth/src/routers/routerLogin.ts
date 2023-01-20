import express from 'express'
import bodyParser from 'body-parser'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { IForm } from '../types/IForm.js'
import { findUserByUsername } from '../utils/findUserByUsername.js'
import { createSession } from '../utils/createSession.js'
import { getHash } from '../utils/getHash.js'

const routerLogin = express.Router()

routerLogin.post('/', bodyParser.urlencoded({ extended: false }), async (req: ICustomRequest<IForm>, res) => {
  const database = req.db
  if (!database) return

  const { username, password } = req.body

  try {
    const user = await findUserByUsername(database, username)

    if (!user || user.password != getHash(password)) {
      return res.redirect('/?authError=true')
    }

    const sessionId = await createSession(database, String(user._id))

    res.cookie('sessionId', sessionId, { httpOnly: true }).redirect('/')
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message)
      return
    } else {
      console.error('Unexpected error', error)
      return
    }
  }
})

export { routerLogin }
