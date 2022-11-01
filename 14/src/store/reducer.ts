import { Reducer } from "redux"
import { IUpdateCommentPostAction } from "./actions"
import { IMeRequestAction, IMeRequestErrorAction, IMeRequestSuccessAction } from "./me/meActions"
import { IMeState, meReducer } from "./me/meReducer"
import { IMPostsRequestAction, IPostsRequestErrorAction, IPostsRequestSuccessAction, IPostsUpdateCounterAction } from "./posts/postsActions"
import { IPostsState, postsReducer } from "./posts/postsReducer"
import { ISetTokenAction, ISetTokenErrorAction } from "./token/tokenActions"
import { ITokenState, tokenReducer } from "./token/tokenReducer"

export interface IRootState {
  token: ITokenState
  commentPost: string
  me: IMeState
  posts: IPostsState
  counter: number
}

const initialState: IRootState = {
  token: {
    token: '',
    error: new Error('')
  },
  commentPost: 'Hello, world!',
  me: {
    loading: false,
    error: new Error(''),
    data: {}
  },
  posts: {
    loading: false,
    error: '',
    data: [],
    nextAfter: '',
    prevAfter: 'a'
  },
  counter: 0
}

export enum EActions {
  UPDATE_COMMENT_POST = 'UPDATE_COMMENT_POST',
  SET_TOKEN = 'SET_TOKEN',
  SET_TOKEN_ERROR = 'SET_TOKEN_ERROR',
  ME_REQUEST = 'ME_REQUEST',
  MY_REQUEST_SUCCESS = 'MY_REQUEST_SUCCESS',
  MY_REQUEST_ERROR = 'MY_REQUEST_ERROR',
  POSTS_REQUEST = 'POSTS_REQUEST',
  POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS',
  POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR',
  POSTS_UPDATE_COUNTER = 'POSTS_UPDATE_COUNTER',
}

export type IActions = IUpdateCommentPostAction
  | ISetTokenAction
  | ISetTokenErrorAction
  | IMeRequestAction
  | IMeRequestSuccessAction
  | IMeRequestErrorAction
  | IMPostsRequestAction
  | IPostsRequestSuccessAction
  | IPostsRequestErrorAction
  | IPostsUpdateCounterAction

export const rootReduce: Reducer<IRootState, IActions> = (state = initialState, action) => {

  switch (action.type) {

    case EActions.UPDATE_COMMENT_POST:
      return {
        ...state,
        commentPost: action.text
      }

    case EActions.SET_TOKEN:
    case EActions.SET_TOKEN_ERROR:
      return {
        ...state,
        token: tokenReducer(state.token, action)
      }

    case EActions.ME_REQUEST:
    case EActions.MY_REQUEST_SUCCESS:
    case EActions.MY_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action)
      }

    case EActions.POSTS_REQUEST:
    case EActions.POSTS_REQUEST_SUCCESS:
    case EActions.POSTS_REQUEST_ERROR:
      return {
        ...state,
        posts: postsReducer(state.posts, action)
      }

    case EActions.POSTS_UPDATE_COUNTER:
      return {
        ...state,
        counter: action.counter
      }

    default:
      return state
  }
}