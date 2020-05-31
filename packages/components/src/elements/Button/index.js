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
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const theme = mergeWithComponentStyles('Button', style)
    const s = [theme.default]

    if (inline) {
      s[0].button.width = undefined
    }
    if (primary) {
      s.push(theme.primary)
    }
    if (secondary) {
      s.push(theme.secondary)
    }
    if (transparent) {
      s.push(theme.transparent)
    }
    if (disabled) {
      s.push(theme.disabled)
    }

    return mergeStyles(s)
  }, [style, inline, primary, secondary, transparent, disabled])

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
  title: PropTypes.string.isRequired,
}

export default Button
