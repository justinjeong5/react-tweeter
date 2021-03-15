import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config/config';

import userSaga from './user';
import postSaga from './post';
import postsSaga from './posts';
import imageSaga from './image';

const env = process.env.NODE_ENV || 'development';
const { serverUrl } = config[env];

axios.defaults.baseURL = serverUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(postsSaga),
    fork(imageSaga),
  ]);
}
