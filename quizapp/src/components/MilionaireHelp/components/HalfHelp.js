import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { shuffleArray } from '../../../utils';
import { styles } from './styles.js';

function HalfHelp(props){

  const { used, question } = props;

  function useHelp(){
    let answers = [...question.answers];
    let ids = [];
    shuffleArray(answers);
    answers.forEach(ans => {
      if(ids.length < 2 && ans.id != question.right_answer)
        ids.push(ans.id);
    });
    props.onUseHelp(ids);
  }

  return(
    <View style={styles.helpContainer}>
      {
        !used &&
        <>
          <Text style={styles.text}>Metade das respostas são desabilitadas</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={useHelp}>
            <Text style={styles.label}>Usar</Text>
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

export default HalfHelp;
