import faker from 'faker'
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from './types'

const dummyPost = (data) => ({
  id: faker.random.number(),
  User: {
    id: 1,
    nickname: 'JustinJeong',
  },
  content: data,
  Images: Array.from(Array(3)).map(_ => ({ src: faker.image.imageUrl() })),
  Comments: [{
    User: {
      id: faker.random.number(),
      nickname: faker.name.firstName(),
    },
    content: faker.lorem.sentences(),
  }],
})

const dummyComment = (payload) => ({
  User: {
    id: faker.random.number(),
    nickname: faker.name.firstName(),
  },
  content: payload.comment,
})

const initialState = {
  postsList: Array.from(Array(3)).map(_ => (dummyPost(faker.lorem.sentences()))),
  imagePaths: [],

  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
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
        postsList: [dummyPost(action.data.content), ...state.postsList],
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
      post.Comments = [dummyComment(action.data), ...post.Comments];
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