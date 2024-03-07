import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SupaDemo</Text>
      <Image
        source={require('../assets/images/supabase-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_500,
  },
  text: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
});
