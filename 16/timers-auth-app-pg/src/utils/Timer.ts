import { nanoid } from 'nanoid'

export function Timer(description = '', user_id = '') {
  return {
    id: nanoid(),
    user_id,
    is_active: true,
    description,
    start: Date.now(),
    end: 0,
    duration: 0,
    progress: 0,
  }
}
