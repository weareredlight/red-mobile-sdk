import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { useTheme } from '../../theme'

const Screen = ({
  children,
  scroll,
  style,
  ...rest
}) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Screen', style)
    return mergeStyles([compTheme.default])
  }, [mergeWithComponentStyles, mergeStyles, style])

  const [First, Second] = useMemo(() => {
    if (scroll) {
      return [KeyboardAvoidingView, ScrollView]
    }
    return [View, View]
  }, [scroll])

  return (
    <SafeAreaView style={finalStyle.safeArea}>
      {Platform.OS === 'android' ? (
        <Second style={finalStyle.wrapper} {...rest}>
          {children}
        </Second>
      ) : ( // ios
        <First behavior='padding'>
          <Second style={finalStyle.wrapper} {...rest}>
            {children}
          </Second>
        </First>
      )}
    </SafeAreaView>
  )
}

Screen.propTypes = {
  children: PropTypes.any.isRequired,
  scroll: PropTypes.bool,
  style: PropTypes.shape()
}

export default Screen
