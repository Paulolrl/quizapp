import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { shuffleArray } from '../../utils';

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
    <>
      {
        !used &&
        <View>
          <Text>Metade das respostas são desabilitadas</Text>
          <TouchableOpacity onPress={useHelp}>
            <Text>Usar</Text>
          </TouchableOpacity>
        </View>
      }
      {
        used &&
        <View><Text>Essa ajuda já foi utilizada</Text></View>
      }
    </>
  )
}

export default HalfHelp;
