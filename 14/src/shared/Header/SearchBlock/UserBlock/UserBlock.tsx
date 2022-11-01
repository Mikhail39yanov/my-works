import React from 'react'
import styles from './userblock.scss'
import { IconAnon } from '../../../../shared'
import { Break } from '../../../Break'
import { EColor, Text, } from '../../../Text'

interface IUserBlockProps {
  avatarSrc?: string
  username?: string
  loading?: boolean
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {

  return (
    <a
      href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.URI}/auth&duration=permanent&scope=read submit identity`}
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt='аватарка' className={styles.avatarImage} />
          : <IconAnon />
        }
      </div>

      <div className={styles.username}>
        <Break size={12} />
        {loading
          ? (
            <Text size={20} color={EColor.grey99} >loading...</Text>
          ) : (
            <Text size={20} color={username ? EColor.black : EColor.grey99} > {username || 'Аноним'} </Text>
          )}

      </div>
    </a>
  )
}
