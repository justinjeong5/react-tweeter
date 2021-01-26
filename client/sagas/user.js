import { all, put, fork, takeLatest, delay } from "redux-saga/effects";

import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
} from '../reducers/types'

function loginAPI(data) {
  return axios.post('/api/login', data)
}

function* login(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(loginAPI, action.data)
    yield put({
      type: LOGIN_USER_SUCCESS,
      data: action.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      data: error.response.data
    })
  }
}

function logoutAPI() {
  return axios.post('/api/logout')
}

function* logout(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(logoutAPI, action.data)
    yield put({
      type: LOGOUT_USER_SUCCESS,
      data: action.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGOUT_USER_FAILURE,
      data: error.response.data
    })
  }
}

function registerAPI(data) {
  return axios.post('/api/register', data)
}

function* register(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(registerAPI, action.data)
    yield put({
      type: REGISTER_USER_SUCCESS,
      data: action.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REGISTER_USER_FAILURE,
      data: error.response.data
    })
  }
}

function followAPI(data) {
  return axios.post('/api/follow', data)
}

function* follow(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(followAPI, action.data)
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: FOLLOW_FAILURE,
      data: error.response.data
    })
  }
}

function unfollowAPI(data) {
  return axios.post('/api/unfollow', data)
}

function* unfollow(action) {
  try {
    yield delay(2000);  // server is not ready
    // const result = yield call(unfollowAPI, action.data)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UNFOLLOW_FAILURE,
      data: error.response.data
    })
  }
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

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchRegister),
    fork(watchFollow),
    fork(watchUnfollow),
  ])
}