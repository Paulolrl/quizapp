import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getRandomInt } from '../../../utils';
import { styles } from './styles.js';

function OddsHelp(props){

  const { used, question } = props;
  const [show, setShow] = useState(false);
  const [odds, setOdds] = useState([]);

  useEffect(() => {
    let count = question.answers.map(ans => ans.count).reduce((prev, next) => prev + next);
    let auxOdds = [];

    if(count >= 10){
      question.answers.forEach(ans => {
        auxOdds.push({id: ans.id + 1, odd: Math.round((ans.count/count)*100)})
      });
    } else {

      let rightAnsOdd = getRandomInt(55, 100);
      let othersOdd = 100 - rightAnsOdd;

      for(let i = 0; i < question.answers.length; i++){
        if(question.answers[i].id == question.right_answer){
          auxOdds.push({id: question.answers[i].id + 1, odd: rightAnsOdd });
        }else if(i != question.answers.length - 1){
          let odd = getRandomInt(0, othersOdd);
          auxOdds.push({id: question.answers[i].id + 1, odd});
          othersOdd -= odd;
        }else{
          auxOdds.push({id: question.answers[i].id + 1, odd: othersOdd});
        }
      }

    }

    setOdds(auxOdds);

    return () => {
      console.log('foi desmontado');
      if(show){
        console.log('entrou no show');
        setShow(false);
        props.onOddsHelpUsed();
      }
    }
  }, [show]);

  return(
    <View style={styles.helpContainer}>
      {
        !used && !show &&
        <>
          <Text style={styles.text}>Você pode ver a estatistica das respostas de outros usuários</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {setShow(true); flag = true}}>
            <Text style={styles.label}>Usar</Text>
          </TouchableOpacity>
        </>
      }
      {
        show &&
        <>
          {
            odds.map((odd, index) => (
              <View style={styles.oddContainer}>
                <Text>{index + 1 + '-'}</Text>
                <View style={styles.progressBar}>
                  <View style={{...styles.progress, width: odd.odd + '%'}}/>
                </View>
                <Text>{(odd.odd < 10? '0': '') + odd.odd + '%'}</Text>
              </View>
            ))
          }
        </>
      }
      {
        used &&
        <Text style={styles.text}>Essa ajuda já foi utilizada</Text>
      }
    </View>
  )
}

export default OddsHelp;
