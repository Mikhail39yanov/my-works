import { Reducer } from "react"
import { IUserData } from "../../hooks/useUserData"
import { EActions } from "../reducer"
import { IMeRequestAction, IMeRequestErrorAction, IMeRequestSuccessAction } from "./meActions"

export interface IMeState {
  loading: boolean
  error: Error
  data: IUserData
}

type IMeActions = IMeRequestAction | IMeRequestSuccessAction | IMeRequestErrorAction

export const meReducer: Reducer<IMeState, IMeActions> = (state, action) => {

  switch (action.type) {

    case EActions.ME_REQUEST:
      return {
        ...state,
        loading: true
      }

    case EActions.MY_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      }

    case EActions.MY_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }

    default:
      return state
  }
}