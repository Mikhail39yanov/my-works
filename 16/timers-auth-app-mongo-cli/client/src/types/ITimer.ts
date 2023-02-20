export interface ITimer {
  id: string
  _id: string
  user_id: string
  isActive: boolean
  description: string
  start: number
  end: number
  duration: number
  progress: number
}
