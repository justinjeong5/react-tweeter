import produce from 'immer'

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  EDIT_USER_OF_POSTS,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
  RESET_POST_REDUX_STATE,
  CLEAR_POSTS_LIST,
} from './types'

const initialState = {
  postsList: [],
  singlePost: null,
  hasMorePost: true,

  loadPostsDone: false,
  loadPostsLoading: false,
  loadPostsError: null,
  loadPostDone: false,
  loadPostLoading: false,
  loadPostError: null,
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
  loadMyPostsDone: false,
  loadMyPostsLoading: false,
  loadMyPostsError: null,
}

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.postsList.push(...action.data.posts);
        draft.message = action.data.message;
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePost = action.data.posts.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.message = action.error.message;
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error.code;
        break;
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
        draft.postsList.unshift(action.data.post);
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
        const postIndex = draft.postsList.findIndex((post) => post.id === action.data.PostId);
        draft.postsList.splice(postIndex, 1);
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
      case ADD_COMMENT_SUCCESS: {
        const post = draft.postsList.find((post) => post.id === action.data.comment.PostId);
        post.Comments.unshift(action.data.comment);
        draft.message = action.data.message;
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
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
      case LIKE_POST_SUCCESS: {
        const post = draft.postsList.find(post => post.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId })
        draft.message = action.data.message;
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.message = action.error.message;
        draft.likePostLoading = false;
        draft.likePostError = action.error.code;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.postsList.find(post => post.id === action.data.PostId);
        const likerIndex = post.Likers.findIndex(liker => liker.id === action.data.UserId);
        post.Likers.splice(likerIndex, 1);
        draft.message = action.data.message;
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.message = action.error.message;
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error.code;
        break;
      case EDIT_USER_OF_POSTS:
        draft.postsList.forEach(post => {
          if (post.User.id === action.data.user.id) {
            post.User.nickname = action.data.user.nickname
            post.User.Image.src = action.data.user.Image.src
          }
          post.Comments.forEach(comment => {
            if (comment.User.id === action.data.user.id) {
              comment.User.nickname = action.data.user.nickname
              comment.User.Image.src = action.data.user.Image.src
            }
          })
          if (post.Retweet?.id === action.data.user.id) {
            post.Retweet.User.nickname = action.data.user.nickname
            post.Retweet.User.Image.src = action.data.user.Image.src
          }
        })
        break;
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.postsList.unshift(action.data.retweet)
        draft.message = action.data.message;
        draft.retweetLoading = false;
        draft.retweetDone = true;
        break;
      }
      case RETWEET_FAILURE:
        draft.message = action.error.message;
        draft.retweetLoading = false;
        draft.retweetError = action.error.postId;
        break;
      case RESET_POST_REDUX_STATE:
        draft.addPostDone = false;
        break;
      case CLEAR_POSTS_LIST:
        draft.postsList = [];
      default:
        break;
    }
  });
}

export default postReducer;