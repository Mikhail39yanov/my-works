import { knexInstance } from '../config/index.js'
import { ISession } from '../types/ISession.js'

export const deleteSession = async (sessionId: string) => {
  await knexInstance<ISession>('sessions').where({ session_id: sessionId }).delete()
}
