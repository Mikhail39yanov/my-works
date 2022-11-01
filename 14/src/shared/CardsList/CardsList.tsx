import React from 'react'
import styles from './cardslist.scss'
import { Card } from '../../shared'
import { usePostsData } from '../../hooks/usePostsData'

export function CardsList() {
  const [posts, loading, errorLoading, bottomOffListRef, counter, handleLoadMore] = usePostsData()

  return (
    <ul className={styles.cardsList}>
      {posts.length === 0 && !loading && !errorLoading && (
        <h3 style={{ textAlign: 'center' }}>Список постов пустой</h3>
      )}

      {posts.map(post => (
        <Card
          key={post.data.id}
          title={post.data.title}
          author={post.data.author}
          thumbnail={post.data.thumbnail}
          ups={post.data.ups}
          created={post.data.created}
          post={post.data}
          icon_img={post.data.sr_detail.icon_img}
        />
      ))}

      <div ref={bottomOffListRef} />

      {loading && (
        <div style={{ textAlign: 'center' }}>
          <div className={styles.ldsDualRing}></div>
        </div>
      )}

      {counter === 3 && !loading && (<button className={styles.buttonLoadMore} onClick={handleLoadMore}>
        Загрузить ещё
      </button>)}

      {errorLoading && (
        <div style={{ textAlign: 'center' }} role='alert'>{errorLoading}</div>
      )}

    </ul>
  )
}