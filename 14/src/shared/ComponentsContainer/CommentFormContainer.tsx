import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { getValueTextArea, preventDefault } from '../../utils/react'
import { useCommentForm } from '../../hooks'
import { pipe } from '../../utils/js'
import { CommentForm } from '../CommentForm'
import { updateCommentPost } from '../../store/actions'
import { IRootState } from '../../store/reducer'

export function CommentFormContainer() {
  // const store = useStore<IRootState>()
  // const value = store.getState().commentPost
  // или 
  const value = useSelector<IRootState, string>(state => state.commentPost)
  const dispatch = useDispatch()
  const onChangePostComment = (e: ChangeEvent<HTMLTextAreaElement>) => dispatch(updateCommentPost(e.currentTarget.value))
  const onSubmit = () => { preventDefault(() => { }) }

  return (
    <CommentForm
    // value={value}
    // onChangePostComment={onChangePostComment}
    // onSubmit={onSubmit}
    />
  )
}
