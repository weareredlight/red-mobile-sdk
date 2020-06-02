import React from 'react'
import { View, Text, TextInput } from 'react-native'

import { Screen } from '@redlightsoftware/components'

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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🔴 RedTestApp 🔴</Text>
        <Text style={styles.sectionDescription}>
          This app mirrors all the components made available by
          red-mobile-sdk/components
        </Text>
        <Text style={styles.sectionDescription}>
          Please keep this app updated 🙏
        </Text>
      </View>

      {/* List all stories */}
      <TextStory />
      <ButtonStory />

      <TextInput />
    </Screen>
  </ThemeProvider>
)

const styles = {
  scrollView: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
}

export default App
