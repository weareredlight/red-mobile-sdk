import React from 'react'
import { TextInput } from 'react-native'

import {
  ThemeProvider,
  Screen,
  Button,
  Text,
  Flex,
} from '@redlightsoftware/components'

// Stories
import TextStory from './stories/Text'
import ButtonStory from './stories/Button'
import LoadingStory from './stories/Loading'
import LoadingOverlayStory from './stories/LoadingOverlay'

const App = () => {
  return (
    <ThemeProvider>
      <Screen scroll>
        <Flex style={headerStyles}>
          <Text h1>🔴 RedTestApp 🔴</Text>
          <Text>
            This app mirrors all the components made available by
            red-mobile-sdk/components
          </Text>
          <Text>
            Please keep this app updated 🙏
          </Text>
        </Flex>

        {/* List all stories */}
        <TextStory />
        <ButtonStory />
        <LoadingStory />
        <LoadingOverlayStory />

        <TextInput />
      </Screen>
    </ThemeProvider>
  )
}

const headerStyles = {
  default: {
    flex: {
      borderBottomWidth: 1,
      __fun: [({ vars }) => ({
        borderBottomColor: vars.colors.muted,
        marginTop: vars.spacing.m,
        paddingHorizontal: vars.spacing.m,
        paddingBottom: vars.spacing.m,
      })]
    }
  }
}

export default App
