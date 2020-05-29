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
  skipThemeParsing,
}) => {
  const { getStyles, mergeStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const parsedTheme = mergeStyles([getStyles('Button'), style || {}], true)
    const s = [parsedTheme.default]

    if (inline)
      s[0].button.width = undefined
    if (primary)
      s.push(parsedTheme.primary)
    if (secondary)
      s.push(parsedTheme.secondary)
    if (transparent)
      s.push(parsedTheme.transparent)
    if (disabled)
      s.push(parsedTheme.disabled)

    return mergeStyles(s, skipThemeParsing)
  }, [getStyles, style, inline, primary, secondary, transparent, disabled, skipThemeParsing])

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
  skipThemeParsing: PropTypes.bool,
}

export default Button
