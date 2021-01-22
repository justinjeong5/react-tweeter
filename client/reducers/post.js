import faker from 'faker'

const initialState = {
  postsList: Array.from(Array(3)).map(_ => ({
    id: faker.random.number(),
    User: {
      id: faker.random.number(),
      nickname: faker.name.firstName(),
    },
    content: faker.lorem.sentence(),
    Images: [Array.from(Array(3)).map(_ => ({ src: faker.image.imageUrl() }))],
    Comments: [{
      User: {
        id: faker.random.number(),
        nickname: faker.name.firstName(),
      },
      content: faker.lorem.sentences(),
    }],
  })),
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default postReducer;