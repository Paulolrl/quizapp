import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles.js';

function QuestionCard(props){

  const { question, color, invalidIds } = props;

  return (
    <View style={{...styles.card, backgroundColor: color}}>
      <Text style={styles.title}>{question.text}</Text>
      {
        question.answers &&
        question.answers.map((ans, index) =>
          <TouchableOpacity
            key={index}
            style={{...styles.answerCard, borderColor: invalidIds.includes(ans.id)? '#aaa': '#555'}}
            onPress={() => props.onAnswerPress(question, ans)}>
            <Text
              style={{...styles.answerText, color: invalidIds.includes(ans.id)? '#aaa': '#555'}}
            >
                {(index + 1)+ ' - ' + ans.text}
            </Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default QuestionCard;
