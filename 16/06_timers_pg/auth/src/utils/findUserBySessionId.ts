import { knexInstance } from '../config/index.js'
import { ISession } from '../types/ISession.js'
import { IUser } from '../types/IUser.js'

export const findUserBySessionId = async (sessionId: string) => {
  const session = await knexInstance<ISession>('sessions')
    .select('user_id')
    .where({ session_id: sessionId })
    .limit(1)
    .then((results) => results[0])

  if (!session) {
    return
  }

  return await knexInstance<IUser>('users')
    .select()
    .where({ id: session.user_id })
    .limit(1)
    .then((results) => results[0])
}
