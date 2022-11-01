import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './dropdown.scss'
import { useDropdown } from '../../hooks'

interface IDropdownProps {
  button: React.ReactNode
  children: React.ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const NOOP = () => { }

export function Dropdown({ button, children, isOpen = false, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen)
  const { refDrop, refCur, handleOpen, isDropdownOpen } = useDropdown(isOpen)

  // useEffect(() => setIsDropdownOpen(isOpen), [isOpen])
  // useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen])

  const dropdownRoot = document.getElementById('dropdown-root')
  if (!dropdownRoot) return null

  return (
    <div className={styles.container} >
      <div onClick={handleOpen} ref={refCur}>
        {button}
      </div>
      {isDropdownOpen && ReactDOM.createPortal(
        <div className={styles.listContainer} ref={refDrop}>
          <div className={styles.list} onClick={handleOpen}>
            {children}
          </div>
        </div>
        , dropdownRoot
      )}
    </div >
  )
}
