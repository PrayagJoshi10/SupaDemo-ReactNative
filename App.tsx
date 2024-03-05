import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppProvider from './src/providers/AppProvider';
import AppNavigator from './src/navigation/AppNavigator';
// import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
