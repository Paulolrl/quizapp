export const SET_USER = 'SET_USER';
export const UPDATE_USER_PROGRESS = 'UPDATE_USER_PROGRESS';

export const setUser = (user) => {
  return{
    type: SET_USER,
    user
  }
}

export const updateUserProgress = (category, level) => {
  return{
    type: UPDATE_USER_PROGRESS,
    category,
    level
  }
}
