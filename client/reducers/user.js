/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';
import {
  LOAD_CURRENT_USER_REQUEST, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE,
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
  LOAD_POST_USER_REQUEST, LOAD_POST_USER_SUCCESS, LOAD_POST_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
  ADD_POST_TO_ME, REMOVE_POST_FROM_ME,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  BLOCK_FOLLOW_REQUEST, BLOCK_FOLLOW_SUCCESS, BLOCK_FOLLOW_FAILURE,
  GET_FOLLOW_REQUEST, GET_FOLLOW_SUCCESS, GET_FOLLOW_FAILURE,
  RESET_USER_REDUX_STATE,
} from './types';

const initialState = {
  currentUser: {},
  otherUser: {},

  message: '',
  loadCurrentUserDone: false,
  loadCurrentUserLoading: false,
  loadCurrentUserError: null,
  loadUserDone: false,
  loadUserLoading: false,
  loadUserError: null,
  loginUserDone: false,
  loginUserLoading: false,
  loginUserError: null,
  logoutUserDone: false,
  logoutUserLoading: false,
  logoutUserError: null,
  registerUserDone: false,
  registerUserLoading: false,
  registerUserError: null,
  editUserDone: false,
  editUserLoading: false,
  editUserError: null,
  followDone: false,
  followLoading: false,
  followError: null,
  unfollowDone: false,
  unfollowLoading: false,
  unfollowError: null,
  blockFollowDone: false,
  blockFollowLoading: false,
  blockFollowError: null,
  getFollowDone: false,
  getFollowLoading: false,
  getFollowError: null,
};

const userReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_CURRENT_USER_REQUEST:
      draft.getFollowDone = false;
      draft.loadCurrentUserLoading = true;
      draft.loadCurrentUserDone = false;
      draft.loadCurrentUserError = null;
      break;
    case LOAD_CURRENT_USER_SUCCESS:
      draft.registerUserDone = false;
      draft.currentUser = action.data.user;
      draft.message = action.data.message;
      draft.loadCurrentUserLoading = false;
      draft.loadCurrentUserDone = true;
      break;
    case LOAD_CURRENT_USER_FAILURE:
      draft.message = action.error.message;
      draft.loadCurrentUserLoading = false;
      draft.loadCurrentUserError = action.error.code;
      break;
    case LOAD_USER_REQUEST:
    case LOAD_POST_USER_REQUEST:
      draft.loadUserLoading = true;
      draft.loadUserDone = false;
      draft.loadUserError = null;
      break;
    case LOAD_USER_SUCCESS:
    case LOAD_POST_USER_SUCCESS:
      draft.otherUser = action.data.user;
      draft.message = action.data.message;
      draft.loadUserLoading = false;
      draft.loadUserDone = true;
      break;
    case LOAD_USER_FAILURE:
    case LOAD_POST_USER_FAILURE:
      draft.message = action.error.message;
      draft.loadUserLoading = false;
      draft.loadUserError = action.error.code;
      break;
    case LOGIN_USER_REQUEST:
      draft.loginUserLoading = true;
      draft.loginUserDone = false;
      draft.loginUserError = null;
      break;
    case LOGIN_USER_SUCCESS:
      draft.currentUser = action.data.user;
      draft.message = action.data.message;
      draft.loginUserLoading = false;
      draft.loginUserDone = true;
      break;
    case LOGIN_USER_FAILURE:
      draft.message = action.error.message;
      draft.loginUserLoading = false;
      draft.loginUserError = action.error.code;
      break;
    case LOGOUT_USER_REQUEST:
      draft.logoutUserLoading = true;
      draft.logoutUserDone = false;
      draft.logoutUserError = null;
      draft.loginUserDone = false;
      draft.registerUserDone = false;
      break;
    case LOGOUT_USER_SUCCESS:
      draft.currentUser = {};
      draft.message = action.data.message;
      draft.logoutUserLoading = false;
      draft.logoutUserDone = true;
      break;
    case LOGOUT_USER_FAILURE:
      draft.message = action.error.message;
      draft.logoutUserLoading = false;
      draft.logoutUserError = action.error.code;
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
    case EDIT_USER_REQUEST:
      draft.editUserLoading = true;
      draft.editUserDone = false;
      draft.editUserError = null;
      break;
    case EDIT_USER_SUCCESS:
      draft.currentUser = action.data.user;
      draft.message = action.data.message;
      draft.editUserLoading = false;
      draft.editUserDone = true;
      break;
    case EDIT_USER_FAILURE:
      draft.message = action.error.message;
      draft.editUserLoading = false;
      draft.editUserError = action.error.code;
      break;
    case ADD_POST_TO_ME:
      draft.currentUser.Posts.unshift({ id: action.data.id });
      break;
    case REMOVE_POST_FROM_ME: {
      const postIndex = draft.currentUser.Posts
        .findIndex((post) => post.id === action.data.PostId);
      draft.currentUser.Posts.splice(postIndex, 1);
      break;
    }
    case FOLLOW_REQUEST:
      draft.followLoading = action.data.userId;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.currentUser.Followings.push({ id: action.data.UserId });
      draft.message = action.data.message;
      draft.followLoading = false;
      draft.followDone = true;
      break;
    case FOLLOW_FAILURE:
      draft.message = action.error.message;
      draft.followLoading = false;
      draft.followError = action.error.code;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = action.data.userId;
      draft.unfollowDone = false;
      draft.unfollowError = null;
      break;
    case UNFOLLOW_SUCCESS: {
      const followIndex = draft.currentUser.Followings
        .findIndex(((follow) => follow.id === action.data.UserId));
      draft.currentUser.Followings.splice(followIndex, 1);
      draft.message = action.data.message;
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      break;
    }
    case UNFOLLOW_FAILURE:
      draft.message = action.error.message;
      draft.unfollowLoading = false;
      draft.unfollowError = action.error.code;
      break;
    case BLOCK_FOLLOW_REQUEST:
      draft.blockFollowLoading = true;
      draft.blockFollowDone = false;
      draft.blockFollowError = null;
      break;
    case BLOCK_FOLLOW_SUCCESS: {
      const followIndex = draft.currentUser.Followers
        .findIndex(((follow) => follow.id === action.data.UserId));
      draft.currentUser.Followers.splice(followIndex, 1);
      draft.message = action.data.message;
      draft.blockFollowLoading = false;
      draft.blockFollowDone = true;
      break;
    }
    case BLOCK_FOLLOW_FAILURE:
      draft.message = action.error.message;
      draft.blockFollowLoading = false;
      draft.blockFollowError = action.error.code;
      break;
    case GET_FOLLOW_REQUEST:
      draft.getFollowLoading = true;
      draft.getFollowDone = false;
      draft.getFollowError = null;
      break;
    case GET_FOLLOW_SUCCESS:
      draft.currentUser.Followings = action.data.followings;
      draft.currentUser.Followers = action.data.followers;
      draft.message = action.data.message;
      draft.getFollowLoading = false;
      draft.getFollowDone = true;
      break;
    case GET_FOLLOW_FAILURE:
      draft.message = action.error.message;
      draft.getFollowLoading = false;
      draft.getFollowError = action.error.code;
      break;
    case RESET_USER_REDUX_STATE:
      draft.editUserDone = false;
      break;
    default:
      break;
  }
});

export default userReducer;
