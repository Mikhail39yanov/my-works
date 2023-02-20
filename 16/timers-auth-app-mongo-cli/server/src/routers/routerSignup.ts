import express from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { createUserInDB } from '../utils/createUserInDB.js'
import { getHash } from '../utils/getHash.js'
import { EDB } from '../config/index.js'
import { IUser } from '../types/IUser.js'
import { findUserByUsername } from '../utils/findUserByUsername.js'
import { createSession } from '../utils/createSession.js'

const routerSignup = express.Router()

routerSignup.post('/', async (req: ICustomRequest, res) => {
  const database = req.db
  if (!database) return

  const user = await findUserByUsername(database, req.body.username)

  if (user) {
    // return res.json({ user, messageError: `Пользователь ${user.username} есть в базе` })
    return res.sendStatus(204)
  }

  try {
    const { username, password } = createUserInDB(req.body.username, getHash(req.body.password))

    await database.collection<IUser>(EDB.collectionUsers).insertOne({
      username,
      password,
    })

    const user = await findUserByUsername(database, req.body.username)

    if (!user) {
      return res.sendStatus(204)
    }

    const sessionId = await createSession(database, String(user._id))

    res.json({ sessionId })
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: 'routerSignup...' })
      return
    } else {
      console.error('Unexpected error', error)
      return
    }
  }
})

export { routerSignup }
