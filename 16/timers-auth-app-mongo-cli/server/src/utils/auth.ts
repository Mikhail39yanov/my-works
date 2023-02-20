import { NextFunction, Response } from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { findUserBySessionId } from './findUserBySessionId.js'

export const auth = () => async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const database = req.db

  if (!database) {
    return
  }

  const sessionId = req.headers['sessionid'] || req.query.sessionId

  if (!sessionId) {
    res.status(401).send('Unauthorized')
    return next()
  }

  const user = await findUserBySessionId(database, sessionId)

  if (user === undefined || user === null) {
    return
  }

  req.user = user
  req.sessionId = sessionId
  next()
}
