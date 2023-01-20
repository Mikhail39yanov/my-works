import { ObjectId } from "mongodb"

export interface IUser {
  _id?: string | ObjectId
  username: string
  password: string
}

export type IUsers = IUser[]
