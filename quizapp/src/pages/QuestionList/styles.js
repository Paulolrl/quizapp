import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  button: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#aaa',
    borderColor: '#555'
  },
  header: {
    width: '100%',
    marginTop: '2%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555'
  }
})
