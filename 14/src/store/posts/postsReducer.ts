import { Reducer } from 'react'
import { IPostsData } from '../../hooks/usePostsData'
import { EActions } from '../reducer'
import { IMPostsRequestAction, IPostsRequestErrorAction, IPostsRequestSuccessAction } from './postsActions'

export interface IPostsState {
  loading: boolean
  error: string
  data: IPostsData[]
  nextAfter: string
  prevAfter: string
}

type TPostActions = IMPostsRequestAction | IPostsRequestSuccessAction | IPostsRequestErrorAction

export const postsReducer: Reducer<IPostsState, TPostActions> = (state, action) => {
  switch (action.type) {

    case EActions.POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case EActions.POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.data],
        nextAfter: action.nextAfter,
        prevAfter: state.nextAfter,
        loading: false,
      }

    case EActions.POSTS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    default:
      return state
  }
}