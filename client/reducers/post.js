import produce from 'immer'

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  EDIT_USER_OF_POSTS,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  REMOVE_IMAGE_FROM_PATHS,
  CLEAR_IMAGE_FROM_PATHS,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
  REMOVE_IMAGE_FROM_PATH,
} from './types'

const initialState = {
  postsList: [],
  imagePaths: [],
  imagePath: null,
  hasMorePost: true,

  loadPostsDone: false,
  loadPostsLoading: false,
  loadPostsError: null,
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
  uploadImagesDone: false,
  uploadImagesLoading: false,
  uploadImagesError: null,
  uploadImageDone: false,
  uploadImageLoading: false,
  uploadImageError: null,
  retweetDone: false,
  retweetLoading: false,
  retweetError: null,
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
          }
        })
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths.push(...action.data.images);
        draft.message = action.data.message;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGE_FAILURE:
        draft.message = action.error.message;
        draft.uploadImageLoading = false;
        draft.uploadImageError = action.error.code;
        break;
      case UPLOAD_IMAGE_REQUEST:
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        draft.uploadImageError = null;
        break;
      case UPLOAD_IMAGE_SUCCESS: {
        draft.imagePath = action.data.image;
        draft.message = action.data.message;
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.message = action.error.message;
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error.code;
        break;
      case REMOVE_IMAGE_FROM_PATHS:
        draft.imagePaths.splice(action.data, 1);
        break;
      case CLEAR_IMAGE_FROM_PATHS:
        draft.imagePaths = [];
        break;
      case REMOVE_IMAGE_FROM_PATH:
        draft.imagePath = null;
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
      default:
        break;
    }
  });
}

export default postReducer;