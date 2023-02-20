import { Request } from 'express'
import { Db } from 'mongodb'
import { IUser } from './IUser.js'

interface RequestParams {
  id: string
}

// interface ResponseBody {}

interface RequestBody {
  username: string
  password: string
  description: string
}

interface RequestQuery {
  sessionId?: string | string[]
  isActive: string
}

export interface ICustomRequest extends Request<RequestParams, unknown, RequestBody, RequestQuery> {
  db?: Db
  user?: IUser
  sessionId?: string | string[]
}
