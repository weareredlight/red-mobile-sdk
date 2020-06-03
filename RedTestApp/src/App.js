import React from 'react'
import { TextInput } from 'react-native'

import { Screen, Text, Flex } from '@redlightsoftware/components'

// Theme provider
import ThemeProvider from '@redlightsoftware/components/lib/theme'

// Stories
import { default as TextStory } from './stories/Text'
import { default as ButtonStory } from './stories/Button'

const App = () => (
  <ThemeProvider
    variables={{
      variableFromAppJS: true,
    }}
    mixins={{
      getX: ({ vars }) =>
        ({ variableFromMixin: vars.variableFromAppJS })
    }}
  >
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

      <TextInput />
    </Screen>
  </ThemeProvider>
)

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
