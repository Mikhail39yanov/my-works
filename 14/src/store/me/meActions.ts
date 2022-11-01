import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import { EActions, IRootState } from "../reducer"
import axios from 'axios'
import { cutMyStrMin } from "../../utils/js"
import { IUserData } from "../../hooks/useUserData"

export interface IMeRequestAction {
  type: typeof EActions.ME_REQUEST
}

export const meRequest: ActionCreator<IMeRequestAction> = () => ({
  type: EActions.ME_REQUEST,
})

export interface IMeRequestSuccessAction {
  type: typeof EActions.MY_REQUEST_SUCCESS
  data: IUserData
}

export const meRequestSuccess: ActionCreator<IMeRequestSuccessAction> = (data: IUserData) => ({
  type: EActions.MY_REQUEST_SUCCESS,
  data
})

export interface IMeRequestErrorAction {
  type: typeof EActions.MY_REQUEST_ERROR
  error: Error
}

export const meRequestError: ActionCreator<IMeRequestErrorAction> = (error: Error) => ({
  type: EActions.MY_REQUEST_ERROR,
  error
})

export const meRequestAsync = (): ThunkAction<void, IRootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(meRequest())
  axios.get('https://oauth.reddit.com/api/v1/me.json', {
    headers: { Authorization: `bearer ${getState().token.token}` },
  })
    .then((resp) => {
      const userData = resp.data
      dispatch(meRequestSuccess({ name: userData.name, iconImg: cutMyStrMin(userData.icon_img, 'png') }))
    })
    .catch((error) => {
      console.log(error)
      dispatch(meRequestError(error))
    })
}