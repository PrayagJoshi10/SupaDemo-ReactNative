import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/colors';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import {supabase} from '../utils/supabase';

interface Props {
  navigation: any;
}
const screen_height = Dimensions.get('window').height;
const screen_width = Dimensions.get('window').width;
const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const signInWithEmail = async () => {
    setLoading(true);
    const {error: signinError} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (signinError) {
      Alert.alert(signinError.message);
    }
    setLoading(false);
  };

  const onLogin = () => {
    if (!email) {
      setError('Email is required');
      return;
    } else if (!validateEmail()) {
      setError('Please enter a valid email');
      return;
    } else if (!password) {
      setError('Password is required');
      return;
    } else {
      signInWithEmail();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.description}>Login to continue</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomInput label="Username" value={email} onChangeText={setEmail} />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Pressable style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonLabel}>Forgot password?</Text>
        </Pressable>
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Login" onPress={onLogin} />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomLabel}>Don't have an account?</Text>
          <Text
            style={styles.signUpLabel}
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </View>
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={colors.camel_500} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue_500,
    paddingHorizontal: 25,
  },
  headerContainer: {
    marginTop: 25,
  },
  titleContainer: {
    marginVertical: 30,
    gap: 10,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: 'bold',
  },
  description: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    gap: 30,
  },
  forgotPasswordContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    padding: 10,
  },
  forgotPasswordButtonLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
  bottomTextContainer: {
    marginTop: 35,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  signUpLabel: {
    color: colors.camel_500,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingVertical: 10,
    paddingRight: 10,
  },
  loader: {
    position: 'absolute',
    height: screen_height,
    width: screen_width,
    backgroundColor: colors.white,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
