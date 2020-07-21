import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles.js';
import { getRandomQuestions, updateQuestion } from '../../services/api.js';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const size = 100;
const width = 10;
const cropDegree = 0;
const textOffset = width;
const textWidth = size - (textOffset*2);
const textHeight = size*(1 - cropDegree/360) - (textOffset*2);

const questions = [
  {
    type: 'WYRATHER',
    answers: [
      {id: 0, text: 'Dormir 20h por dia', count: 10},
      {id: 1, text: 'Dormir 2h por dia', count: 50}
    ]
  },
  {
    type: 'WYRATHER',
    answers: [
      {id: 0, text: 'Ficar rico', count: 10},
      {id: 1, text: 'ser feliz', count: 50}
    ]
  },
  {
    type: 'WYRATHER',
    answers: [
      {id: 0, text: 'voar', count: 10},
      {id: 1, text: 'teleporte', count: 50}
    ]
  }
]

function WYRather(props){

  const [current, setCurrent] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const question = questions[current];

  function handleAnswerPress(index){
    // if(!showStats)
    //   updateQuestion({_id: question._id, ans_id: index});
    setShowStats(true);
  }

  function calcPercentage(){
    let total = question.answers[0].count + question.answers[1].count;
    let blue = Math.round(question.answers[0].count/total * 100);
    let red = Math.round(question.answers[1].count/total * 100);

    if(blue > red)
      return {fill: blue, bigger: blue, color: '#0060de'}
    return {fill: blue, bigger: red, color: '#d10000'}
  }

  function handleContinue(){
    setCurrent(current + 1);
    setShowStats(false);
  }

  return (
    <View style={styles.container}>
      {
        showStats &&
        <View style={styles.statContainer}>
        <AnimatedGaugeProgress
          size={size}
          width={width}
          fill={calcPercentage().fill}
          cropDegree={cropDegree}
          backgroundColor="#d10000"
          tintColor="#0060de"
        >
          <View style={styles.textView}>
            <Text style={{...styles.text, color: calcPercentage().color}}>{calcPercentage().bigger + '%'}</Text>
          </View>
        </AnimatedGaugeProgress>
          <TouchableOpacity onPress={handleContinue}>
            <Text>Continuar</Text>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.orContainer}>
        <Text>Or</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleAnswerPress(0)}
        style={{...styles.questionCard, backgroundColor: '#0060de', marginBottom: 5}}
      >
        <Text style={styles.text}>{question.answers[0].text}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAnswerPress(1)}
        style={{...styles.questionCard, backgroundColor: '#d10000', marginTop: 5}}
      >
        <Text style={styles.text}>{question.answers[1].text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WYRather;
