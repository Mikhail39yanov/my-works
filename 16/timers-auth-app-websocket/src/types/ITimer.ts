import { ObjectId } from 'mongodb'

export interface ITimer {
  // [key: string]: string | number | boolean
  start: number
  end: number
  duration: number
  progress: number
  description: string
  isActive: boolean
  _id?: string | ObjectId
  user_id: string | ObjectId
}

export type TTimers = ITimer[]
