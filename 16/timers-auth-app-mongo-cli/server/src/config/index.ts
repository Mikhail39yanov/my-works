import 'dotenv/config.js'
import express from 'express'
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
