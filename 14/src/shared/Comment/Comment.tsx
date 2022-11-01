import React, { useEffect, useRef, useState } from 'react'
import styles from './comment.scss'
import { CommentForm, UserLink } from '..'
import { EColor, Text } from '../Text'
import { Break } from '../Break'
import { EIcons, Icon } from '../Icon'
import { showDateHoursMoment } from '../../utils/js'

export function Comment({ comment }: any) {
  const [isCommentFormOpened, setIsCommentFormOpened] = useState(false)
  const isActiveInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onClickFocus = () => isActiveInputRef.current?.focus()
    onClickFocus()
  }, [isCommentFormOpened])

  return (
    <li className={styles.commentWrapper} >
      <div className={styles.commentNavigation}>
        <div className={styles.karmaCounter}>
          <button className={styles.up}>
            <Icon size={14} name={EIcons.KarmaCountArrowIcon} />
          </button>
          <button className={styles.down}>
            <Icon size={14} name={EIcons.KarmaCountArrowIcon} className={styles.down} />
          </button>
        </div>
        <Break size={12} top />
        <div className={styles.dividerHorizontal}></div>
      </div>

      <Break size={12} />

      <div className={styles.comment} >
        <div className={styles.commentHeader}>
          <UserLink author={comment.data.author} icon_img={'authorImg'} />
          <Break size={4} />
          <Text size={14} color={EColor.grey99}>
            {showDateHoursMoment(comment.data.created)}
          </Text>
          <Break size={12} />
          <a className={styles.theme} href="#">
            <Text size={14}>
              {'No name'}
            </Text>
          </a>
        </div>

        <div className={styles.commentBody}>
          <Text size={14} >
            {comment.data.body}
          </Text>
        </div>

        <div className={styles.commentFooter}>
          <ul className={styles.modalDropdown}>
            <li>
              <button className={styles.menuItem} onClick={() => {
                setIsCommentFormOpened(!isCommentFormOpened)
              }}>
                <Icon size={16} mobileSize={14} name={EIcons.CommentIcon} />
                Ответить
              </button>
            </li>
            <li>
              <button className={styles.menuItem}>
                <Icon size={16} mobileSize={14} name={EIcons.ShareIcon} />
                Поделиться
              </button>
            </li>
            <li>
              <button className={styles.menuItem}>
                <Icon size={16} mobileSize={14} name={EIcons.WarningIcon} />
                Пожаловаться
              </button>
            </li>
          </ul>

          <div className={styles.commentResponseFormWrapper}>
            {isCommentFormOpened && (
              <CommentForm onClose={() => {
                setIsCommentFormOpened(false)
              }}
                isActiveInputRef={isActiveInputRef}
                authorComment={comment.data.author}
              />
            )}

          </div>
        </div>

        <ul className={styles.commentResponse}>
          {comment.data.replies
            ? comment.data.replies.data.children.map((comment: any) => {
              return (
                <Comment comment={comment} key={comment.data.id} />
              )
            })
            : false
          }
        </ul>
      </div>

    </li>
  )
}
