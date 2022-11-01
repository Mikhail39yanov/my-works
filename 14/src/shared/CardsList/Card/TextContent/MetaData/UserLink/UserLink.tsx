import React from 'react'
import styles from './userlink.scss'
import { Break } from '../../../../../Break'
import { searchImgInString } from '../../../../../../utils/js'

interface IUserLinkProps {
  author: string
  icon_img: string
}

export function UserLink({ author, icon_img }: IUserLinkProps) {
  return (
    <div className={styles.userLink}>
      {searchImgInString(icon_img)
        ? <img className={styles.avatar} src={icon_img} alt="avatar" />
        : <img className={styles.previewImg} src="https://via.placeholder.com/20" alt="avatar" />}
      <Break size={8} />
      <a className={styles.username} href="#user-url">
        {author}
      </a>
    </div>
  )
}
