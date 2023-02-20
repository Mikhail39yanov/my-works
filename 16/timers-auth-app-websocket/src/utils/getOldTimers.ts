import { Db } from 'mongodb'
import { EDB } from '../config/index.js'
import { ITimer } from '../types/ITimer.js'
import { findUserBySessionId } from './findUserBySessionId.js'

export const getOldTimers = async (database: Db, sessionId: string) => {
  const userId = await findUserBySessionId(database, sessionId)
  const oldTimers = await database
    .collection<ITimer>(EDB.collectionTimers)
    .find()
    .toArray()
    .then((timers) => {
      if (timers.length === 0) {
        return null
      }

      return timers
        .filter((timer) => !timer.isActive && timer.user_id.toString() === userId?._id.toString())
        .map((t) => ({
          ...t,
          _id: t._id.toString(),
          user_id: t.user_id.toString(),
        }))
        .sort((a, b) => {
          if (a.end > b.end) {
            return -1
          }
          return 0
        })
    })
  return oldTimers
}
