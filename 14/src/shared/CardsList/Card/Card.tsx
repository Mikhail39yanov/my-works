import React from 'react'
import styles from './card.scss'
import { TextContent, Menu, Actions, KarmaCounter } from '../../../shared'
import { EIcons, Icon, } from '../../Icon'
import { searchImgInString } from '../../../utils/js'

export interface ICard {
  id?: string
  title: string
  author: string
  thumbnail: string
  ups: number
  created: number
  icon_img: string
  post: ICard
  sr_detail?: any
}

export function Card({ title, author, thumbnail, ups, created, post, icon_img }: ICard) {

  return (
    <li className={styles.card}>
      <TextContent title={title} author={author} icon_img={icon_img} date={created} post={post} />

      <div className={styles.preview}>
        {searchImgInString(thumbnail)
          ? <img className={styles.previewImg} src={thumbnail} alt="preview" />
          : <img className={styles.previewImg} src="https://via.placeholder.com/320" alt="preview" />}
      </div>

      <div className={styles.menu}>
        <Menu />
      </div>

      <div className={styles.controls}>
        <KarmaCounter karmaUps={ups} />

        <button className={styles.commentsButton}>
          <Icon size={14} name={EIcons.CommentIcon} />
          <span className={styles.commentsNumber}>132</span>
        </button>

        <Actions />
      </div>
    </li >
  )
}