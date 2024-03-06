import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/colors';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';

interface Props {
  navigation: any;
}

const LoginScreen = ({navigation}: Props) => {
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
        <CustomInput label="Username" value={text} onChangeText={setText} />
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
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Login" onPress={() => console.log('login')} />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomLabel}>Don't have an account?</Text>
          <Text
            style={styles.signUpLabel}
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </View>
      </View>
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
  buttonContainer: {
    marginTop: 50,
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
});
