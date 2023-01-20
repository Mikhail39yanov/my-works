import { Request } from 'express'
import { IUser } from './IUser.js'

export interface ICustomRequest<T> extends Request {
  body: T
  user?: IUser
  createdUser?: string
  sessionId?: string
}
