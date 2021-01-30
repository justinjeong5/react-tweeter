import { all, put, fork, call, takeLatest } from "redux-saga/effects";
import axios from 'axios';

import {
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  ADD_POST_TO_ME, REMOVE_POST_FROM_ME,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
  CLEAR_IMAGE_FROM_PATHS,
  ADD_POST_TO_POSTS_LIST,
  REMOVE_POST_FROM_POSTS_LIST,
  EDIT_POST_OF_POSTS_LIST,
  ADD_COMMENT_TO_POSTS_LIST,
  ADD_LIKE_TO_POSTS_LIST,
  REMOVE_LIKE_FROM_POSTS_LIST,
  ADD_TWEET_TO_POSTS_LIST,
} from '../reducers/types'

function loadPostAPI(data) {
  return axios.get(`/api/post/${data.postId}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_POST_FAILURE,
      error: error.response.data
    })
  }
}

function editPostAPI(data) {
  return axios.patch(`/api/post/${data.postId}`, data);
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data)
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    })
    yield put({
      type: EDIT_POST_OF_POSTS_LIST,
      data: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: EDIT_POST_FAILURE,
      error: error.response.data
    })
  }
}

function addPostAPI(data) {
  return axios.post('/api/post/post', data)
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    })
    yield put({
      type: ADD_POST_TO_POSTS_LIST,
      data: result.data
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data
    })
    yield put({
      type: CLEAR_IMAGE_FROM_PATHS
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data
    })
  }
}

function removePostAPI(data) {
  return axios.delete(`/api/post/${data.postId}`)
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    })
    yield put({
      type: REMOVE_POST_FROM_ME,
      data: result.data,
    })
    yield put({
      type: REMOVE_POST_FROM_POSTS_LIST,
      data: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data
    })
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data)
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    })
    yield put({
      type: ADD_COMMENT_TO_POSTS_LIST,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data
    })
  }
}

function likePostAPI(data) {
  return axios.patch(`/api/post/${data.postId}/like`)
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    })
    yield put({
      type: ADD_LIKE_TO_POSTS_LIST,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data
    })
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/api/post/${data.postId}/like`)
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    })
    yield put({
      type: REMOVE_LIKE_FROM_POSTS_LIST,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: error.response.data
    })
  }
}

function retweetAPI(data) {
  return axios.post(`/api/post/${data.postId}/retweet`, data)
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data)
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data
    })
    yield put({
      type: ADD_TWEET_TO_POSTS_LIST,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: RETWEET_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost)
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

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet)
}


export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchEditPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
  ])
}