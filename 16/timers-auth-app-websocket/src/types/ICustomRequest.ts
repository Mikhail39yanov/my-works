import { Request } from 'express'
import { Db } from 'mongodb'
import WebSocket from 'ws'
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
  isActive: string
  sessionId?: string
  authError: string
  user: string
  authErrorUser: string
}

export interface ICustomRequest extends Request<RequestParams, unknown, RequestBody, RequestQuery> {
  ws?: WebSocket.Server<WebSocket.WebSocket>
  db?: Db
  user?: IUser
  sessionId?: string
  createdUser?: string
  userId?: string
}
