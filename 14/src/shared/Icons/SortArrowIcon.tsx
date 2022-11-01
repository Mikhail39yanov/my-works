import React from 'react'
import { IIcon } from '../../utils/interface'

export function SortArrowIcon(props: IIcon) {
  const {
    className,
  } = props

  return (
    <svg className={className} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 7L5.57483e-07 0.623141L0.703795 -1.55181e-06L6.5 5.6864L12.2962 -5.38365e-07L13 0.623142L6.5 7Z" fill="#CC6633" />
    </svg>

  )
}
