import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { useTheme } from '../../theme'

const Flex = ({
  children,
  flex,
  row,
  wrap,
  align,
  justify,
  style,
  debug,
  inline,
  ...rest
}) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Flex', style)
    const s = [compTheme.default]

    if (flex) {
      s[0].flex.flex = flex
    }
    if (inline) {
      s[0].flex.width = 'auto'
    }
    if (row) {
      s[0].flex.flexDirection = 'row'
    }
    if (wrap) {
      s[0].flex.flexWrap = wrap
    }
    if (align) {
      s[0].flex.alignItems = align
    }
    if (justify) {
      s[0].flex.justifyContent = justify
    }
    if (debug) {
      s[0].flex.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }

    return mergeStyles(s)
  }, [mergeWithComponentStyles, mergeStyles, flex, row, wrap, align, justify])

  return (
    <View style={finalStyle.flex} {...rest}>
      {children}
    </View>
  )
}

Flex.propTypes = {
  children: PropTypes.any,
  scroll: PropTypes.bool,
  flex: PropTypes.number,
  row: PropTypes.bool,
  wrap: PropTypes.string,
  debug: PropTypes.bool,
  inline: PropTypes.bool,
  align: PropTypes.string,
  justify: PropTypes.string,
  style: PropTypes.shape()
}

export default Flex
