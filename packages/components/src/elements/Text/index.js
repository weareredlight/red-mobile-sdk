import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native'

import { useTheme } from '../../theme'

const Text = ({
  title,
  small,
  style,
  center,
  inline,
  children,
  skipThemeParsing,
}) => {
  const { getStyles, mergeStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const parsedTheme = mergeStyles([getStyles('Text'), style || {}], true)
    const s = [parsedTheme.default]

    if (inline) {
      s[0].text.width = 'auto'
    }
    if (center) {
      s[0].text.textAlign = 'center'
    }
    if (title) {
      s.push(parsedTheme.title)
    }
    if (small) {
      s.push(parsedTheme.small)
    }

    return mergeStyles(s, skipThemeParsing)
  }, [getStyles, style, inline, center, title, small, skipThemeParsing])

  return <RNText style={finalStyle.text}>{children}</RNText>
}

Text.propTypes = {
  title: PropTypes.bool,
  small: PropTypes.bool,
  center: PropTypes.bool,
  inline: PropTypes.bool,
  style: PropTypes.shape(),
  children: PropTypes.any.isRequired,
  skipThemeParsing: PropTypes.bool,
}

export default Text
