import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native'

import { useTheme } from '../../theme'

const Text = ({
  h1,
  h2,
  h3,
  small,
  muted,
  style,
  center,
  inline,
  children,
}) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Text', style)
    const s = [compTheme.default]

    if (inline) {
      s[0].text.width = 'auto'
    }
    if (center) {
      s[0].text.textAlign = 'center'
    }
    if (h1) {
      s.push(compTheme.h1)
    }
    if (h2) {
      s.push(compTheme.h2)
    }
    if (h3) {
      s.push(compTheme.h3)
    }
    if (small) {
      s.push(compTheme.small)
    }
    if (muted) {
      s.push(compTheme.muted)
    }

    return mergeStyles(s)
  }, [
    mergeWithComponentStyles,
    mergeStyles,
    style,
    inline,
    center,
    h1,
    h2,
    h3,
    muted,
    small,
  ])

  return <RNText style={finalStyle.text}>{children}</RNText>
}

Text.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  muted: PropTypes.bool,
  small: PropTypes.bool,
  center: PropTypes.bool,
  inline: PropTypes.bool,
  style: PropTypes.shape(),
  children: PropTypes.any.isRequired,
}

export default Text
