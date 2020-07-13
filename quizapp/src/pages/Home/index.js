import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { getCategories } from '../../services/api.js';
import TabNavigator from '../../components/TabNavigator';
import Options from '../../components/Options';
import { styles } from './styles.js';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');


let scroll;


function Home(props){

  const [categories, setCategories] = useState([]);
  const [gameModes, setGameModes] = useState([]);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState('NORMAL');

  useEffect(() => {
    async function getOptions(){
      setGameModes([{
          identifier: 'RANDOM',
          name: {pt: 'Aleatório'},
          color: '#ddd'
        },
        {
          identifier: 'MILIONAIRE',
          name: {pt: 'Quem quer ser um endinheirado?'},
          color: '#2686fc'
        },
        {
          identifier: 'WYRATHER',
          name: {pt: 'Would you rather?'},
          color: '#e586fc'
        }
      ]);
      let res = await getCategories();
      setCategories(res);
    }
    getOptions();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [mode]);

  function handleCategoryPress(category){
    props.navigation.navigate('Question', {category})
  }


  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Quiiizzzz!!</Text>
      </View>
      <View style={styles.scrollViewContainer}>
       {
         mode == 'OTHERS' &&
         <Options
           options={gameModes}
           onOptionPress={handleCategoryPress}
           mode={mode}
           user={props.user}
         />
       }
       {
         mode == 'NORMAL' &&
         <Options
           options={categories}
           onOptionPress={handleCategoryPress}
           mode={mode}
           user={props.user}
         />
       }
      </View>
      <View style={styles.bottomContainer}>
        <TabNavigator
          tabs={[{name: 'Por Categoria', value: 'NORMAL'}, {name: 'Outros Modos', value: 'OTHERS'}]}
          onTabPress={(tab) => setMode(tab.value)}
          color={'#555'}
          selected={mode}
        />
      </View>
    </View>
  )

}

const mapStateToProps = store => ({
  user: store.user
});

export default connect(mapStateToProps)(Home);
