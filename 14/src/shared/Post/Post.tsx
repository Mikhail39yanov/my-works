import React from 'react'
import ReactDOM from 'react-dom'
import styles from './post.scss'
import { PostHeader, PostComments, CommentFormContainer } from '../../shared'
import { usePostModal, useComments, IPostsData } from '../../hooks'
import { GenericList } from '../GenericList'
import { Break } from '../Break'
import { EIcons, Icon } from '../Icon'
import { EColor, Text } from '../Text'
import { enableScroll, generateId, searchImgInString } from '../../utils/js'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/reducer'

const LIST = [
  { As: 'li' as const, text: 'Комментарии', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.CommentIcon} /> },
  { As: 'li' as const, text: 'Поделиться', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.ShareIcon} /> },
  { As: 'li' as const, text: 'Скрыть', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.HideIcon} /> },
  { As: 'li' as const, text: 'Сохранить', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.SaveIcon} /> },
  { As: 'li' as const, text: 'Пожаловаться', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.WarningIcon} /> },
].map(generateId)

interface IPost {
  post: any
  id: string
  title: string
  author: string
  thumbnail: string
  ups: number
  created: number
  icon_img: string
  sr_detail?: any
  upvote_ratio: number
  subreddit: string
  num_comments: number
  link_flair_text: string
  public_description: string
  submit_link_label: string
}

export function Post() {
  const history = useHistory()
  let { id } = useParams<{ id: string }>()
  const posts = useSelector<IRootState, IPostsData[]>(state => state.posts.data)
  const activePost = posts.find(post => post.data.id === id)
  const {
    subreddit,
    author,
    title,
    thumbnail,
    created,
    ups,
    num_comments,
    link_flair_text,
    upvote_ratio,
    icon_img,
    public_description,
    submit_link_label,
  } = activePost?.data as IPost

  const [ref, refOverlay] = usePostModal()
  const [comments] = useComments({ subreddit, id })

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={refOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContent} ref={ref} >

          <button className={styles.closeButton} onClick={() => {
            // history.push('/')
            history.goBack()
            enableScroll()
          }} >
            <Icon className={styles.closeIcon} size={16} name={EIcons.CloseIcon} />
          </button>

          <PostHeader
            karmaUps={ups}
            icon_img={icon_img}
            date={created}
            author={author}
            title={title}
            link_flair_text={link_flair_text}
          />

          <div className={styles.content}>
            <div className={styles.contentDescriptions}>
              <Text As='p' size={16}  >
                {public_description || 'lorem'}
              </Text>
              <Break size={12} top />
              <figure className={styles.imgFigure}>
                {searchImgInString(thumbnail)
                  ? <img className={styles.previewImg} src={thumbnail} alt="preview" />
                  : <img className={styles.previewImg} src="https://via.placeholder.com/300" alt="preview" />}
                <figcaption className={styles.imgFigcaption}>
                  {submit_link_label || 'lorem'}
                </figcaption>
              </figure>
              <Break size={12} top />
              <Text As='p' size={16} >
                {'lorem'}
              </Text>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.postController}>
              <ul className={styles.modalDropdown}>
                <GenericList list={LIST} counter={num_comments} />
              </ul>

              <div className={styles.voted}>
                <Text size={14} color={EColor.grey99}>
                  {`${upvote_ratio * 100}%` || '54%'}
                </Text>
                <Break size={4} />
                <Text size={14} color={EColor.grey99}>
                  Проголосовали
                </Text>
              </div>
            </div>

            <Break size={20} top />

            <CommentFormContainer />

            <Break size={20} top />
            <PostComments comments={comments} />
          </div>
        </div>
      </div>
    </div >
  ), modalRoot)
}