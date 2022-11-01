//! 6.5 Вспомогательные компоненты
import React from 'react'
import styles from './text.scss'
import classNames from 'classnames'

// font-size styles
type TSizes = 28 | 20 | 16 | 14 | 12 | 10

// color styles
// enum глобальная вещь
export enum EColor {
  black = 'black',
  orange = 'orange',
  green = 'green',
  white = 'white',
  grayF4 = 'grayF4',
  greyF3 = 'greyF3',
  greyEC = 'greyEC',
  greyE5 = 'greyE5',
  greyD9 = 'greyD9',
  greyC4 = 'greyC4',
  greyAD = 'greyAD',
  grey99 = 'grey99',
  grey66 = 'grey66',
}

interface ITextProps {
  As?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children?: React.ReactNode
  size?: TSizes
  mobileSize?: TSizes
  tabletSize?: TSizes
  desktopSize?: TSizes
  color?: EColor
  bold?: boolean
  addClass?: string
}

export function Text(props: ITextProps) {
  const {
    As = 'span',
    children,
    color = EColor.black,
    bold = false,
    size,
    mobileSize,
    tabletSize,
    desktopSize,
    addClass,
  } = props

  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    addClass,
    { [styles.bold]: bold },
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
  )

  return (
    <As className={classes} >
      {children}
    </As>
  )
}
