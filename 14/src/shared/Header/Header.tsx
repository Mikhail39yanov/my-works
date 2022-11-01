import React from 'react'
import styles from './header.scss'
import { SearchBlock, ThreadTitle, SortBlock } from '../../shared'

export function Header() {

  return (
    <header className={styles.header}>
      <SearchBlock />
      <ThreadTitle />
      <SortBlock />
    </header>
  )
}
