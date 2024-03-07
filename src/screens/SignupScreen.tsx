import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
const SignupScreen = ({navigation}: Props) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    setError('');
    const {
      data: {session},
      error: signUpError,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signUpError) {
      Alert.alert(signUpError.message);
      setLoading(false);
      return;
    }

    if (!session) {
      Alert.alert('No session!');
      setLoading(false);
      return;
    }

    const {error: insertError} = await supabase.from('users').insert({
      id: session.user.id,
      name: fullName,
      email,
      phone,
    });

    if (insertError) {
      Alert.alert(insertError.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const onSignUp = () => {
    if (!fullName) {
      setError('Name is required');
      return;
    } else if (!email) {
      setError('Email is required');
      return;
    } else if (!validateEmail()) {
      setError('Please enter a valid email');
      return;
    } else if (!password) {
      setError('Password is required');
      return;
    } else {
      signUpWithEmail();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
      style={styles.keyboardAvoidingContainer}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Account Now!</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <CustomInput label="Email" value={email} onChangeText={setEmail} />
          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
          <CustomInput label="Phone No" value={phone} onChangeText={setPhone} />
        </View>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Sign Up" onPress={onSignUp} />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomLabel}>Aleady have an account?</Text>
            <Text
              style={styles.loginLabel}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </View>
        <View style={styles.footer} />
      </ScrollView>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={colors.camel_500} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: colors.blue_500,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.blue_500,
    paddingHorizontal: 25,
  },
  headerContainer: {
    marginTop: 25,
    paddingHorizontal: 25,
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
  buttonContainer: {
    marginTop: 50,
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
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
  loginLabel: {
    color: colors.camel_500,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingVertical: 10,
    paddingRight: 10,
  },
  footer: {
    marginBottom: 50,
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
