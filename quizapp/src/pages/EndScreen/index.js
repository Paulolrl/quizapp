import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';


function EndScreen(props){
  const { message } = props.route.params;

  function handleContinue(){
    props.navigation.dispatch(StackActions.replace('Home'));
  }

  return (
    <View>
      <Text>{message}</Text>
      <TouchableOpacity onPress={handleContinue}>
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EndScreen;
