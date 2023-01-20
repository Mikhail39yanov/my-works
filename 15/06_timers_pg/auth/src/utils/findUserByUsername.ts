import { knexInstance } from '../config/index.js'
import { IUser } from '../types/IUser.js'

export const findUserByUsername = async (username: string) => {
  return await knexInstance<IUser>('users')
    .select()
    .where({ username })
    .limit(1)
    .then((results) => results[0])
}
