import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { styles } from './styles.js';

function EndScreen(props){
  const { message, title } = props.route.params;

  function handleContinue(){
    props.navigation.dispatch(StackActions.popToTop());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}>
        <Text style={styles.label}>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EndScreen;
