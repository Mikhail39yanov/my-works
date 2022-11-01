import React from 'react'
import styles from './metadata.scss'
import { UserLink } from '../../../../../shared'
import { Break } from '../../../../Break'
import { showDateFullMoment } from '../../../../../utils/js'

interface IMetaDataProps {
  author: string
  icon_img: string
  date: number
}

export function MetaData({ author, icon_img, date }: IMetaDataProps) {
  return (
    <div className={styles.metaData}>
      <UserLink author={author} icon_img={icon_img} />
      <Break size={4} />

      <span className={styles.createdAt}>
        <span className={styles.publishedLabel}>опубликовано </span>
        {showDateFullMoment(date)}
      </span>
    </div>
  )
}
