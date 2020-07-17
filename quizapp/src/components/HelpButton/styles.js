import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  helpButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
