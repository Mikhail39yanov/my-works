import { assoc } from './assoc'

// или использовать библиотеку nanoid
export const generateRandomString = () => Math.random().toString(36).substring(2, 15)

export const assignId = assoc('id', generateRandomString())

export const generateId = <O extends object>(obj: O) =>
  // assignId(obj)
  assoc('id', generateRandomString())(obj)