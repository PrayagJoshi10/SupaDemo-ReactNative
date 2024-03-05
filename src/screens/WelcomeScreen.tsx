import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';

interface Props {}

const WelcomeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Hello, Welcome!</Text>
        <Text style={styles.description}>
          Experience Supabase's Authentication, Database & Storage Features in
          React Native.
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102C57',
  },
  headerContainer: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  contentContainer: {
    alignItems: 'center',
    marginHorizontal: 25,
    gap: 15,
  },
  welcomeImage: {
    height: 250,
    width: 250,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
  },
  description: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
