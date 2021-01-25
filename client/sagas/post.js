import { all, put, fork, takeLatest, delay, takeLeading } from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid'
import { generateDummyPost } from "../reducers/post";

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  ADD_POST_TO_ME, REMOVE_POST_FROM_ME,
} from '../reducers/types'

function loadPostsAPI(data) {
  return axios.get('/api/posts')
}

function* loadPosts(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(loadPostsAPI, action.data)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: error.response.data
    })
  }
}

function addPostAPI(data) {
  return axios.post('/api/addPost', data)
}

function* addPost(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(addPostAPI, action.data)
    const id = uuidv4();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data.content
      }
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: {
        id
      }
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data
    })
  }
}

function removePostAPI(data) {
  return axios.post('/api/removePost', data)
}

function* removePost(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(removePostAPI, action.data)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: {
        id: action.data.id,
      }
    })
    yield put({
      type: REMOVE_POST_FROM_ME,
      data: {
        id: action.data.id,
      }
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data
    })
  }
}

function addCommentAPI(data) {
  return axios.post('/api/addComment', data)
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data
    })
  }
}

function* watchLoadPosts() {
  yield takeLeading(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}



export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ])
}