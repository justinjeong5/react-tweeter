import { all, call, fork, put, take } from 'redux-saga/effects'
import axios from 'axios'

import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../reducers/types'

function loginAPI(data) {
  return axios.post('/api/login', data)
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: LOGIN_USER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      data: error.response.data
    })
  }
}

function* watchLogin() {
  yield take(LOGIN_USER_REQUEST, login)
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin)
  ])
}