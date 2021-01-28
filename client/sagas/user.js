import { all, put, fork, call, takeLatest, delay } from "redux-saga/effects";
import axios from 'axios';

import {
  LOAD_CURRENT_USER_REQUEST, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  EDIT_USER_OF_POSTS,
  BLOCK_FOLLOW_REQUEST, BLOCK_FOLLOW_SUCCESS, BLOCK_FOLLOW_FAILURE,
  GET_FOLLOW_REQUEST, GET_FOLLOW_SUCCESS, GET_FOLLOW_FAILURE,
} from '../reducers/types'


function loadCurrentUserAPI() {
  return axios.get('/api/user/')
}

function* loadCurrentUser() {
  try {
    const result = yield call(loadCurrentUserAPI)
    yield put({
      type: LOAD_CURRENT_USER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_CURRENT_USER_FAILURE,
      error: error.response.data
    })
  }
}

function loginAPI(payload) {
  return axios.post('/api/user/login', payload)
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload)
    yield put({
      type: LOGIN_USER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      error: error.response.data
    })
  }
}

function logoutAPI() {
  return axios.post('/api/user/logout')
}

function* logout() {
  try {
    const result = yield call(logoutAPI)
    yield put({
      type: LOGOUT_USER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGOUT_USER_FAILURE,
      error: error.response.data
    })
  }
}

function registerAPI(data) {
  return axios.post('/api/user/register', data)
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.data)
    yield put({
      type: REGISTER_USER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REGISTER_USER_FAILURE,
      error: error.response.data
    })
  }
}

function editAPI(data) {
  return axios.patch('/api/user/', data)
}

function* edit(action) {
  try {
    const result = yield call(editAPI, action.data)
    yield put({
      type: EDIT_USER_SUCCESS,
      data: result.data
    })
    yield put({
      type: EDIT_USER_OF_POSTS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: EDIT_USER_FAILURE,
      error: error.response.data
    })
  }
}

function followAPI(data) {
  return axios.patch(`/api/user/${data.userId}/follow`)
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data)
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data
    })
  }
}

function unfollowAPI(data) {
  return axios.delete(`/api/user/${data.userId}/follow`)
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data
    })
  }
}

function blockFollowAPI(data) {
  return axios.delete(`/api/user/follow/${data.userId}`)
}

function* blockFollow(action) {
  try {
    const result = yield call(blockFollowAPI, action.data)
    yield put({
      type: BLOCK_FOLLOW_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: BLOCK_FOLLOW_FAILURE,
      error: error.response.data
    })
  }
}

function getFollowAPI() {
  return axios.get(`/api/user/follow`)
}

function* getFollow() {
  try {
    const result = yield call(getFollowAPI)
    yield put({
      type: GET_FOLLOW_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: GET_FOLLOW_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLoadCurrentUser() {
  yield takeLatest(LOAD_CURRENT_USER_REQUEST, loadCurrentUser)
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, login)
}

function* watchLogout() {
  yield takeLatest(LOGOUT_USER_REQUEST, logout)
}

function* watchRegister() {
  yield takeLatest(REGISTER_USER_REQUEST, register)
}

function* watchEdit() {
  yield takeLatest(EDIT_USER_REQUEST, edit)
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

function* watchBlockFollow() {
  yield takeLatest(BLOCK_FOLLOW_REQUEST, blockFollow)
}

function* watchGetFollow() {
  yield takeLatest(GET_FOLLOW_REQUEST, getFollow)
}


export default function* userSaga() {
  yield all([
    fork(watchLoadCurrentUser),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchRegister),
    fork(watchEdit),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchBlockFollow),
    fork(watchGetFollow),
  ])
}