import React from 'react'
import styles from './postheader.scss'
import { Break, KarmaCounter, MetaData } from '../../../shared'
import { Text } from '../../Text'

interface IPostHeader {
  karmaUps: number
  icon_img: string
  date: number
  author: string
  title: string
  link_flair_text: string
}

export function PostHeader({ karmaUps, icon_img, date, author, title, link_flair_text }: IPostHeader) {
  return (
    <div className={styles.header}>
      <KarmaCounter karmaUps={karmaUps} />

      <Break size={12} />

      <div>
        <Text As='h2' addClass={styles.title} size={14}>
          {title || 'Заголовок пропал'}
        </Text>
        <div className={styles.metaData}>
          <MetaData author={author} icon_img={icon_img} date={date} />
          <Break size={12} />
          <a className={styles.theme} href="#">
            <Text size={14}>
              {link_flair_text || 'No name'}
            </Text>
          </a>
        </div>
      </div>
    </div>
  )
}
