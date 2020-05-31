import React from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'

// Theme provider
import ThemeProvider from 'components/lib/theme'

// Stories
import { default as TextStory } from './stories/Text'
import { default as ButtonStory } from './stories/Button'

const App = () => (
  <ThemeProvider
    components={{
      Text: {
        default: {
          text: {
            __web: {
              __web: {
                __web: {
                  __web: {
                    __web: {
                      backgroundColor: 'green'
                    } 
                  }
                }
              }
            },
            color: 'green',
            __fun: [({ vars }) => ({
              fontSize: vars.text.fontSize * 10,
              __web: {
                __web: {
                  __web: {
                    backgroundColor: 'green'
                  } 
                }
              },
            })]
          }
        },
        h1: {
          text: {
            color: 'blue',
          },
          __fun: [({ vars }) => ({
            text: {
              fontSize: vars.text.fontSize * 10,
            }
          })]
        }
      }
    }}
  >
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
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
      </ScrollView>
    </SafeAreaView>
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
