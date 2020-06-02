import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'

import { useTheme } from '../../theme'

const Screen = ({ children, style, ...rest }) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Screen', style)
    return mergeStyles([compTheme.default])
  }, [mergeWithComponentStyles, mergeStyles])

  return (
    <SafeAreaView style={finalStyle.safeArea} {...rest}>
      {children}
    </SafeAreaView>
  )
}

Screen.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.shape()
}

export default Screen
