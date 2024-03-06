import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppProvider from './src/providers/AppProvider';
import AppNavigator from './src/navigation/AppNavigator';
import colors from './src/utils/colors';

const App = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.blue_500},
});
