import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Modal as ModalRN, View } from 'react-native'

import { useTheme } from '../../theme'

const Modal = ({ visible, dark, style, children, ...rest }) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Modal', style)
    const s = [compTheme.default]

    if (visible) {
      s.push(compTheme.visible)
    }
    if (dark) {
      s.push(compTheme.dark)
    }

    return mergeStyles(s)
  }, [
    mergeWithComponentStyles,
    mergeStyles,
    visible,
    dark,
    style,
  ])

  return (
    <ModalRN
      transparent
      visible={visible}
      statusBarTranslucent
      animationType='fade'
      presentationStyle='overFullScreen'
    >
      <View style={finalStyle.wrapper}>
        {children}
      </View>
    </ModalRN>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  dark: PropTypes.bool,
  style: PropTypes.shape(),
  children: PropTypes.any.isRequired,
}

export default Modal
