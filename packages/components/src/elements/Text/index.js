import React from 'react'
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native'

// // Elements && styles
// import styles from '../styles'

const Text = ({ title, small, style, center, noWide, children }) => {
  let textStyles = { ...localStyles.text }
  if (title) textStyles = { ...textStyles, ...localStyles.textTitle }
  if (small) textStyles = { ...textStyles, ...localStyles.textSmall }
  if (noWide) textStyles.width = 'auto'
  if (center) textStyles.textAlign = 'center'
  textStyles = { ...textStyles, ...style }

  return <RNText style={textStyles}>{children}</RNText>
}

Text.propTypes = {
  title: PropTypes.bool,
  small: PropTypes.bool,
  center: PropTypes.bool,
  noWide: PropTypes.bool,
  style: PropTypes.shape(),
  children: PropTypes.any.isRequired
}

export const localStyles = {
  text: {
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 8,
    color: "#000000",
    fontSize: 18
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '500'
  },
  textSmall: {
    fontSize: 12,
    fontWeight: '100'
  }
}

export default Text
