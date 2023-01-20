import 'dotenv/config.js'
import express from 'express'
import nunjucks from 'nunjucks'
import pkgKnex from 'knex'
// import knex from 'knex'
// import knexConfig from '../../knexfile.js'
// import { config } from '../../knexfile.js'
const { knex } = pkgKnex

export const port = process.env.PORT || 3000

export const app = express()

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
  // connection: () => ({
  //   host: process.env.DB_HOST,
  //   port: Number(process.env.DB_PORT) || 5432,
  //   database: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  // }),
  pool: {
    min: 0,
    max: 3,
  },
  // debug: true,
}

export const knexInstance = knex(config)

nunjucks.configure('./src/views', {
  autoescape: true,
  express: app,
  tags: {
    blockStart: '[%',
    blockEnd: '%]',
    variableStart: '[[',
    variableEnd: ']]',
    commentStart: '[#',
    commentEnd: '#]',
  },
})

app.set('view engine', 'njk')
