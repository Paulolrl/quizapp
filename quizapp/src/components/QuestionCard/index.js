import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles.js';

function QuestionCard(props){

  const { question, color } = props;

  return (
    <View style={{...styles.card, backgroundColor: color}}>
      <Text style={styles.title}>{question.text}</Text>
      {
        question.answers &&
        question.answers.map((ans, index) =>
          <TouchableOpacity
            style={styles.answerCard}
            onPress={() => props.onAnswerPress(question, ans)}>
            <Text style={styles.answerText}>{(index + 1)+ ' - ' + ans.text}</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default QuestionCard;
