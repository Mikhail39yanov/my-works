import 'dotenv/config.js'
import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import { app, clientPromise, EDB, port } from './config/index.js'
import { IForm } from './types/IForm.js'
import { ICustomRequest } from './types/ICustomRequest.js'
import { routerLogin, routerLogout, routerSignup, routerTimers } from './routers/index.js'
import { auth } from './utils/auth.js'
import { HttpException } from './utils/HttpException.js'

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(async (req: ICustomRequest<IForm>, res: Response, next: NextFunction) => {
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

app.get('/', auth(), (req: ICustomRequest<IForm>, res) => {
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

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
