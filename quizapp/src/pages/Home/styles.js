import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContainer: {
    height: '50%',
    backgroundColor: 'blue',
    width: '100%'
  },
  containerTeste: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
