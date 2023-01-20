import express from 'express'
import bodyParser from 'body-parser'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { IForm } from '../types/IForm.js'
import { createUserInDB } from '../utils/createUserInDB.js'
import { getHash } from '../utils/getHash.js'
import { knexInstance } from '../config/index.js'
import { IUser } from '../types/IUser.js'

const routerSignup = express.Router()

routerSignup.post('/', bodyParser.urlencoded({ extended: false }), async (req: ICustomRequest<IForm>, res) => {
  const { username, password } = req.body
  const user = createUserInDB(username, getHash(password))

  try {
    await knexInstance<IUser>('users').insert({
      id: user.id,
      username: user.username,
      password: user.password,
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
