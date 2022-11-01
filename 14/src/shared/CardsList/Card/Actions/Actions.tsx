import React from 'react'
import styles from './actions.scss'
import { EIcons, Icon } from '../../../Icon'

export function Actions() {
  return (
    <div className={styles.actions}>
      <button className={styles.shareButton}>
        <Icon size={14} name={EIcons.ShareIconDark} />
      </button>
      <button className={styles.saveButton}>
        <Icon size={14} name={EIcons.SaveIconDark} />
      </button>
    </div>
  )
}
