import React, { useContext } from 'react'
import styles from './searchblock.scss'
import { UserBlock } from '../../../shared'
import { useUserData } from '../../../hooks'

export function SearchBlock() {

  const { data, loading } = useUserData()

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={data.iconImg} username={data.name} loading={loading} />
    </div>
  )
}
