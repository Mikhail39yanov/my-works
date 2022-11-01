import React, { useEffect } from 'react'
import styles from './postcomments.scss'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { Comment } from '../..'
import { Break } from '../../Break'
import { EIcons, Icon } from '../../Icon'
import { EColor, Text } from '../../Text'

interface IPostComments {
  comments?: any
}

export function PostComments({ comments }: IPostComments) {

  // const rowHeights = (index: number) => {
  //   if (comments[index] === undefined) return 1
  //   return new Array(comments.length)
  //     .fill(true)
  //     .map(() => {
  //       if (comments[index].data.body.length >= 500) {
  //         return 60 + 100
  //       }
  //       return 60 + 60
  //     })
  // }

  // const getItemSize = (index: any) => {
  //   // @ts-ignore
  //   return rowHeights(index)[index]
  // }

  return (
    <div>
      <Text As='div' size={14} addClass={styles.sort} color={EColor.grey99}>
        Сортировать по:
        <Break size={8} />
        <button className={styles.buttonSort}>
          Лучшие
          <Break size={4} />
          <Icon size={14} name={EIcons.SortArrowIcon} />
        </button>
      </Text>

      <Break size={16} top />

      <div className={styles.divider}></div>

      <Break size={20} top />

      <ul className={styles.commentsContent}>
        {/* <List
          // className={styles.List}
          height={500}
          itemCount={comments.length}
          itemSize={getItemSize}
          width={'100%'}
        >
          {
            ({ index, style, }: { index: number, style: {} }) => {
              const comment = comments[index]

              return (
                <div className={index % 2 ? styles.ListItemOdd : styles.ListItemEven} style={style}>
                  <Comment comment={comment} key={comment.data.id} />
                </div>
              )
            }
          }
        </List> */}
        {comments.map((comment: any) => {
          return (
            <Comment comment={comment} key={comment.data.id} />
          )
        })}
      </ul>

      <Break size={20} top />

      <Text As='div' size={14} addClass={styles.sort} color={EColor.grey99}>
        <button>
          <Icon size={18} name={EIcons.AddCommentIcon} />
        </button>
        <Break size={8} />
        Комментарий был скрыт модератором 4 часа назад
      </Text>
    </div>
  )
}