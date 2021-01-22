import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types'

const initialState = {
  currentUser: {},

  userLogin: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
        userLogin: true
      }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        userLogin: false,
      }
    case REGISTER_USER:
      return {
        ...state,
        currentUser: {}
      }
    default:
      return state;
  }
}

export default userReducer;