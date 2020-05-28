import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text as RNText,
} from 'react-native';

// Theme provider
import { ThemeProvider } from 'components';

// Stories
import Text from './stories/Text';
import Button from './stories/Button';

const App: () => React$Node = () => (
  <ThemeProvider
    breakPoints={[550, 750, 1000, 1400]}
    variables={{
      textSize: 24,
      userColor: 'tomato',
      userSpecialColor: 'pink',
      userSpecialColor1: 'red',
      redishFontWeight: 900,
      buttonHeight: 200,
      anotherColor: s => s.themes.default.userSpecialColor,
      __web: {
        textSize: 40,
        __tablet: {
          textSize: 70,
        },
      },
    }}
    themes={{
      redish: {
        primaryColor: 'red',
        fontWeight: s => s.themes.default.redishFontWeight,
        textColor: 'white',
        __android: {
          textColor: 'green',
        }
      },
      redishCopy: s => ({
        ...s.themes.redish,
        textColor: 'black',
      })
    }}
    components={{
      Button: {
        default: {
          button: {
            height: s => s.theme.buttonHeight,
            __lteTablet: {
              __lteTablet: {
                __lteTablet: {
                  height: s => s.theme.buttonHeight / 2,
                },
                __mixins: {
                  bgColor: [],
                }
              },
            },
          },
          testElement: () => ({ height: 'TEST ELEMENT' })
        },
      },
    }}
    mixins={{
      bgColor: (s) => {
        return {
          backgroundColor: 'blue',
          __gtePhablet: {
            backgroundColor: x => x.theme.userSpecialColor,
          },
        }
      }
    }}
  >
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <RNText style={styles.sectionTitle}>
            🔴 RedTestApp 🔴
          </RNText>
          <RNText style={styles.sectionDescription}>
            This app mirrors all the components made available by red-mobile-sdk/components
          </RNText>
          <RNText style={styles.sectionDescription}>
            Please keep this app updated 🙏
          </RNText>
        </View>

        {/* List all stories */}
        <Text />
        <Button />

      </ScrollView>
    </SafeAreaView>
  </ThemeProvider>
);

const styles = {
  scrollView: {
    height: '100%',
    backgroundColor: "#FFFFFF",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderBottomColor: "#F3F3F3",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: "#000000",
  },
  sectionDescription: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: '400',
    color: "#000000",
  },
}

export default App
