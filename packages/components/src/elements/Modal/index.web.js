import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { View } from 'react-native'

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

  return createPortal(
    (
      <View style={finalStyle.wrapper}>
        {children}
      </View>
    ),
    document.body
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  dark: PropTypes.bool,
  style: PropTypes.shape(),
  children: PropTypes.any.isRequired,
}

export default Modal
