import produce from 'immer'

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE,
  LOAD_FOLLOWER_POSTS_REQUEST, LOAD_FOLLOWER_POSTS_SUCCESS, LOAD_FOLLOWER_POSTS_FAILURE,
  LOAD_FOLLOWING_POSTS_REQUEST, LOAD_FOLLOWING_POSTS_SUCCESS, LOAD_FOLLOWING_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
  EDIT_USER_OF_POSTS,
  CLEAR_POSTS_LIST,
  ADD_POST_TO_POSTS_LIST,
  REMOVE_POST_FROM_POSTS_LIST,
  ADD_COMMENT_TO_POSTS_LIST,
  ADD_LIKE_TO_POSTS_LIST,
  REMOVE_LIKE_FROM_POSTS_LIST,
  ADD_TWEET_TO_POSTS_LIST,
} from './types'

const initialState = {
  postsList: [],
  hasMorePost: true,

  loadPostsDone: false,
  loadPostsLoading: false,
  loadPostsError: null,
}

const postsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_FOLLOWER_POSTS_REQUEST:
      case LOAD_FOLLOWING_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_FOLLOWER_POSTS_SUCCESS:
      case LOAD_FOLLOWING_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.postsList.push(...action.data.posts);
        draft.message = action.data.message;
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePost = action.data.posts.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_FOLLOWER_POSTS_FAILURE:
      case LOAD_FOLLOWING_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
        draft.message = action.error.message;
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error.code;
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
      case CLEAR_POSTS_LIST:
        draft.postsList = [];
        break;
      case ADD_POST_TO_POSTS_LIST:
        draft.postsList.unshift(action.data.post);
        break;
      case REMOVE_POST_FROM_POSTS_LIST: {
        const postIndex = draft.postsList.findIndex((post) => post.id === action.data.PostId);
        draft.postsList.splice(postIndex, 1);
        break;
      }
      case ADD_COMMENT_TO_POSTS_LIST: {
        const post = draft.postsList.find((post) => post.id === action.data.comment.PostId);
        post.Comments.unshift(action.data.comment);
        break;
      }
      case ADD_LIKE_TO_POSTS_LIST: {
        const post = draft.postsList.find(post => post.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId })
        break;
      }
      case REMOVE_LIKE_FROM_POSTS_LIST: {
        const post = draft.postsList.find(post => post.id === action.data.PostId);
        const likerIndex = post.Likers.findIndex(liker => liker.id === action.data.UserId);
        post.Likers.splice(likerIndex, 1);
        break;
      }
      case ADD_TWEET_TO_POSTS_LIST:
        draft.postsList.unshift(action.data.retweet)
        break;
      default:
        break;
    }
  });
}

export default postsReducer;