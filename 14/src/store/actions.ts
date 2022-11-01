import { ActionCreator } from "redux"
import { EActions } from "./reducer"

export interface IUpdateCommentPostAction {
  type: typeof EActions.UPDATE_COMMENT_POST
  text: string
}

export const updateCommentPost: ActionCreator<IUpdateCommentPostAction> = (text: string) => ({
  type: EActions.UPDATE_COMMENT_POST,
  text
})