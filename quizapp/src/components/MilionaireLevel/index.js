import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles.js';

const prizes = [
  '500',
  '1.000',
  '2.000',
  '3.000',
  '5.000',
  '10.000',
  '15.000',
  '20.000',
  '30.000',
  '50.000',
  '100.000',
  '150.000',
  '300.000',
  '500.000',
  '1.000.000'
]

function MilionaireLevel(props){

  const { current } = props;

  return (
    <View style={styles.levelContainer}>
      <Text style={styles.prize}>{'R$ ' + prizes[current]}</Text>
      <Text style={styles.level}>{(current + 1) + '/' + '15'}</Text>
    </View>
  )

}

export default MilionaireLevel;
