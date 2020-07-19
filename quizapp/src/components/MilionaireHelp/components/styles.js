import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  helpContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  text: {
    textAlign: 'center',
    color: '#555',
    fontSize: 18
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: '#555'
  },
  label: {
    color: '#555'
  },
  clock: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  oddContainer: {
    flexDirection: 'row'
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 10,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#aaa',
    marginBottom: 10,
    overflow: 'hidden'
  },
  progress: {
    height: 20,
    borderRadius: 10,
    backgroundColor: 'lightgreen'
  }
})
