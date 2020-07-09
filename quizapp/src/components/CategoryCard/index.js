import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles.js';

function CategoryCard(props){

  const { category, userProgress, mode } = props;

  return(
    <TouchableOpacity
      style={{...styles.card, backgroundColor: category.color}}
      onPress={() => props.onCategoryPress(category)}>
      <Text style={styles.title}>{category.name.pt}</Text>
      {
        mode == 'NORMAL' &&
        <Text>{userProgress + '/' + category.count}</Text>
      }
    </TouchableOpacity>
  )
}

export default CategoryCard;
