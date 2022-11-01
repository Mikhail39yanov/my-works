import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import reactDOM from 'react-dom/server'
import { App } from '../App'
import { indexTemplate } from './indexTemplate'
import compression from 'compression'
import helmet from 'helmet'

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const app = express()

if (IS_PROD) {
  app.use(compression())
  // app.use(helmet({
  //   contentSecurityPolicy: false,
  //   crossOriginResourcePolicy: false
  // }))
}

app.use('/static', express.static('./dist/client'))

// /
// /auth
// app.get(/(\/|\/auth)$/i, (request, response) => {
//   response.send(
//     indexTemplate(reactDOM.renderToString(App()))
//   )
// })

app.get('/auth', (request, response) => {
  response.send(
    indexTemplate(reactDOM.renderToString(App()))
  )
})

app.get('*', (request, response) => {
  response.send(
    indexTemplate(reactDOM.renderToString(App()))
  )
})

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`)
})