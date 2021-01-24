import faker from 'faker'
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE
} from './types'

const dummyPost = {
  id: faker.random.number(),
  User: {
    id: faker.random.number(),
    nickname: faker.name.firstName(),
  },
  content: `#해시태그1 ##해시태그2#해시태그3 ### \n ${faker.lorem.sentences()}`,
  Images: Array.from(Array(3)).map(_ => ({ src: faker.image.imageUrl() })),
  Comments: [{
    User: {
      id: faker.random.number(),
      nickname: faker.name.firstName(),
    },
    content: faker.lorem.sentences(),
  }],
}

const initialState = {
  postsList: Array.from(Array(3)).map(_ => (dummyPost)),
  imagePaths: [],

  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
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
        postsList: [action.data, ...state.postsList],
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
    default:
      return state;
  }
}

export default postReducer;