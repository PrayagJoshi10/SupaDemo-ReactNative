import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

interface Props {
  title: string;
  onPress: () => void;
}

const PrimaryButton = ({title, onPress}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.camel_500,
    borderRadius: 25,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
