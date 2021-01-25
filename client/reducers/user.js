import faker from 'faker'
import produce from 'immer'
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
  Posts: Array.from(Array(2)).map(_ => ({ id: uuidv4() })),
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
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        draft.loginUserLoading = true;
        draft.loginUserDone = false;
        draft.loginUserError = null;
        break;
      case LOGIN_USER_SUCCESS:
        draft.currentUser = dummyUser;
        draft.message = action.message;
        draft.loginUserLoading = false;
        draft.loginUserDone = true;
        break;
      case LOGIN_USER_FAILURE:
        draft.message = action.message;
        draft.loginUserLoading = false;
        draft.loginUserError = action.error;
        break;
      case LOGOUT_USER_REQUEST:
        draft.logoutUserLoading = true;
        draft.logoutUserDone = false;
        draft.logoutUserError = null;
        break;
      case LOGOUT_USER_SUCCESS:
        draft.currentUser = {};
        draft.message = action.message;
        draft.logoutUserLoading = false;
        draft.logoutUserDone = true;
        break;
      case LOGOUT_USER_FAILURE:
        draft.message = action.message;
        draft.logoutUserLoading = false;
        draft.logoutUserError = action.error;
        break;
      case REGISTER_USER_REQUEST:
        draft.registerUserLoading = true;
        draft.registerUserDone = false;
        draft.registerUserError = null;
        break;
      case REGISTER_USER_SUCCESS:
        draft.message = action.message;
        draft.registerUserLoading = false;
        draft.registerUserDone = true;
        break;
      case REGISTER_USER_FAILURE:
        draft.message = action.message;
        draft.registerUserLoading = false;
        draft.registerUserError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.currentUser.Posts.unshift({ id: action.data.id })
        break;
      case REMOVE_POST_FROM_ME:
        const postIndex = draft.currentUser.Posts.findIndex((post) => post.id === action.data.id);
        draft.currentUser.Posts.splice(postIndex, 1);
        break;
      default:
        break;
    }
  })
}

export default userReducer;