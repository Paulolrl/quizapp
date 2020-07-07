import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#ddd',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 20,
    width: '80%',
    paddingHorizontal: 20,
    marginVertical: 5
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#555'
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#aaa',
    borderColor: '#555'
  },
  label: {
    fontWeight: '500',
    color: '#555'
  },
  errorText: {
    color: 'red',
  }
})
