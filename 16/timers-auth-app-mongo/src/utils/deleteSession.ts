import { Db } from 'mongodb'
import { EDB } from '../config/index.js'
import { ISession } from '../types/ISession.js'

export const deleteSession = async (db: Db, sessionId: string) => {
  db.collection<ISession>(EDB.collectionSessions).deleteOne({ sessionId })
}
