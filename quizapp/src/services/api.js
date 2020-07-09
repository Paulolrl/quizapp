import auth from '@react-native-firebase/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.29:5000/'
});

async function getHeaders(){
  let token = await auth().currentUser.getIdToken(false);
  return { 'headers': {
    'Content-Type': 'application/json',
    'Authorization': token
  }}
}

export async function getCategories(){
  let headers = await getHeaders();
  let res = await api.get('quiz/categories', headers).catch(e => console.log('categories:', e));
  return res.data;
}

export async function getUser(){
  let headers = await getHeaders();
  let res = await api.get('user', headers).catch(e => console.log('user:', e));
  return res.data;
}

export async function getQuestions(filters){
  let headers = await getHeaders();
  let res = await api.post('quiz/questions', filters, headers).catch(e => console.log('questions:', e));
  return res.data;
}

export async function updateQuestion(body){
  let headers = await getHeaders();
  let res = await api.post('quiz/questions/update', body, headers).catch(e => console.log('update questions:', e));
  return res.data;
}

export async function createUser(body){
  let headers = await getHeaders();
  let res = await api.post('user/create', body, headers).catch(e => console.log('create user:', e));
  return res.data;
}
