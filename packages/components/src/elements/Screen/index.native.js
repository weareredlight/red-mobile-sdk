import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { useTheme } from '../../theme'

const Screen = ({
  children,
  style,
  ...rest
}) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Screen', style)
    return mergeStyles([compTheme.default])
  }, [mergeWithComponentStyles, mergeStyles, style])

  return (
    <SafeAreaView style={finalStyle.safeArea}>
      {Platform.OS === 'android' ? (
        <View style={finalStyle.wrapper} {...rest}>
          {children}
        </View>
      ) : ( // ios
        <KeyboardAvoidingView behavior='padding'>
          <View style={finalStyle.wrapper} {...rest}>
            {children}
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  )
}

Screen.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.shape()
}

export default Screen
