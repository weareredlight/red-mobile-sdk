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
}) => {
  const { getStyles, createStyles, mergeStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const elementStyle = getStyles('Text')
    const s = createStyles(elementStyle.default)

    if (inline)
      s[0].text.width = 'auto'
    if (center)
      s[0].text.textAlign = 'center'
    if (title)
      s.push(elementStyle.title)
    if (small)
      s.push(elementStyle.small)

    if (style)
      s.push(style)

    return mergeStyles(s)
  }, [getStyles, inline, center, title, small, style])

  return <RNText style={finalStyle.text}>{children}</RNText>
}

Text.propTypes = {
  title: PropTypes.bool,
  small: PropTypes.bool,
  center: PropTypes.bool,
  inline: PropTypes.bool,
  style: PropTypes.shape(),
  children: PropTypes.any.isRequired
}

export default Text
