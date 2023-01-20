export interface ITimer {
  // [key: string]: string | number | boolean
  start: number
  end: number
  duration: number
  progress: number
  description: string
  is_active: boolean
  id: string
  user_id: string
}

export type TTimers = ITimer[]
