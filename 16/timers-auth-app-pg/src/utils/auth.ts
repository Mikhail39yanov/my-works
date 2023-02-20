import { NextFunction, Response } from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { findUserBySessionId } from './findUserBySessionId.js'
import { IForm } from '../types/IForm.js'

export const auth = () => async (req: ICustomRequest<IForm>, res: Response, next: NextFunction) => {
  const readCookies: string = req.cookies['sessionId']

  if (!readCookies) {
    return next()
  }

  const user = await findUserBySessionId(readCookies)
  req.user = user
  req.sessionId = readCookies
  next()
}
