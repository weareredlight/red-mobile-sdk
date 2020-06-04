import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { View, Image as RNImage, Platform } from 'react-native'

import { useTheme } from '../../theme'

const Image = ({
  source,
  width,
  height,
  align,
  justify,
  resizeMode,
  style,
  ...rest
}) => {
  const { mergeStyles, mergeWithComponentStyles } = useTheme()

  const [size, setSize] = useState(null)
  const [wrapperData, setWrapperData] = useState(null)
  const [imageData, setImageData] = useState(null)

  const finalStyle = useMemo(() => {
    const compTheme = mergeWithComponentStyles('Image', style)
    const s = [compTheme.default]

    if (width) {
      s[0].wrapper.width = width
    }
    if (height) {
      s[0].wrapper.height = height
    }
    if (align) {
      s[0].wrapper.alignItems = align
    }
    if (justify) {
      s[0].wrapper.justifyContent = justify
    }
    if (resizeMode) {
      s[0].image.resizeMode = resizeMode
    }
    if (size) {
      s[0].image.width = size.width
      s[0].image.height = size.height
    }

    return mergeStyles(s)
  }, [
    mergeWithComponentStyles,
    mergeStyles,
    size,
    width,
    height,
    align,
    justify,
    resizeMode,
  ])

  const onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout
    setWrapperData({ width, height })
  }

  useEffect(() => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const imgResolved = RNImage.resolveAssetSource(source)
      setImageData({
        width: imgResolved.width,
        height: imgResolved.height,
        ratio: imgResolved.width / imgResolved.height
      })
    } else {
      RNImage.getSize(source, (width, height) =>
        setImageData({
          width, height, ratio: width / height
        }))
    }
  }, [source, setImageData])

  useEffect(() => {
    if (!wrapperData || !imageData) return

    const verticalRatio = imageData.height / wrapperData.height
    const horizontalRatio = imageData.width / wrapperData.width

    if (!resizeMode) {
      if (verticalRatio > horizontalRatio) {
        setSize({ height: wrapperData.height, width: imageData.width / verticalRatio })
      } else {
        setSize({ height: imageData.height / horizontalRatio, width: wrapperData.width })
      }
    } else {
      setSize({ height: wrapperData.height, width: wrapperData.width })
    }
  }, [wrapperData, imageData, setSize])

  return (
    <View onLayout={onLayout} style={finalStyle.wrapper}>
      {size && <RNImage source={source} style={finalStyle.image} {...rest} />}
    </View>
  )
}

Image.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string, // electron
    PropTypes.number // android
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string, // '50%'
    PropTypes.number // 250
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string, // '50%'
    PropTypes.number // 250
  ]),
  resizeMode: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  style: PropTypes.shape(),
}

export default Image
