import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
} from './types'

const initialState = {
  currentUser: {},

  message: '',
  loginUserDone: false,
  loginUserLoading: false,
  loginUserError: null,
  logoutUserDone: false,
  logoutUserLoading: false,
  logoutUserError: null,
  registerUserDone: false,
  registerUserLoading: false,
  registerUserError: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginUserLoading: true,
        loginUserDone: false,
        loginUserError: null,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.data,
        message: action.message,
        loginUserLoading: false,
        loginUserDone: true,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        message: action.message,
        loginUserLoading: false,
        loginUserError: action.error,
      }
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        logoutUserLoading: true,
        logoutUserDone: false,
        logoutUserError: null,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {},
        message: action.message,
        logoutUserLoading: false,
        logoutUserDone: true,
      }
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        message: action.message,
        logoutUserLoading: false,
        logoutUserError: action.error,
      }
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerUserLoading: true,
        registerUserDone: false,
        registerUserError: null,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
        registerUserLoading: false,
        registerUserDone: true,
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        message: action.message,
        registerUserLoading: false,
        registerUserError: action.error,
      }
    default:
      return state;
  }
}

export default userReducer;