import React from 'react'
import styles from './genericlist.scss'
import { EColor, Text, } from '../Text'
import { Break } from '../Break'

interface IItem {
  id: string
  text: string
  onClick?: (id: string) => void
  className?: string
  As?: 'a' | 'li' | 'button' | 'div'
  href?: string
  icon?: React.ReactNode
  colorText?: EColor
  divider?: React.ReactNode
}

interface IGenericListProps {
  list: IItem[]
  counter?: number
}

const noop = () => { }

export function GenericList({ list, counter }: IGenericListProps) {

  return (
    <>
      {
        list.map(({ As = 'div', text, onClick = noop, className, colorText = EColor.grey99, id, href, icon, divider = false }) => {

          return (
            <As
              key={id}
              onClick={() => onClick(id)}
              href={href}
            >
              <button className={className}>
                {icon}
                {counter && text === 'Комментарии'
                  ? <>
                    <Break size={4} />
                    <Text size={14} mobileSize={12} color={colorText} >
                      {counter}
                    </Text>
                  </>
                  : false}
                <Break size={8} />
                <Text size={14} mobileSize={12} color={colorText} >
                  {text}
                </Text>
              </button>

              {text !== 'Закрыть'
                ? divider
                : false}
            </As>
          )
        })
      }
    </ >
  )
}
