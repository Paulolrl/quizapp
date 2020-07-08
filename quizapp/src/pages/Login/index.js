import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from './styles.js';

function Login(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function onAuthStateChanged(user) {
    if(user)
      props.navigation.navigate('Home')
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function handleLogin(){
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.navigation.navigate('Home')
      })
      .catch(error => {
        setError(true);
      });
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Login</Text>
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
        placeholder={'password'}
        secureTextEntry={true}
      />
      {
        error &&
        <Text style={styles.errorText}>Usuário ou senha inválido</Text>
      }
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Signup')}
          style={styles.button}
        >
          <Text style={styles.label}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          style={{...styles.button, marginLeft: 10}}
        >
          <Text style={styles.label}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

export default Login;
