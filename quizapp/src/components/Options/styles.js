import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  navigationContainer: {
    height: '100%',
    flex: 1,
    width: width*0.15,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsContainer: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  navigationButton: {
    padding: 20
  }
})
