import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { getQuestions, updateQuestion, updateRemoteUserProgress, getRandomQuestions } from '../../services/api.js';
import { styles } from './styles.js';
import QuestionCard from '../../components/QuestionCard';
import MilionaireHelp from '../../components/MilionaireHelp';
import { shuffleArray } from '../../utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserProgress } from '../../actions';
import { updateUser } from '../../services/api.js'
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adIntId = __DEV__? TestIds.INTERSTITIAL: 'ca-app-pub-5449822122541186/3737517224';
const adBanId = __DEV__? TestIds.BANNER: 'ca-app-pub-5449822122541186/5242170583';

function Question(props){

  const { category } = props.route.params;
  const { user } = props;
  const [questions, setQuestions] = useState([{}]);
  const [current, setCurrent] = useState(isCategoryClassic()? user.progress[category.identifier]: 0);
  const [spin, setSpin] = useState(new Animated.Value(0));
  const [scale, setScale] = useState(new Animated.Value(1));
  const [helpVisibility, setHelpVisibility] = useState(false);
  const [invalidIds, setInvalidIds] = useState([]);
  const [loadedAd, setLoadedAd] = useState(false);
  const [intAd, setIntAd] = useState();

  useEffect(() => {
    async function fetchQuestions() {
      let res;
      console.log(category.identifier);
      if(isCategoryClassic()){
        res = await getQuestions({filters: {category: category.identifier}});
      }
      else{
        res = await getRandomQuestions({size: 100});
      }
      // shuffleArray(res);
      setQuestions(res);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if(current%5 == 0){
      const interstitial = InterstitialAd.createForAdRequest(adIntId, {
        requestNonPersonalizedAdsOnly: true,
        // keywords: ['games', 'quiz'],
      });

      setIntAd(interstitial);

      const eventListener = interstitial.onAdEvent((type, error) => {
        console.log('aqui:', type);
        if (type === AdEventType.LOADED) {
          setLoadedAd(true);
          eventListener();
        }
      });

      interstitial.load();
    }
  }, [current]);



  function isCategoryClassic(){
    return category.identifier != 'RANDOM' && category.identifier != 'MILIONAIRE';
  }

  function animate(spin_value, scale_value){
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

    if(loadedAd && (current + 1)%5 == 0){
      intAd.show();
      setLoadedAd(false);
    }

    setInvalidIds([]);
    if(question.right_answer == ans.id){
      if(isCategoryClassic() && current + 1 > user.progress[category.identifier]){
        props.updateUserProgress(category.identifier, current + 1);
        updateRemoteUserProgress({category: category.identifier, value: current + 1});
      }
      animate(1, 0.5);
      setTimeout(() => {
        setCurrent(current + 1);

        animate(0, 1);
      }, 400);
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
    updateQuestion({_id: question._id, ans_id: ans.id});
  }


  return(
    <View style={styles.screenContainer}>
      {
        category.identifier == 'MILIONAIRE' &&
        <>
          <MilionaireHelp
            visible={helpVisibility}
            onClose={() => setHelpVisibility(false)}
            onUseHalfHelp={setInvalidIds}
            question={questions[current]}
          />
          <TouchableOpacity onPress={() => setHelpVisibility(true)}>
            <Text>Ajuda</Text>
          </TouchableOpacity>
        </>
      }
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
          question={questions[current] || {}}
          onAnswerPress={handleAnswerPress}
          color={category.color}
          invalidIds={invalidIds}
        />
      </Animated.View>
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={adBanId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  )
}


const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUserProgress }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Question);
