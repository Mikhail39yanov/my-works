import React from 'react'
import { CommentIcon } from '../../../Icons'
import styles from './commentsbutton.scss'

export function CommentsButton() {
  return (
    <button className={styles.commentsButton}>
      <CommentIcon />
      <span className={styles.commentsNumber}>132</span>
    </button>
  )
}
