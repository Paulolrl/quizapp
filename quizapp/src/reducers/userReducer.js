import { SET_USER, SET_PARTICIPANT_IN_CONGRESS } from '../actions/userActions';

const initialState = {
  name: 'TESTE',
  email: 'teste@teste.com',
  progress: {}
}

export const userReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_USER:
      return { ...state, ...action.user};
    default: {
      return state;
    }
  }
}
