import React from 'react'
import styles from './textcontent.scss'
import { MetaData, Title } from '../../../../shared'

interface ITextContentProps {
  title: string
  author: string
  icon_img: string
  date: number
  post: any
}

export function TextContent({ title, author, icon_img, date, post }: ITextContentProps) {

  return (
    <div className={styles.textContent}>
      <MetaData author={author} icon_img={icon_img} date={date} />
      <Title title={title} post={post} />
    </div>
  )
}
