import express from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { findUserBySessionId } from '../utils/findUserBySessionId.js'
import { Timer } from '../utils/Timer.js'
import { auth } from '../utils/auth.js'
import { ITimer } from '../types/ITimer.js'
import { EDB } from '../config/index.js'
import { ObjectId } from 'mongodb'

const routerTimers = express.Router()

routerTimers.post('/:id/stop', auth(), async (req: ICustomRequest, res) => {
  const database = req.db

  if (!database) {
    return
  }

  if (!req.user) {
    return res.sendStatus(401)
  }

  const id = req.params.id

  await database
    .collection<ITimer>(EDB.collectionTimers)
    .find()
    .toArray()
    .then(async (timers) => {
      timers.forEach(async (timer) => {
        if (timer._id.toString() === id.toString()) {
          await database.collection<ITimer>(EDB.collectionTimers).updateOne(
            { _id: new ObjectId(timer._id) },
            {
              $set: {
                isActive: false,
                end: Date.now(),
                duration: timer.progress,
              },
            },
          )
        }
      })
    })

  res.json([])
})

routerTimers.post('/', auth(), async (req: ICustomRequest, res) => {
  const database = req.db

  if (!database) {
    return
  }

  const sessionId = req.sessionId

  if (sessionId === undefined) return

  if (!req.user) {
    return res.sendStatus(401)
  }

  const userId = await findUserBySessionId(database, sessionId)

  const describe: string = req.body.description

  const { _id, user_id, isActive, description, start, end, duration, progress } = Timer(
    describe,
    new ObjectId(userId?._id),
  )

  database.collection<ITimer>(EDB.collectionTimers).insertOne({
    user_id,
    isActive,
    description,
    start,
    end,
    duration,
    progress,
  })

  res.json({ id: _id, description })
})

export { routerTimers }
