import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

interface Props {
  value: string | undefined;
  onChangeText: ((text: string) => void) | undefined;
  label: string | undefined;
}

const CustomInput = ({label, value, onChangeText}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {width: '100%', gap: 20},
  label: {color: colors.white, fontSize: 20, fontWeight: 'bold'},
  input: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    backgroundColor: colors.camel_100,
    paddingVertical: 5,
    paddingHorizontal: 20,
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
});
