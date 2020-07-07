import auth from '@react-native-firebase/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.29:5000/'
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
  let res = await api.get('quizz/categories', headers).catch(e => console.log('categories:', e));
  return res.data;
}
