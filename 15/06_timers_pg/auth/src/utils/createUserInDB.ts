import { nanoid } from 'nanoid'
import { IUser } from '../types/IUser.js'

export const createUserInDB = (username: string, password: string): IUser => {
  return {
    id: nanoid(),
    username,
    password,
  }
}
