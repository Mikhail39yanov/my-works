import express from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { IForm } from '../types/IForm.js'
import { auth } from '../utils/auth.js'
import { deleteSession } from '../utils/deleteSession.js'

const routerLogout = express.Router()

routerLogout.get('/', auth(), async (req: ICustomRequest<IForm>, res) => {
  const database = req.db
  if (!database) return

  const sessionId = req.sessionId

  if (!req.user) {
    return res.redirect('/')
  }

  if (sessionId) {
    deleteSession(database, sessionId)
    res.clearCookie('sessionId').redirect('/')
  }
})

export { routerLogout }
