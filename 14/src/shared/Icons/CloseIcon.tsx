import React from 'react'
import { IIcon } from '../../utils/interface'

export function CloseIcon(props: IIcon) {
  const {
    className,
  } = props

  return (
    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path className={className} d="M1 1l15.915 15.915M16.915 1L1 16.915" stroke="#000" fill="none" ></path>
    </svg>
  )
}
