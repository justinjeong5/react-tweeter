import { all, put, fork, takeLatest, delay } from "redux-saga/effects";

import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
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
      data: {
        nickname: 'JustinJeong',
        email: 'justin.jeong5@gmail.com'
      }
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
  yield takeLatest(LOGIN_USER_REQUEST, login)
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
  ])
}