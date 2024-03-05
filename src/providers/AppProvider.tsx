import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {}

const AppProvider = (props: Props) => {
  return (
    <View>
      <Text>AppProvider</Text>
    </View>
  );
};

export default AppProvider;

const styles = StyleSheet.create({});
