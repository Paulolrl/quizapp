import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles.js';

function CallHelp(props){

  const { used } = props;
  const [inUse, setInUse] = useState(false);
  const [clock, setClock] = useState(30);
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
          <Text style={styles.text}>Você pode ligar para alguém por 30s para pedir ajuda</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setInUse(true)}>
            <Text style={styles.label}>Usar</Text>
          </TouchableOpacity>
        </>
      }
      {
        inUse &&
        <>
          <Text style={styles.clock}>{clock >= 10? clock: '0' + clock}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={runClock}>
            <Text style={styles.label}>Iniciar</Text>
          </TouchableOpacity>
        </>
      }
      {
        used &&
        <Text style={styles.text}>Essa ajuda já foi utilizada</Text>
      }
    </View>
  )
}

export default CallHelp;
