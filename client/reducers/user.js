import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'
import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  ADD_POST_TO_ME, REMOVE_POST_FROM_ME,
} from './types'

const dummyUser = {
  id: 1,
  nickname: 'JustinJeong',
  Posts: Array.from(Array(2)).map(_ => ({ postId: uuidv4() })),
  Followers: Array.from(Array(6)).map(_ => ({ nickname: `${faker.name.firstName()} ${faker.name.lastName()}`, image: faker.image.people() })),
  Followings: Array.from(Array(4)).map(_ => ({ nickname: `${faker.name.firstName()} ${faker.name.lastName()}`, image: faker.image.people() }))
}

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
        currentUser: dummyUser,
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
    case ADD_POST_TO_ME:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          Posts: [{ postId: action.data.id }, ...state.currentUser.Posts]
        }
      }
    case REMOVE_POST_FROM_ME:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          Posts: state.currentUser.Posts.filter((post) => (post.id !== action.data.id))
        }
      }
    default:
      return state;
  }
}

export default userReducer;