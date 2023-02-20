/* eslint-disable @typescript-eslint/no-extra-semi */
import 'dotenv/config.js'
import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import { app, clientPromise, clients, EDB, port, server, wss } from './config/index.js'
import { ICustomRequest } from './types/ICustomRequest.js'
import { routerLogin, routerLogout, routerSignup, routerTimers } from './routers/index.js'
import { auth } from './utils/auth.js'
import { HttpException } from './utils/HttpException.js'
import cookie from 'cookie'
import { findUserBySessionId } from './utils/findUserBySessionId.js'
import { getActiveTimers } from './utils/getActiveTimers.js'
import { getOldTimers } from './utils/getOldTimers.js'

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const client = await clientPromise

    const database = client.db(EDB.dbName)

    req.db = database

    next()
  } catch (error) {
    next(error)
  }
})
app.use('/signup', routerSignup)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/api/timers', routerTimers)
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message)
})

app.get('/', auth(), (req: ICustomRequest, res) => {
  const authError = req.query.authError
  const createdUser = req.query.user
  const authErrorUser = req.query.authErrorUser

  res.render('index', {
    user: req.user,
    createdUser: createdUser === 'true' ? `${createdUser}` : createdUser,
    authError: authError === 'true' ? 'Wrong username or password' : authError,
    authErrorUser: authErrorUser === 'true' ? 'The user is already in the database' : authErrorUser,
  })
})

server.on('upgrade', async (req: ICustomRequest, socket, head) => {
  const client = await clientPromise

  const database = client.db(EDB.dbName)

  const cookies = req.headers['cookie']

  if (!cookies) return

  const { sessionId } = cookie.parse(cookies)

  const user = await findUserBySessionId(database, sessionId)
  if (!user) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
    socket.destroy()
    return
  }
  req.userId = user._id.toString()
  req.db = database
  req.sessionId = sessionId

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req)
  })
})

wss.on('connection', async (ws, req: ICustomRequest) => {
  const { userId, sessionId } = req
  const database = req.db

  if (!database) return
  if (!sessionId) return

  clients.set(userId, ws)

  ws.send(
    JSON.stringify({
      type: 'all_timers',
      activeTimers: await getActiveTimers(database, sessionId),
      oldTimers: await getOldTimers(database, sessionId),
    }),
  )

  setInterval(async () => {
    ws.send(
      JSON.stringify({
        type: 'active_timers',
        activeTimers: await getActiveTimers(database, sessionId),
      }),
    )
  }, 1000)

  ws.on('message', (message) => {
    let data
    try {
      data = JSON.parse(message.toString())
    } catch (err) {
      return
    }

    if (data.type === 'all_timers') {
      ;(async () => {
        ws.send(
          JSON.stringify({
            type: 'all_timers',
            activeTimers: await getActiveTimers(database, sessionId),
            oldTimers: await getOldTimers(database, sessionId),
          }),
        )
      })()
    }
  })

  ws.on('close', () => {
    clients.delete(userId)
  })
})

server.listen(port, () => console.log(`Listening on http://localhost:${port}`))
