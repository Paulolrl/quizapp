import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { getCategories } from '../../services/api.js';
import CategoryCard from '../../components/CategoryCard';
import { styles } from './styles.js';

const { width } = Dimensions.get('window');

function Home(props){

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  let scroll;

  useEffect(() => {
    async function fetchCategories(){
      let res = await getCategories();
      console.log(res);
      // let questions = await getQuestions({filters: {}});
      // updateQuestion({_id: questions[0]['_id'], ans_id: 1})
      // console.log(questions);
      setCategories(res);
    }
    fetchCategories();
  }, []);

  function handleCategoryPress(category){
    props.navigation.navigate('Question', {identifier: category.identifier, color: category.color})
  }

  function onScroll(event) {
    setPage(
      Math.round(event.nativeEvent.contentOffset.x / width),
    );
  }

  function scrollTo(value){
    scroll.scrollTo({x: width*(page+value)});
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Quiiizzzz!!</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          ref={scr => scroll = scr}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        >
          {
            categories.map((cat, index) =>
              <View key={index} style={styles.categoryContainer}>
                <CategoryCard
                  category={cat}
                  onCategoryPress={handleCategoryPress}
                />
              </View>
            )
          }
        </ScrollView>
        <View style={styles.navigationContainer}>
          {
            page != 0 &&
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => scrollTo(-1)}>
              <Text>{'<'}</Text>
            </TouchableOpacity>
          }
        </View>
        <View style={{...styles.navigationContainer, right: 0}}>
          {
            page != categories.length -1 &&
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => scrollTo(1)}>
              <Text>{'>'}</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
      <View style={styles.bottomContainer}>
      </View>
    </View>
  )

}

export default Home;
