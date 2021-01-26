import faker from 'faker'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'
import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  ADD_POST_TO_ME, REMOVE_POST_FROM_ME,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
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
  followDone: false,
  followLoading: false,
  followError: null,
  unfollowDone: false,
  unfollowLoading: false,
  unfollowError: null,
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
        draft.message = action.data.message;
        draft.registerUserLoading = false;
        draft.registerUserDone = true;
        break;
      case REGISTER_USER_FAILURE:
        draft.message = action.error.message;
        draft.registerUserLoading = false;
        draft.registerUserError = action.error.code;
        break;
      case ADD_POST_TO_ME:
        draft.currentUser.Posts.unshift({ id: action.data.id })
        break;
      case REMOVE_POST_FROM_ME:
        const postIndex = draft.currentUser.Posts.findIndex((post) => post.id === action.data.id);
        draft.currentUser.Posts.splice(postIndex, 1);
        break;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.currentUser.Followings.push({ id: action.data.userTo })
        draft.message = action.message;
        draft.followLoading = false;
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.message = action.message;
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        const followIndex = draft.currentUser.Followings.findIndex((follow => follow.id === action.data.userTo))
        draft.currentUser.Followings.splice(followIndex, 1)
        draft.message = action.message;
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.message = action.message;
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      default:
        break;
    }
  })
}

export default userReducer;