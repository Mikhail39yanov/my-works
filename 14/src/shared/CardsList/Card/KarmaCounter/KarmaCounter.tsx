import React from 'react'
import styles from './karmacounter.scss'
import { EIcons, Icon } from '../../../Icon'

export function KarmaCounter({ karmaUps }: { karmaUps: number }) {
  return (
    <div className={styles.karmaCounter}>
      <button className={styles.up}>
        <Icon size={14} name={EIcons.KarmaCountArrowIcon} />
      </button>
      <span className={styles.karmaValue}>
        {karmaUps}
      </span>
      <button className={styles.down}>
        <Icon size={14} name={EIcons.KarmaCountArrowIcon} className={styles.down} />
      </button>
    </div>
  )
}
