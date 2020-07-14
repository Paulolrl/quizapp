import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles.js';
import CallHelp from '../CallHelp';
import HalfHelp from '../HalfHelp';
import OddsHelp from '../OddsHelp';

function MilionaireHelp(props){

  const { visible, onClose, question } = props;
  const [usedHelps, setUsedHelps] = useState([]);
  const [selected, setSelected] = useState('CALL');

  const buttons = [
    {label: 'Ligação', value: 'CALL'},
    {label: 'Meio a Meio', value: 'HALF'},
    {label: 'Plateia', value: 'ODDS'}
  ]

  useEffect(() => {
    console.log('usedHelps', usedHelps);
  }, [usedHelps])

  function switchHelp(){
    if(selected == 'CALL')
      return(
        <CallHelp
          used={usedHelps.includes('CALL')}
          onHelpEnd={() =>
            setUsedHelps(oldUsedHelps => {
              let newUsedHelps = [...oldUsedHelps];
              newUsedHelps.push('CALL')
              return newUsedHelps;
            })
          }
        />
      )
    if(selected == 'HALF'){
      return(
        <HalfHelp
          used={usedHelps.includes('HALF')}
          onUseHelp={(ids) => {
            setUsedHelps(oldUsedHelps => {
              let newUsedHelps = [...oldUsedHelps];
              newUsedHelps.push('HALF')
              return newUsedHelps;
            });
            props.onUseHalfHelp(ids);
            onClose();
          }}
          question={question}
        />
      )
    }
    if(selected == 'ODDS'){
      return(
        <OddsHelp
          used={usedHelps.includes('ODDS')}
          onOddsHelpUsed={() => {
            console.log('ENTROU NA PARTE DE MARCAR COMO VISTA');
            setUsedHelps(oldUsedHelps => {
              let newUsedHelps = [...oldUsedHelps];
              newUsedHelps.push('ODDS')
              return newUsedHelps;
            });
          }}
          question={question}
        />
      )
    }
  }

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
        <View style={styles.buttonsContainer}>
          {
            buttons.map((button) => (
              <TouchableOpacity
                key={button.value}
                style={styles.helpButton}
                onPress={() => setSelected(button.value)}
              >
                <Text>{button.label}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        {
          switchHelp()
        }
      </View>
    </Modal>
  )
}

export default MilionaireHelp;
