import React from 'react'
import styles from './content.scss'
import { IChildren } from '../../utils/interface'

export function Content({ children }: IChildren) {

  return (
    <main className={styles.content}>
      {children}
    </main>
  )
}
