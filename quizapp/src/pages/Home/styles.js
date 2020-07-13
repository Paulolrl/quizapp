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
    width: '100%'
  },
  topContainer: {
    height: '25%',
    justifyContent: 'center'
  },
  bottomContainer: {
    height: '25%',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#555'
  }
})
