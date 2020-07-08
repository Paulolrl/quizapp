import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from './styles.js';
import { createUser } from '../../services/api.js';

function Signup(props){

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, []);

  function handleSignup(){
    if(password && email && name){
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          createUser({name, email})
            .then(() => {
              props.navigation.navigate('Home');
            })
            .catch(error => {
              setLoading(false);
              setError('Houve um erro, tente novamente');
            })
        })
        .catch(error => {
          setLoading(false)
          if (error.code === 'auth/email-already-in-use') {
            setError('Email já em uso')
          } else {
            setError('Houve um erro, tente novamente');
          }
        });
    }else {
      setError('Você deve preencher todos os campos');
    }

  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder={'Nome'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder={'Email'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={'Senha'}
        secureTextEntry={true}
      />
      {
        error &&
        <Text style={styles.errorText}>{error}</Text>
      }
      <TouchableOpacity
        onPress={handleSignup}
        style={styles.button}
        enabled={false}
      >
        {
          loading &&
          <ActivityIndicator color={'#555'} style={{position: 'absolute'}}/>
        }

        <Text style={{...styles.label, color: loading? 'transparent': '#555'}}>Criar</Text>

      </TouchableOpacity>

    </View>
  )

}

export default Signup;
