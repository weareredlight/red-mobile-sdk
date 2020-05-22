import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text as RNText,
} from 'react-native';

// Stories
import Text from './stories/Text';
import Button from './stories/Button';

const App: () => React$Node = () => (
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
