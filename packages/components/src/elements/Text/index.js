import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native'

import { createStyles, mergeStyles } from '../../utils'

const Text = ({
  title,
  small,
  style,
  center,
  inline,
  children,
}) => {
  const finalStyle = useMemo(() => {
    const s = createStyles(localStyle.default)

    if (inline)
      s[0].text.width = 'auto'
    if (center)
      s[0].text.textAlign = 'center'
    if (title)
      s.push(localStyle.title)
    if (small)
      s.push(localStyle.small)

    if (style)
      s.push(style)

    return mergeStyles(s)
  }, [inline, center, title, small, style])

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

export const localStyle = {
  default: {
    text: {
      flexWrap: 'wrap',
      width: '100%',
      paddingVertical: 2,
      paddingHorizontal: 8,
      color: "#000000",
      fontSize: 18
    },
  },
  title: {
    text: {
      fontSize: 24,
      fontWeight: '500'
    },
  },
  small: {
    text: {
      fontSize: 12,
      fontWeight: '100'
    },
  },
}

export default Text
