import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles.js';

function HelpButton(props){

  const { button, selected, onHelpPress } = props;

  return(
   <TouchableOpacity
     key={button.value}
     style={styles.helpButton}
     onPress={() => onHelpPress(button.value)}
   >
     <Icon size={48} name={button.icon} color={selected == button.value? 'black': '#aaa'}/>
     <Text style={{color: selected == button.value? 'black': '#aaa'}}>{button.label}</Text>
   </TouchableOpacity>
  )
}

export default HelpButton;
