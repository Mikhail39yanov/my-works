import express from 'express'
import bodyParser from 'body-parser'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { createUserInDB } from '../utils/createUserInDB.js'
import { getHash } from '../utils/getHash.js'
import { EDB } from '../config/index.js'
import { IUser } from '../types/IUser.js'
import { findUserByUsername } from '../utils/findUserByUsername.js'

const routerSignup = express.Router()

routerSignup.post('/', bodyParser.urlencoded({ extended: false }), async (req: ICustomRequest, res) => {
  const database = req.db
  if (!database) return

  const user = await findUserByUsername(database, req.body.username)

  if (user) {
    return res.redirect('/?authErrorUser=true')
  }

  const { username, password } = createUserInDB(req.body.username, getHash(req.body.password))

  try {
    database.collection<IUser>(EDB.collectionUsers).insertOne({
      username,
      password,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message)
      return
    } else {
      console.error('Unexpected error', error)
      return
    }
  }

  res.status(201).redirect(`/?user=${username}`)
})

export { routerSignup }
