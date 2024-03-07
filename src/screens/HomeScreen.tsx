import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import PrimaryButton from '../components/PrimaryButton';
import {supabase} from '../utils/supabase';
import {useAppProvider} from '../providers/AppProvider';

interface user {
  name: string;
  email: string;
  phone: string;
  profile_image: string;
}

const HomeScreen = () => {
  const {setSession, session} = useAppProvider();
  const [user, setUser] = useState<user | null>();
  const onLogout = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
      return;
    }
    setSession(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const {data, error} = await supabase
        .from('users')
        .select()
        .eq('id', session?.user.id);
      if (error) {
        Alert.alert(error.message);
        return;
      }
      setUser(data[0]);
    };

    getUser();
  }, [session?.user.id]);

  return (
    <View style={styles.container}>
      <View style={styles.userDetailsContainer}>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.userImage}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.contact}>Email: {user?.email}</Text>
        <Text style={styles.contact}>Phone: {user?.phone}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_500,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 50,
  },
  userDetailsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  name: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  contact: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
