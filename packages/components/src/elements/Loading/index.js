import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ActivityIndicator } from 'react-native'

import { useTheme } from '../../theme'

const Loading = ({ noIcon, noText, vertical, inline, text, style }) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Loading', style)
    const s = [compTheme.default]

    if (inline) {
      s[0].wrapper.width = undefined
    }
    if (noText) {
      s.push(compTheme.noText)
    }
    if (noIcon) {
      s.push(compTheme.noIcon)
    }
    if (vertical) {
      s.push(compTheme.vertical)
    }

    return mergeStyles(s)
  }, [
    mergeWithComponentStyles,
    mergeStyles,
    inline,
    noText,
    noIcon,
    vertical,
  ])

  return (
    <View style={finalStyle.wrapper}>
      {!noIcon ? (
        <ActivityIndicator
          size={finalStyle.icon.size}
          color={finalStyle.icon.color}
        />
      ) : null}
      {!noText ? (
        <Text style={finalStyle.text}>
          {text || 'Loading...'}
        </Text>
      ) : null}
    </View>
  )
}

Loading.propTypes = {
  noIcon: PropTypes.bool,
  noText: PropTypes.bool,
  inline: PropTypes.bool,
  vertical: PropTypes.bool,
  text: PropTypes.string,
  style: PropTypes.shape()
}

export default Loading
