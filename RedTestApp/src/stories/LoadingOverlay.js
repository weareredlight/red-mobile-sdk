import React, { useState, useCallback } from 'react'
import { Flex, Text, Button, LoadingOverlay } from '@weareredlight/components'

import styles from '../ComponentDetailsStyles'

const LoadingOverlayStory = () => {
  const [showOverlay, setShowOverlay] = useState(false)
  const toggleOverlay = useCallback(() => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
    }, 2000)
  }, [setShowOverlay])

  return (
    <Flex style={styles.container}>
      <LoadingOverlay visible={showOverlay} />

      <Flex
        row
        justify='space-between'
        align='center'
      >
        <Text h3 inline>LoadingOverlay</Text>
        <Button
          inline
          transparent
          title='Show overlay for 2s'
          onPress={toggleOverlay}
        />
      </Flex>
      <Text muted>
        prop 'visible' to show/hide the modal
      </Text>
      <Text muted>
        has the same props as Loading
      </Text>
    </Flex>
  )
}

export default LoadingOverlayStory
