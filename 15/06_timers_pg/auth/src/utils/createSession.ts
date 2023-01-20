import { nanoid } from 'nanoid'
import { knexInstance } from '../config/index.js'
import { ISession } from '../types/ISession.js'

export const createSession = async (userId: string) => {
  const sessionId = nanoid()

  await knexInstance<ISession>('sessions').insert({
    id: userId,
    user_id: userId,
    session_id: sessionId,
  })

  return sessionId
}
