import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles.js';

function CallHelp(props){

  const { used } = props;
  const [inUse, setInUse] = useState(false);
  const [clock, setClock] = useState(3);
  const [intervalRef, setIntervalRef] = useState();


  function runClock(){
    setIntervalRef(setInterval(() => {
        setClock(clock => clock - 1);
    }, 1000));
  }

  useEffect(() => {
    if(clock <= 0){
      clearInterval(intervalRef);
      setInUse(false);
      props.onHelpEnd();
    }
  }, [clock]);

  return(
    <View style={styles.helpContainer}>
      {
        !used && !inUse &&
        <>
          <Text>Você pode ligar para alguém por 30s para pedir ajuda</Text>
          <TouchableOpacity onPress={() => setInUse(true)}>
            <Text>Usar</Text>
          </TouchableOpacity>
        </>
      }
      {
        inUse &&
        <>
          <Text>{clock}</Text>
          <TouchableOpacity onPress={runClock}>
            <Text>Iniciar</Text>
          </TouchableOpacity>
        </>
      }
      {
        used &&
        <Text>Essa ajuda já foi utilizada</Text>
      }
    </View>
  )
}

export default CallHelp;
