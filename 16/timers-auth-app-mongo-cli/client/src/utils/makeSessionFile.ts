import { writeFile } from 'fs/promises'

export const makeSessionFile = async (sessionFileName: string, sessionId: string) => {
  try {
    await writeFile(sessionFileName, sessionId, 'utf-8')
  } catch (err) {
    console.error(err)
  }
}
