import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { getQuestions } from '../../services/api.js';
import { styles } from './styles.js';
import QuestionCard from '../../components/QuestionCard';
import { shuffleArray } from '../../utils';


function Question(props){

  const { identifier, color } = props.route.params;
  const [questions, setQuestions] = useState([{}]);
  const [current, setCurrent] = useState(0);
  const [spin, setSpin] = useState(new Animated.Value(0));
  const [scale, setScale] = useState(new Animated.Value(1));

  useEffect(() => {
    async function fetchQuestions() {
      console.log({filters: {type: identifier}});
      let res = await getQuestions({filters: {category: identifier}});
      shuffleArray(res);
      setQuestions(res);
    }

    fetchQuestions();
  }, [])

  function animate(spin_value, scale_value){
    // console.log('spin:', spin_value);
    // Animated.timing(
    //   scale,
    //   {
    //     toValue: scale_value,
    //     duration: 400,
    //     easing: Easing.bounce,
    //     useNativeDriver: true
    //   }
    // ).start()
    Animated.parallel([
      Animated.timing(
        spin,
        {
          toValue: spin_value,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start(),
      Animated.timing(
        scale,
        {
          toValue: scale_value,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start()
    ]);
  }

  function handleAnswerPress(question, ans){
    if(question.right_answer == ans.id){
      animate(1, 0.5)
      setTimeout(() => {
        setCurrent(current + 1);
        animate(0, 1)
      }, 400)
    } else {
      // A loop is needed for continuous animation
      Animated.loop(
        // Animation consists of a sequence of steps
        Animated.sequence([
          // start rotation in one direction (only half the time is needed)
          Animated.timing(spin, { toValue: 0.02, duration: 12, easing: Easing.bounce, useNativeDriver: true }),
          // rotate in other direction, to minimum value (= twice the duration of above)
          Animated.timing(spin, { toValue: -0.02, duration: 24, easing: Easing.bounce, useNativeDriver: true }),
          // return to begin position
          Animated.timing(spin, { toValue: 0.0, duration: 12, easing: Easing.bounce, useNativeDriver: true })
        ])
        , { iterations: 3 }).start();
    }
  }

  return(
    <View style={styles.screenContainer}>
      <Animated.View
        style={{
          ...styles.animContainer,
          transform: [{
            rotate: spin.interpolate({
              inputRange: [-1, 1],
              outputRange: ['-6.28319rad', '6.28319rad']
            }),
            },
            {scaleX: scale},
            {scaleY: scale}
          ]
        }}
      >
        <QuestionCard
          question={questions[current]}
          onAnswerPress={handleAnswerPress}
          color={color}
        />
      </Animated.View>
    </View>
  )
}


export default Question;
