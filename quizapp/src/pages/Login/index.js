import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from './styles.js';
import { getUser } from '../../services/api.js';
import TouchableWithLoading from '../../components/TouchableWithLoading';

function Login(props){

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function onAuthStateChanged(user) {
    if(user)
      getUserAndContinue();
  }

  async function getUserAndContinue(){
    try{
      let user = await getUser();
      console.log('user:', user);
      props.navigation.navigate('Home');
    }catch(e){
      setError('Erro ao buscar usuário')
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function handleLogin(){
    setLoading(true);
    if(email && password)
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('funcionou!');
        })
        .catch(error => {
          setError('Usuário ou senha inválido');
          setLoading(false);
        });
    else{
      setError('Preencha a senha e email');
      setLoading(false)
    }
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
        <Text style={styles.errorText}>{error}</Text>
      }
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Signup')}
          style={{...styles.button, marginRight: 10}}
        >
          <Text style={styles.label}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableWithLoading
          loading={loading}
          color={'#555'}
          label={'Entrar'}
          onPress={handleLogin}
        />
      </View>
    </View>
  )

}

export default Login;
