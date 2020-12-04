import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

import Modal from '../Modal'
import Loading from '../Loading'

const LoadingOverlay = ({ visible, style, ...rest }) => {
  const mergedStyles = merge({}, stylePayload, style)

  return (
    <Modal dark visible={visible}>
      <Loading style={mergedStyles} {...rest} />
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
