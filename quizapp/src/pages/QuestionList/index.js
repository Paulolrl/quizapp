import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { updateUserProgress } from '../../actions';
import { styles } from './styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

function QuestionList(props){

  const { category } = props.route.params;
  const progress = props.user.progress[category.identifier];

  function color(index, progress){
    if(index == progress)
      return '#555';
    if(index > progress)
      return '#ccc';
    return 'green';
  }

  function handlePress(index){
    if(index <= progress)
      props.navigation.navigate('Question', {category, index});
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name={'chevron-left'} size={35} color='#555'/>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name.pt}</Text>
        </View>
      </View>
      <FlatList
        data={[...Array(category.count).keys()]}
        renderItem={(i) => (
          <TouchableOpacity
            onPress={() => handlePress(i.item)}
            style={{...styles.button,
                borderColor: color(i.item, progress)}}
          >
            <Text style={{color: color(i.item, progress)}}>Questão: {i.item+1}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(i) => i}
      />
    </>
  );
}

const mapStateToProps = store => ({
  user: store.user
});

export default connect(mapStateToProps)(QuestionList);
