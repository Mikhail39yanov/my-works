import React from 'react'
import styles from './layout.scss'
import { IChildren } from '../../utils/interface'

export function Layout({ children }: IChildren) {

  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}
