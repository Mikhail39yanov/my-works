import { Db } from 'mongodb'
import { EDB } from '../config/index.js'
import { IUser } from '../types/IUser.js'

export const findUserByUsername = async (db: Db, username: string) =>
  db.collection<IUser>(EDB.collectionUsers).findOne({ username })
