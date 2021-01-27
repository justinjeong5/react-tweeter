import { all, put, fork, call, takeLatest, delay, takeLeading } from "redux-saga/effects";
import axios from 'axios';

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  ADD_POST_TO_ME, REMOVE_POST_FROM_ME,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  CLEAR_IMAGE_FROM_PATHS,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
} from '../reducers/types'

function loadPostsAPI(data) {
  return axios.get(`/api/post/posts?lastId=${data.lastId}`)
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_POSTS_FAILURE,
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
  } catch (error) {
    console.error(error)
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: error.response.data
    })
  }
}

function uploadImagesAPI(data) {
  return axios.post('/api/image/images', data)    // FormData should not be wrapped by {}, which makes FormData into plain JSON object.
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
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
  } catch (error) {
    console.error(error)
    yield put({
      type: RETWEET_FAILURE,
      error: error.response.data
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

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet)
}


export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
  ])
}