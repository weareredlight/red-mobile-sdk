import React from 'react'
import { ScrollView, TextInput } from 'react-native'
import {
  ThemeProvider,
  Screen,
  Text,
  Flex,
} from '@weareredlight/components'
// import { withPermission } from '@weareredlight/utils'

// Stories
import TextStory from './stories/Text'
import ImageStory from './stories/Image'
import ModalStory from './stories/Modal'
import ButtonStory from './stories/Button'
import LoadingStory from './stories/Loading'
import LoadingOverlayStory from './stories/LoadingOverlay'

const App = () => {
  // useEffect(() => {
  //   (async () => {
  //     withPermission(
  //       'CAMERA',
  //       'take a pic',
  //       () => console.log('success'),
  //       () => console.log('denied'),
  //     )
  //   })();
  // }, [])

  return (
    <ThemeProvider>
      <Screen>
        <ScrollView>
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
          <ImageStory />
          <TextStory />
          <ButtonStory />
          <LoadingStory />
          <LoadingOverlayStory />
          <ModalStory />

          <TextInput />
        </ScrollView>
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
