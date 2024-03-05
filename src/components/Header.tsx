import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SupaDemo</Text>
      <Image
        source={require('../assets/images/supabase-logo.png')}
        style={styles.supabaseLogo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  supabaseLogo: {
    height: 50,
    width: 50,
  },
});
