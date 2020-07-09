import { SET_USER } from '../actions';

const initialState = {
  name: 'TESTE',
  email: 'teste@teste.com',
  progress: {}
}

export const userReducer = (state = initialState, action) => {
  console.log('no reducer');
  switch(action.type){
    case SET_USER:
      console.log('entrou no caso certo');
      return action.user;
    default: {
      return state;
    }
  }
}
