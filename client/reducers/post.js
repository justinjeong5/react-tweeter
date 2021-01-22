import faker from 'faker'
import { ADD_POST } from './types'

const dummyPost = {
  id: faker.random.number(),
  User: {
    id: faker.random.number(),
    nickname: faker.name.firstName(),
  },
  content: faker.lorem.sentence(),
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
  postAddon: false,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsList: [dummyPost, ...state.postsList]
      }
    default:
      return state;
  }
}

export default postReducer;