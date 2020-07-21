import React from 'react';
import { StyleSheet } from 'react-native';

const size = 100;
const width = 15;
const cropDegree = 0;
const textOffset = width;
const textWidth = size - (textOffset*2);
const textHeight = size*(1 - cropDegree/360) - (textOffset*2);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionCard: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  text: {
    fontSize: 18,
    color: '#ddd'
  },
  statContainer: {
    position: 'absolute',
    zIndex: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  textView: {
    position: 'absolute',
    top: textOffset,
    left: textOffset,
    width: textWidth,
    height: textHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orContainer: {
    position: 'absolute',
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  }
})
