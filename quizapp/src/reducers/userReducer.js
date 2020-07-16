import { SET_USER, UPDATE_USER_PROGRESS } from '../actions';

const initialState = {progress: {}}

export const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case SET_USER:
      newState = {...action.user};
      newState.progress = {...newState['progress'], ...state['progress']}
      return newState;
    case UPDATE_USER_PROGRESS:
      newState = {...state};
      newState.progress[action.category] = action.level;
      return newState;
    default: {
      return state;
    }
  }
}
