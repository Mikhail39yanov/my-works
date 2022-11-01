import { Reducer } from "react"
import { EActions } from "../reducer"
import { ISetTokenAction, ISetTokenErrorAction } from "./tokenActions"

export interface ITokenState {
  token: string
  error: Error
}

type ITokenActions = ISetTokenAction | ISetTokenErrorAction

export const tokenReducer: Reducer<ITokenState, ITokenActions> = (state, action) => {

  switch (action.type) {

    case EActions.SET_TOKEN:
      return {
        ...state,
        token: action.token
      }

    case EActions.SET_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}