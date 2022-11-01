import React from 'react'
import styles from './menu.scss'
import { Dropdown } from '../../../../shared'
import { EIcons, Icon } from '../../../Icon'
import { GenericList } from '../../../GenericList'
import { EColor } from '../../../Text'
import { generateId } from '../../../../utils/js'

const LIST = [
  { As: 'li' as const, text: 'Комментарии', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.CommentIcon} />, divider: <div className={styles.divider}></div> },
  { As: 'li' as const, text: 'Поделиться', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.ShareIcon} />, divider: <div className={styles.divider}></div> },
  { As: 'li' as const, text: 'Скрыть', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.HideIcon} />, divider: <div className={styles.divider}></div> },
  { As: 'li' as const, text: 'Сохранить', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.SaveIcon} />, divider: <div className={styles.divider}></div> },
  { As: 'li' as const, text: 'Пожаловаться', className: styles.menuItem, icon: <Icon size={16} mobileSize={14} name={EIcons.WarningIcon} /> },
  { As: 'li' as const, text: 'Закрыть', className: styles.closeButton, colorText: EColor.grey66 },
].map(generateId)

export function Menu() {
  return (
    <Dropdown
      // onClose={() => console.log('closed')}
      // onOpen={() => console.log('opened')}
      button={
        <button className={styles.menuButton} >
          <Icon size={18} name={EIcons.MenuIcon} />
        </button>
      }
    >
      <ul className={styles.dropdown}>
        <GenericList list={LIST} />
      </ul>
    </Dropdown>
  )
}
