import express from 'express'
import { ICustomRequest } from '../types/ICustomRequest.js'
import { findUserBySessionId } from '../utils/findUserBySessionId.js'
import { IForm } from '../types/IForm.js'
import { Timer } from '../utils/Timer.js'
import { auth } from '../utils/auth.js'
import { knexInstance } from '../config/index.js'
import { ITimer } from '../types/ITimer.js'

const routerTimers = express.Router()

routerTimers.get('/', auth(), async (req: ICustomRequest<IForm>, res) => {
  const isActive = req.query.isActive
  const sessionId = req.sessionId

  if (sessionId === undefined) return

  if (!req.user) {
    return res.sendStatus(401)
  }

  const userId = await findUserBySessionId(sessionId)

  if (isActive === 'true') {
    await knexInstance<ITimer>('timers').then((timers) => {
      if (timers.length === 0) {
        return null
      }

      timers.forEach(async (timer) => {
        if (timer.is_active && timer.user_id === userId?.id) {
          await knexInstance<ITimer>('timers')
            .where({ id: timer.id, user_id: userId?.id, is_active: true })
            .update({ progress: Date.now() - Number(timer.start) })
        }
      })
    })

    const activeTimers = await knexInstance<ITimer>('timers').then((timers) => {
      if (timers.length === 0) {
        return null
      }

      return timers
        .filter((timer) => timer.is_active && timer.user_id === userId?.id)
        .map((t) => ({
          ...t,
          start: Number(t.start),
          end: Number(t.end),
          duration: Number(t.duration),
          progress: Number(t.progress),
        }))
        .sort((a, b) => {
          if (a.start > b.start) {
            return -1
          }
          return 0
        })
    })

    res.json(activeTimers)
  }

  if (isActive === 'false') {
    const oldTimers = await knexInstance<ITimer>('timers').then((timers) => {
      if (timers.length === 0) {
        return null
      }

      return timers
        .filter((timer) => !timer.is_active && timer.user_id === userId?.id)
        .map((t) => ({
          ...t,
          start: Number(t.start),
          end: Number(t.end),
          duration: Number(t.duration),
          progress: Number(t.progress),
        }))
        .sort((a, b) => {
          if (a.end > b.end) {
            return -1
          }
          return 0
        })
    })

    res.json(oldTimers)
  }
})

routerTimers.post('/:id/stop', auth(), async (req: ICustomRequest<IForm>, res) => {
  if (!req.user) {
    return res.sendStatus(401)
  }

  const id = req.params.id

  await knexInstance<ITimer>('timers')
    .select()
    .where({ id: id })
    .then((timers) => {
      timers.forEach(async (timer) => {
        if (timer.id === id) {
          await knexInstance<ITimer>('timers').where({ id: timer.id }).update({
            is_active: false,
            end: Date.now(),
            duration: timer.progress,
          })
        }
      })
    })

  res.json([])
})

routerTimers.post('/', auth(), async (req: ICustomRequest<IForm>, res) => {
  const sessionId = req.sessionId

  if (sessionId === undefined) return

  if (!req.user) {
    return res.sendStatus(401)
  }

  const userId = await findUserBySessionId(sessionId)

  const description: string = req.body.description
  const newTimer = Timer(description, userId?.id)
  await knexInstance<ITimer>('timers').insert(newTimer)

  res.json(newTimer)
})

export { routerTimers }
