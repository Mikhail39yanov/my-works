import React from 'react'
import styles from './title.scss'
import { disableScroll, enableScroll } from '../../../../../utils/js'
import { Link } from 'react-router-dom'

interface ITitle {
  title: string
  post: any
}

export function Title({ title, post }: ITitle) {

  return (
    <h2 className={styles.title} >
      <Link className={styles.postLink} to={`/posts/post_${post.id}/`} >
        {/* onClick={() => disableScroll()} */}
        {title}
      </Link>
    </h2 >
  )
}
