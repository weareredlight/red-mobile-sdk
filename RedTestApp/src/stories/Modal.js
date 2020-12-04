import React, { useState, useCallback } from 'react'
import { Flex, Text, Button, Modal } from '@weareredlight/components'

import styles from '../ComponentDetailsStyles'
import { TouchableWithoutFeedback } from 'react-native'

const ModalStory = () => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = useCallback(() => {
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
    }, 2000)
  }, [setShowModal])

  return (
    <Flex style={styles.container}>
      <Modal visible={showModal}>
        <Flex style={{ default: { flex: { backgroundColor: 'grey', padding: 20 } } }}>
          <Text muted inline>
            This is a childrens Modal
          </Text>
        </Flex>
      </Modal>

      <Flex
        row
        justify='space-between'
        align='center'
      >
        <Text h3 inline>Modal</Text>
        <Button
          inline
          transparent
          title='Show modal for 2s'
          onPress={toggleModal}
        />
      </Flex>
      <Text muted>
        prop 'visible' to show/hide the modal
      </Text>
      <Text muted>
        prop 'dark' to use a dark background
      </Text>
    </Flex>
  )
}

export default ModalStory
