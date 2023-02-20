import { Request } from 'express'
import { Db, Document, WithId } from 'mongodb'
import { IUser } from './IUser.js'

export interface ICustomRequest<T> extends Request {
  body: T
  db?: Db
  user?: IUser
  createdUser?: string
  sessionId?: string
}

// | WithId<Document>
