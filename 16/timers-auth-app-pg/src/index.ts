import 'dotenv/config.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import { app, port } from './config/index.js'
import { IForm } from './types/IForm.js'
import { ICustomRequest } from './types/ICustomRequest.js'
import { routerTimers } from './routers/routerTimers.js'
import { routerSignup } from './routers/routerSignup.js'
import { routerLogin } from './routers/routerLogin.js'
import { routerLogout } from './routers/routerLogout.js'
import { auth } from './utils/auth.js'

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use('/signup', routerSignup)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/api/timers', routerTimers)

app.get('/', auth(), (req: ICustomRequest<IForm>, res) => {
  const authError = req.query.authError
  const createdUser = req.query.user

  res.render('index', {
    user: req.user,
    createdUser: createdUser === 'true' ? `${createdUser}` : createdUser,
    authError: authError === 'true' ? 'Wrong username or password' : authError,
  })
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
