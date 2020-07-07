import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { getCategories } from '../../services/api.js';
import { styles } from './styles.js';

function Home(props){

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories(){
      let res = await getCategories();
      setCategories(res);
    }
    fetchCategories();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text>Categorias</Text>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            categories.map((cat, index) =>
              <View key={index} style={{...styles.containerTeste, backgroundColor: cat.color}}>
                <Text>{cat.name.pt}</Text>
              </View>
            )
          }
        </ScrollView>
      </View>

    </View>
  )

}

export default Home;
