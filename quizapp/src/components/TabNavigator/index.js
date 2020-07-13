import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles.js';

function TabNavigator(props){

  const { tabs, onTabPress, color, selected } = props;

  return(
    <View style={styles.tabContainer}>
      {
        tabs.map(tab => (
          <TouchableOpacity
            key={tab.value}
            style={{...styles.tabButton, borderColor: selected == tab.value? color: 'transparent'}}
            onPress={() => onTabPress(tab)}
          >
            <Text>{tab.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default TabNavigator;
