import { api } from '../config/index.js'

export const consoleAxiosError = (error: unknown) => {
  if (api.isAxiosError(error)) {
    console.error(error)
  } else {
    console.error('Unexpected error', error)
  }
}
