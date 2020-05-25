import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

import { createStyles, mergeStyles } from '../../utils'

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
  const finalStyle = useMemo(() => {
    const s = createStyles(localStyle.default)

    if (inline)
      s[0].button.width = undefined
    if (primary)
      s.push(localStyle.primary)
    if (secondary)
      s.push(localStyle.secondary)
    if (transparent)
      s.push(localStyle.transparent)
    if (disabled)
      s.push(localStyle.disabled)

    if (style)
      s.push(style)

    return mergeStyles(s)
  }, [inline, primary, secondary, transparent, disabled, style])

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

export const localStyle = {
  default: {
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      minWidth: 100,
      width: '96%',
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginVertical: 8,
      marginHorizontal: '2%',
      backgroundColor: 'blue',
    },
    text: {
      color: 'white',
      fontSize: 16,
    },
  },

  primary: {
    button: {
      backgroundColor: 'green',
    },
    text: {
      color: 'white',
    },
  },

  secondary: {
    button: {
      backgroundColor: 'tomato',
    },
    text: {
      color: 'white',
    },
  },

  transparent: {
    button: {
      backgroundColor: 'transparent',
    },
    text: {
      color: 'black',
    },
  },

  disabled: {
    button: {
      backgroundColor: 'grey',
      __web: {
        backgroundColor: 'purple'
      },
      __ios: {
        backgroundColor: 'yellow'
      },
      __android: {
        backgroundColor: 'green'
      },
    },
    text: {
      color: 'black',
    },
  },
}

export default Button
