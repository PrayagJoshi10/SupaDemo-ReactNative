import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

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
    backgroundColor: '#DAC0A3',
    borderRadius: 25,
  },
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
