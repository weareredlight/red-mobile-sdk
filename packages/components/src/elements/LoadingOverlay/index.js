import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { Modal, View, Platform } from 'react-native'

import Loading from '../Loading'

import { useTheme } from '../../theme'

const LoadingOverlay = ({ visible, style, ...rest }) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('LoadingOverlay', {})
    const s = [compTheme.default]

    if (visible) {
      s.push(compTheme.visible)
    }

    return mergeStyles(s)
  }, [
    mergeWithComponentStyles,
    mergeStyles,
    visible,
  ])

  const mergedStyles = merge({}, stylePayload, style)

  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    return (
      <View style={finalStyle.wrapper}>
        <Loading style={mergedStyles} {...rest} />
      </View>
    )
  }

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType='fade'
      presentationStyle='overFullScreen'
    >
      <View style={finalStyle.wrapper}>
        <Loading style={mergedStyles} {...rest} />
      </View>
    </Modal>
  )
}

const stylePayload = {
  default: {
    text: {
      __fun: [({ vars }) => ({
        color: vars.colors.white,
      })]
    }
  }
}

LoadingOverlay.propTypes = {
  visible: PropTypes.bool,
  style: PropTypes.shape(),
}

export default LoadingOverlay
