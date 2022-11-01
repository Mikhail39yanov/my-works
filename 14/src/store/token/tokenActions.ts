import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import { EActions, IRootState } from "../reducer"
import axios from 'axios'

export interface ISetTokenAction {
  type: typeof EActions.SET_TOKEN
  token: string
}

export const setToken: ActionCreator<ISetTokenAction> = (token: string) => ({
  type: EActions.SET_TOKEN,
  token
})

export interface ISetTokenErrorAction {
  type: typeof EActions.SET_TOKEN_ERROR
  error: Error
}

export const setTokenError: ActionCreator<ISetTokenErrorAction> = (error: Error) => ({
  type: EActions.SET_TOKEN_ERROR,
  error
})

export const saveToken = (): ThunkAction<void, IRootState, unknown, Action<string>> => (dispatch, getState) => {
  const urlParams = new URLSearchParams(window.location.search)
  let keyCode = urlParams.get('code')
  let key: string = ''
  let token_cache: string = ''

  if (keyCode === null) {
    key = sessionStorage.key(sessionStorage.length - 1) || ''
    token_cache = sessionStorage.getItem(key) || ''
  }

  // console.log(token_cache)
  // console.log(key)
  // console.log(keyCode)

  if (token_cache) {
    dispatch(setToken(token_cache))
  } else {
    if (keyCode !== null) {
      axios.post(
        'https://www.reddit.com/api/v1/access_token',
        `grant_type=authorization_code&code=${keyCode}&redirect_uri=${process.env.URI}/auth`,
        {
          auth: { username: process.env.CLIENT_ID ?? '', password: process.env.SECRET ?? '' },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      )
        .then(({ data }) => {
          if (keyCode !== null) {
            sessionStorage.setItem(keyCode, data['access_token'])
            dispatch(setToken(data['access_token']))
          }
        })
        .catch((error) => {
          console.log(error)
          dispatch(setTokenError(error))
        })
    }
  }
}