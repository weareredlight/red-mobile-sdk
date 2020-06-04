import React, { useState, useCallback } from 'react'
import ComponentDetails from '../ComponentDetails'
import styles from '../ComponentDetailsStyles'
import { useTheme, Flex, Text, Button, LoadingOverlay } from '@redlightsoftware/components'

const LoadingOverlayStory = () => {
  const { theme: { breakPoints: bp } } = useTheme()
  
  const [showOverlay, setShowOverlay] = useState(false)
  const toggleOverlay = useCallback(() => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
    }, 2000)
  })

  return (
    <Flex style={styles.container}>
      <LoadingOverlay visible={showOverlay} />
      
      <Flex
        row={bp.gteTablet}
        justify='space-between'
        align='center'
      >
        <Text h3 inline={bp.gteTablet}>LoadingOverlay</Text>
        <Flex
          row
          inline={bp.gteTablet}
          justify={bp.gteTablet ? 'flex-end' : 'space-between'}
        >
          <Text muted inline>
            has the same props as Loading
          </Text>
          <Button
            inline
            transparent
            title='Show overlay for 2s'
            onPress={toggleOverlay}
          />
        </Flex>
      </Flex>
      
    </Flex>
  )
}

export default LoadingOverlayStory
