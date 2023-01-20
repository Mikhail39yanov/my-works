import 'dotenv/config.js'
import express from 'express'
import nunjucks from 'nunjucks'
import { MongoClient } from 'mongodb'

export const port = process.env.PORT || 3000

export enum EDB {
  dbName = 'users',
  collectionUsers = 'users',
  collectionSessions = 'sessions',
  collectionTimers = 'timers',
}

export const app = express()

export const clientPromise = new MongoClient(String(process.env.DB_URI), {
  minPoolSize: 0,
  maxPoolSize: 3,
})

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
