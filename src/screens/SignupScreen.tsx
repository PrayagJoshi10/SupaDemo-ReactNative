import {
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

interface Props {
  navigation: any;
}

const SignupScreen = ({navigation}: Props) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Sign Up"
            onPress={() => console.log('signup')}
          />
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
});
