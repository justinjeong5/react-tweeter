import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from './types'

const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: 'JustinJeong',
  },
  content: data.content,
  Images: Array.from(Array(3)).map(_ => ({ src: faker.image.imageUrl() })),
  Comments: Array.from(Array(2)).map(_ => (dummyComment(faker.lorem.sentence()))),
})

const dummyComment = (comment) => ({
  User: {
    id: faker.random.number(),
    nickname: faker.name.firstName(),
  },
  content: comment,
})

const initialState = {
  postsList: Array.from(Array(3)).map(_ => (dummyPost({ id: uuidv4(), content: faker.lorem.sentences() }))),
  imagePaths: [],

  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
  removePostDone: false,
  removePostLoading: false,
  removePostError: null,
  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        postsList: [dummyPost(action.data), ...state.postsList],
        message: action.message,
        addPostLoading: false,
        addPostDone: true,
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        message: action.message,
        addPostLoading: false,
        addPostError: action.error,
      }
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      }
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        postsList: state.postsList.filter((post) => (post.id !== action.data.id)),
        message: action.message,
        removePostLoading: false,
        removePostDone: true,
      }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        message: action.message,
        removePostLoading: false,
        removePostError: action.error,
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.postsList.findIndex((v) => v.id === action.data.postId);
      const post = state.postsList[postIndex];
      post.Comments = [dummyComment(action.data.comment), ...post.Comments];
      const postsList = [...state.postsList];
      postsList[postIndex] = post
      return {
        ...state,
        postsList,
        message: action.message,
        addCommentLoading: false,
        addCommentDone: true,
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        message: action.message,
        addCommentLoading: false,
        addCommentError: action.error,
      }
    default:
      return state;
  }
}

export default postReducer;