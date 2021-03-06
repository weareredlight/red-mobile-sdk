import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../theme'

const Button = ({
  inline,
  success,
  error,
  warning,
  info,
  transparent,
  disabled,
  style,
  onPress,
  title,
  ...rest
}) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Button', style)
    const s = [compTheme.default]

    if (inline) {
      s[0].wrapper.width = undefined
    }
    if (success) {
      s.push(compTheme.success)
    }
    if (error) {
      s.push(compTheme.error)
    }
    if (warning) {
      s.push(compTheme.warning)
    }
    if (info) {
      s.push(compTheme.info)
    }
    if (transparent) {
      s.push(compTheme.transparent)
    }
    if (disabled) {
      s.push(compTheme.disabled)
    }

    return mergeStyles(s)
  }, [
    mergeWithComponentStyles,
    mergeStyles,
    style,
    inline,
    success,
    error,
    warning,
    info,
    transparent,
    disabled,
  ])

  return (
    <View style={finalStyle.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={finalStyle.button}
        {...rest}
      >
        <Text style={finalStyle.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

Button.propTypes = {
  inline: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  info: PropTypes.bool,
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.shape(),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default Button
