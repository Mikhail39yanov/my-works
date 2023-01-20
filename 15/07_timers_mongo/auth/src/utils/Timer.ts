import { ObjectId } from 'mongodb'
import { nanoid } from 'nanoid'

export function Timer(description = '', user_id: ObjectId) {
  return {
    _id: nanoid(),
    user_id,
    isActive: true,
    description,
    start: Date.now(),
    end: 0,
    duration: 0,
    progress: 0,
  }
}
