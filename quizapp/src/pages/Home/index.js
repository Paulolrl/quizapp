import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { getCategories } from '../../services/api.js';
import CategoryCard from '../../components/CategoryCard';
import { styles } from './styles.js';

function Home(props){

  const [categories, setCategories] = useState([]);

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

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Quiiizzzz!!</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
      </View>
      <View style={styles.bottomContainer}>
      </View>
    </View>
  )

}

export default Home;
