import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

import { useTheme } from '../../theme'

const Button = ({
  inline,
  primary,
  secondary,
  transparent,
  disabled,
  style,
  onPress,
  title,
}) => {
  const { getStyles, createStyles, mergeStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const elementStyle = getStyles('Button')
    const s = createStyles(elementStyle.default)

    if (inline)
      s[0].button.width = undefined
    if (primary)
      s.push(elementStyle.primary)
    if (secondary)
      s.push(elementStyle.secondary)
    if (transparent)
      s.push(elementStyle.transparent)
    if (disabled)
      s.push(elementStyle.disabled)

    if (style)
      s.push(style)

    return mergeStyles(s)
  }, [getStyles, inline, primary, secondary, transparent, disabled, style])

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={finalStyle.button}
    >
      <Text style={finalStyle.text}>{title}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  inline: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.shape(),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Button
