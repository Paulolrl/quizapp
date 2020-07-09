import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: '10%',
    borderRadius: 10,
    width: '90%'
  },
  answerCard: {
    marginVertical: 5,
    width: '100%',
    paddingHorizontal: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: '#555'
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555'
  },
  answerText: {
    color: '#555'
  }
})
