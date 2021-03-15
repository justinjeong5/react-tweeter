import { all, put, fork, call, throttle } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE,
  LOAD_FOLLOWER_POSTS_REQUEST, LOAD_FOLLOWER_POSTS_SUCCESS, LOAD_FOLLOWER_POSTS_FAILURE,
  LOAD_FOLLOWING_POSTS_REQUEST, LOAD_FOLLOWING_POSTS_SUCCESS, LOAD_FOLLOWING_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
} from '../reducers/types';

function loadPostsAPI(data) {
  return axios.get(`/api/posts?lastId=${data.lastId}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadUserPostsAPI(data) {
  return axios.get(`/api/posts/user/${data.userId}?lastId=${data.lastId}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadFollowerPostsAPI(data) {
  return axios.get(`/api/posts/follower?lastId=${data.lastId}`);
}

function* loadFollowerPosts(action) {
  try {
    const result = yield call(loadFollowerPostsAPI, action.data);
    console.log(result, 'loadFollowerPostsAPI loadFollowerPostsAPI');
    yield put({
      type: LOAD_FOLLOWER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWER_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadFollowingPostsAPI(data) {
  return axios.get(`/api/posts/following?lastId=${data.lastId}`);
}

function* loadFollowingPosts(action) {
  try {
    const result = yield call(loadFollowingPostsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWING_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWING_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadHashtagPostsAPI(data) {
  return axios.get(`/api/hashtag/${encodeURI(data.hashtag)}?lastId=${data.lastId}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(1000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadUserPosts() {
  yield throttle(1000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadFollowerPosts() {
  yield throttle(1000, LOAD_FOLLOWER_POSTS_REQUEST, loadFollowerPosts);
}

function* watchLoadFollowingPosts() {
  yield throttle(1000, LOAD_FOLLOWING_POSTS_REQUEST, loadFollowingPosts);
}

function* watchLoadHashtagPosts() {
  yield throttle(1000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadFollowerPosts),
    fork(watchLoadFollowingPosts),
    fork(watchLoadHashtagPosts),
  ]);
}
