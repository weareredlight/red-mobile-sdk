import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

// Elements && styles
// import styles from '../styles'

const Button = props => {
  let finalTouchableStyles = { ...localStyles.button }
  let finalTextStyles = { ...localStyles.text }

  if (props.noWide) finalTouchableStyles.width = undefined

  if (props.primary) {
    finalTouchableStyles = {
      ...finalTouchableStyles,
      ...localStyles.buttonPrimary
    }
    finalTextStyles = { ...finalTextStyles, ...localStyles.textPrimary }
  }
  if (props.secondary) {
    finalTouchableStyles = {
      ...finalTouchableStyles,
      ...localStyles.buttonSecondary
    }
    finalTextStyles = { ...finalTextStyles, ...localStyles.textSecondary }
  }
  if (props.transparent) {
    finalTouchableStyles = {
      ...finalTouchableStyles,
      ...localStyles.buttonTransparent
    }
    finalTextStyles = { ...finalTextStyles, ...localStyles.textTransparent }
  }
  if (props.disabled) {
    finalTouchableStyles = {
      ...finalTouchableStyles,
      ...localStyles.buttonDisabled,
      backgroundColor: props.transparent
        ? 'transparent'
        : 'grey'
    }
    finalTextStyles = { ...finalTextStyles, ...localStyles.textDisabled }
  }

  finalTouchableStyles = { ...finalTouchableStyles, ...props.style }

  return (
    <TouchableOpacity
      style={finalTouchableStyles}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={finalTextStyles}>{props.title}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  noWide: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.shape(),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export const localStyles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    minWidth: 100,
    width: '96%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    marginHorizontal: '2%',
    backgroundColor: 'blue'
  },
  text: {
    color: 'white',
    fontSize: 16,
  },

  buttonPrimary: { backgroundColor: 'green' },
  textPrimary: { color: 'white' },

  buttonSecondary: { backgroundColor: 'yellow' },
  textSecondary: { color: 'white' },

  buttonTransparent: { backgroundColor: 'transparent' },
  textTransparent: { color: 'black' },

  buttonDisabled: { backgroundColor: 'grey' },
  textDisabled: { color: 'black' },
}

export default Button
