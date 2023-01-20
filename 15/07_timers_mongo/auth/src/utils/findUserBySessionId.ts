import { Db, ObjectId } from 'mongodb'
import { EDB } from '../config/index.js'
import { ISession } from '../types/ISession.js'
import { IUser } from '../types/IUser.js'

export const findUserBySessionId = async (db: Db, sessionId: string) => {
  const session = await db
    .collection<ISession>(EDB.collectionSessions)
    .findOne({ sessionId }, { projection: { userId: 1 } })

  if (!session) {
    return
  }

  return db.collection<IUser>(EDB.collectionUsers).findOne({ _id: new ObjectId(session.userId) })
}
