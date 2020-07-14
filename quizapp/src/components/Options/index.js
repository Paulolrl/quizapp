import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles.js';
import CategoryCard from '../CategoryCard';
const { width } = Dimensions.get('window');

let scroll;

function Options(props){

  const { options, user, onOptionPress, mode } = props;
  const [page, setPage] = useState(0);

  function onScroll(event) {
    setPage(
      Math.round(event.nativeEvent.contentOffset.x / width),
    );
  }

  function scrollTo(value){
    scroll.scrollTo({x: width*(page+value)});
  }

  return(
    <>
      <ScrollView
        ref={ref => scroll = ref}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      >
        {
          options.map((option, index) =>
            <View key={index} style={styles.optionsContainer}>
              <CategoryCard
                category={option}
                onCategoryPress={onOptionPress}
                userProgress={user.progress[option.identifier]}
                mode={mode}
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
            onPress={() => scrollTo(-1, page)}>
            <Icon name='chevron-left' size={30} color='#555' />
          </TouchableOpacity>
        }
      </View>
      <View style={{...styles.navigationContainer, right: 0}}>
        {
          page != options.length -1 &&
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => scrollTo(1, page)}>
            <Icon name='chevron-right' size={30} color='#555' />
          </TouchableOpacity>
        }
      </View>
    </>
  )
}

export default Options;
