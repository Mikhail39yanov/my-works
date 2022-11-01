import React, { ChangeEvent } from 'react'
import styles from './commentform.scss'
import { useFormik } from 'formik'
import { getValueTextArea } from '../../utils/react'
import { EIcons, Icon } from '../Icon'
import { Break } from '../Break'
import { useCommentForm } from '../../hooks'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'
import { atom, useRecoilState } from 'recoil'

interface ICommentForm {
  onClose?: () => void
  onChangePostComment?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit?: () => void
  value?: string
  isActiveInputRef?: any
  authorComment?: string
}

interface IErrors {
  textArea: string
}
// =======================
// MobX
class Comment {
  value = 'Hello from MobX'

  constructor() {
    makeAutoObservable(this)
  }

  updateValue(newValue: string) {
    this.value = newValue
  }
}

// является store MobX
const myComment = new Comment()

// =======================
// Effector
const updateComment = createEvent<string>()

// является store Effector
const $comment = createStore('Hello from Effector')
  .on(updateComment, (_, newValue) => newValue)

// debugging
// $comment.watch((state) => {
//   console.log('state', state)
// })

// =======================
// Recoil
const textComment = atom({
  key: 'textState',
  default: 'Hello from Recoil',
})

// export function CommentForm({ isActiveInputRef, authorComment, value, onSubmit, onChangePostComment }: ICommentForm) {
export const CommentForm = observer(({ isActiveInputRef, authorComment }: ICommentForm) => {
  const { name, onChangeAuthorComment } = useCommentForm(authorComment)
  // const value = useStore($comment)
  const [text, setText] = useRecoilState(textComment)

  const formik = useFormik({
    initialValues: {
      // textArea: myComment.value
      textArea: text
    },
    validate: (values) => {
      const errors = {} as IErrors
      if (!values.textArea) {
        errors.textArea = 'Необходимо заполнить'
      } else if (values.textArea.length <= 3) {
        errors.textArea = 'Введите больше 3-x символов'
      }

      return errors
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify({ status: 'Форма отправлена', ...values, }, null, 2))
        setSubmitting(false)
      }, 500)
    },
  })

  function onHandleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    formik.handleChange(event)
    // myComment.updateValue(event.target.value)
    // updateComment(event.target.value)
    setText(event.target.value)
  }

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      {isActiveInputRef
        ? <textarea className={styles.input} value={name} onChange={getValueTextArea(onChangeAuthorComment)} ref={isActiveInputRef} />
        : <textarea className={styles.input} name='textArea' value={formik.values.textArea} onChange={onHandleChange} aria-invalid={formik.errors.textArea ? 'true' : undefined} />
      }

      {formik.errors.textArea && formik.touched.textArea && (<div style={{ color: 'red' }}>{formik.errors.textArea}</div>)}

      <div className={styles.formController}>
        <div className={styles.formButtonWrapper}>
          <Break size={20} />

          <div className={styles.formButtonGroup}>
            <button>
              <Icon size={14} name={EIcons.PasteTagIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteImgIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteFailIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteDownloadIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PastePhotoIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteSyncingIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteCopyLinkIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteAudioRecordingIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteCommentIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteBackgroundIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PasteSizeIcon} />
            </button>

            <button>
              <Icon size={14} name={EIcons.PastePdfIcon} />
            </button>
          </div>
        </div>

        <button className={styles.button} type="submit" disabled={formik.isSubmitting}>Комментировать</button>
      </div>
    </form>
  )
})
