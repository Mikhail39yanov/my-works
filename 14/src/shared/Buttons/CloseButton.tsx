import React from 'react'
import { IButton } from '../../utils/interface'
import { Icon } from '../Icon'
import { EColor, Text } from '../Text'

export function CloseButton(props: IButton) {
  const {
    className,
    text,
  } = props

  return (
    <button className={className}>
      <Icon size={16} mobileSize={14} />
      <Text size={14} mobileSize={12} color={EColor.grey66}>
        {text}
      </Text>
    </button>
  )
}
