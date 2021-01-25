import faker from 'faker'
import produce from 'immer'

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
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.postsList.unshift(dummyPost(action.data));
        draft.message = action.message;
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.message = action.message;
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        const postIndex = draft.postsList.findIndex((post) => post.id === action.data.id);
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
        const post = draft.postsList.find((post) => post.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.comment));
        draft.message = action.message;
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.message = action.message;
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
}

export default postReducer;