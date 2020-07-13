import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles.js';

function MilionaireHelp(props){

  const { visible, onClose } = props


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
        onPress={onClose}
        style={styles.backgroundContainer}
      />
      <View style={styles.contentContainer}>
        <View>
          <TouchableOpacity>
            <Text>Ligação</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Meio a Meio</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Plateia</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default MilionaireHelp;
