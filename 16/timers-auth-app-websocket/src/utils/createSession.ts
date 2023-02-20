import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { EDB } from '../config/index.js'
import { ISession } from '../types/ISession.js'

export const createSession = async (db: Db, userId: string) => {
  const sessionId = nanoid()

  db.collection<ISession>(EDB.collectionSessions).insertOne({
    userId,
    sessionId,
  })

  return sessionId
}
