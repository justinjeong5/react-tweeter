import produce from 'immer'

import {
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
  RESET_POST_REDUX_STATE,
} from './types'

const initialState = {
  singlePost: null,
  hasMorePost: true,

  loadPostDone: false,
  loadPostLoading: false,
  loadPostError: null,
  editPostDone: false,
  editPostLoading: false,
  editPostError: null,
  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
  removePostDone: false,
  removePostLoading: false,
  removePostError: null,
  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
  likePostDone: false,
  likePostLoading: false,
  likePostError: null,
  unlikePostDone: false,
  unlikePostLoading: false,
  unlikePostError: null,
  retweetDone: false,
  retweetLoading: false,
  retweetError: null,
}

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.singlePost = action.data.post;
        draft.message = action.data.message;
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        break;
      case EDIT_POST_FAILURE:
        draft.message = action.error.message;
        draft.editPostLoading = false;
        draft.editPostError = action.error.code;
        break;
      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      case EDIT_POST_SUCCESS:
        draft.message = action.data.message;
        draft.editPostLoading = false;
        draft.editPostDone = true;
        break;
      case LOAD_POST_FAILURE:
        draft.message = action.error.message;
        draft.loadPostLoading = false;
        draft.loadPostError = action.error.code;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.message = action.data.message;
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.message = action.error.message;
        draft.addPostLoading = false;
        draft.addPostError = action.error.code;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.message = action.message;
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.message = action.message;
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.message = action.data.message;
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.message = action.error.message;
        draft.addCommentLoading = false;
        draft.addCommentError = action.error.code;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS:
        draft.message = action.data.message;
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      case LIKE_POST_FAILURE:
        draft.message = action.error.message;
        draft.likePostLoading = false;
        draft.likePostError = action.error.code;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS:
        draft.message = action.data.message;
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      case UNLIKE_POST_FAILURE:
        draft.message = action.error.message;
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error.code;
        break;
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS:
        draft.message = action.data.message;
        draft.retweetLoading = false;
        draft.retweetDone = true;
        break;
      case RETWEET_FAILURE:
        draft.message = action.error.message;
        draft.retweetLoading = false;
        draft.retweetError = action.error.postId;
        break;
      case RESET_POST_REDUX_STATE:
        draft.addPostDone = false;
        break;
      default:
        break;
    }
  });
}

export default postReducer;