import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles.js';

function MilionaireHelp(props){

  const { visible } = props

  return(
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log('pediu pra fechar');
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => console.log('clicou nessa merda')}
        style={styles.backgroundContainer}
      />
      <View style={styles.contentContainer}>
        <Text>Testeee</Text>
      </View>
    </Modal>
  )
}

export default MilionaireHelp;
