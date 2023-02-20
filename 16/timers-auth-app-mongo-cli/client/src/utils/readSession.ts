import { readFile } from 'fs/promises'

export const readSession = async (sessionFileName: string) => {
  try {
    const sessionId = await readFile(sessionFileName, 'utf-8')

    return sessionId
  } catch (err) {
    if (sessionFileName) {
      return
    } else {
      console.error(err)
    }
  }
}
