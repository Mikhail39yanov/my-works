import React from 'react'
import { IButton } from '../../utils/interface'
import { Break } from '../Break'
import { EIcons, Icon } from '../Icon'
import { EColor, Text } from '../Text'

export function SaveButton(props: IButton) {
  const {
    className,
    text,
  } = props

  return (
    <button className={className}>
      <Icon size={16} mobileSize={14} name={EIcons.SaveIcon} />
      <Break size={8} />
      <Text size={14} mobileSize={12} color={EColor.grey99}>
        {text}
      </Text>
    </button>
  )
}
