import { Db, ObjectId } from 'mongodb'
import { EDB } from '../config/index.js'
import { ITimer } from '../types/ITimer.js'
import { findUserBySessionId } from './findUserBySessionId.js'

export const getActiveTimers = async (database: Db, sessionId: string) => {
  const userId = await findUserBySessionId(database, sessionId)

  await database
    .collection<ITimer>(EDB.collectionTimers)
    .find()
    .toArray()
    .then(async (timers) => {
      timers.forEach(async (timer) => {
        if (timer.isActive && timer.user_id.toString() === userId?._id.toString()) {
          await database.collection<ITimer>(EDB.collectionTimers).updateOne(
            { _id: new ObjectId(timer._id) },
            {
              $set: { progress: Date.now() - timer.start },
            },
          )
        }
      })
    })

  const activeTimers = await database
    .collection<ITimer>(EDB.collectionTimers)
    .find()
    .toArray()
    .then((timers) => {
      if (timers.length === 0) {
        return null
      }

      return timers
        .filter((timer) => timer.isActive && timer.user_id.toString() === userId?._id.toString())
        .map((t) => ({
          ...t,
          _id: t._id.toString(),
          id: t._id.toString(),
          user_id: t.user_id.toString(),
        }))
        .sort((a, b) => {
          if (a.start > b.start) {
            return -1
          }
          return 0
        })
    })
  return activeTimers
}
