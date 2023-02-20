import 'dotenv/config.js'
import express, { NextFunction, Request, Response } from 'express'
import { app, clientPromise, EDB, port } from './config/index.js'
import { ICustomRequest } from './types/ICustomRequest.js'
import { routerLogin, routerLogout, routerSignup, routerTimers } from './routers/index.js'
import { HttpException } from './utils/HttpException.js'

app.use(express.json())
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

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
