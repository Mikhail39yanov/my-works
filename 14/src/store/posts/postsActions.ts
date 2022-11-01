import axios from "axios"
import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import { IPostsData } from "../../hooks/usePostsData"
import { EActions, IRootState } from "../reducer"

export interface IMPostsRequestAction {
  type: typeof EActions.POSTS_REQUEST
}

export const postsRequest: ActionCreator<IMPostsRequestAction> = () => ({
  type: EActions.POSTS_REQUEST,
})

export interface IPostsRequestSuccessAction {
  type: typeof EActions.POSTS_REQUEST_SUCCESS
  nextAfter: string
  data: IPostsData[]
}

export const postsRequestSuccess: ActionCreator<IPostsRequestSuccessAction> = (after: string, posts: IPostsData[]) => ({
  type: EActions.POSTS_REQUEST_SUCCESS,
  nextAfter: after,
  data: posts,
})

export interface IPostsRequestErrorAction {
  type: typeof EActions.POSTS_REQUEST_ERROR
  error: string
}

export const postsRequestError: ActionCreator<IPostsRequestErrorAction> = (error: string) => ({
  type: EActions.POSTS_REQUEST_ERROR,
  error
})

export interface IPostsUpdateCounterAction {
  type: typeof EActions.POSTS_UPDATE_COUNTER
  counter: number
}

export const postsUpdateCounter: ActionCreator<IPostsUpdateCounterAction> = (counter: number) => ({
  type: EActions.POSTS_UPDATE_COUNTER,
  counter
})

export const postsRequestAsync = (): ThunkAction<void, IRootState, unknown, Action<string>> => (dispatch, getState) => {
  (async () => {
    dispatch(postsRequest())

    try {
      const { data: { data: { after, children } } } = await axios.get('https://oauth.reddit.com/best.json?sr_detail=true&limit=5', {
        headers: { Authorization: `bearer ${getState().token.token}` },
        params: {
          after: getState().posts.nextAfter
        }
      })

      if (after !== getState().posts.nextAfter) {
        dispatch(postsRequestSuccess(after, children))
      }

    } catch (error) {
      dispatch(postsRequestError(String(error)))
    }
  })()
}