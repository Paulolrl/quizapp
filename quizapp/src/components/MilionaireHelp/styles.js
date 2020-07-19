import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
    position: 'absolute'

  },
  contentContainer: {
    width: '90%',
    minHeight: '50%',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonsContainer: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  closeButton: {
    marginLeft: 'auto',
    margin: 10,
  }
})
