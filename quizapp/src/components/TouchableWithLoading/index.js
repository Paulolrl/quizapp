import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles.js';

function TouchableWithLoading(props){

  const { color, label, loading, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.button, borderColor: color}}
      enabled={false}
    >
      {
        loading &&
        <ActivityIndicator color={color} style={{position: 'absolute'}}/>
      }

      <Text style={{...styles.label, color: loading? 'transparent': color}}>{label}</Text>

    </TouchableOpacity>
  )
}

export default TouchableWithLoading;
