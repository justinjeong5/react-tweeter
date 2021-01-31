import { all, fork } from 'redux-saga/effects'
import axios from 'axios';
import config from '../config/config';
const env = process.env.NODE_ENV || 'development';
const { server_url } = config[env];


import userSaga from './user'
import postSaga from './post'
import postsSaga from './posts'
import imageSaga from './image'

axios.defaults.baseURL = server_url
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(postsSaga),
    fork(imageSaga),
  ])
}