import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../utils/colors';

interface Props {
  navigation: any;
}

const WelcomeScreen = ({navigation}: Props) => {
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
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          title={'Login'}
          onPress={() => navigation.navigate('Login')}
        />
        <PrimaryButton
          title={'Sign Up'}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue_500,
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
    color: colors.white,
    fontSize: 22,
    fontWeight: '600',
  },
  description: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 50,
    marginBottom: 20,
    gap: 20,
    paddingHorizontal: 35,
  },
});
