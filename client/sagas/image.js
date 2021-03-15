import { all, put, fork, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
} from '../reducers/types';

function uploadImagesAPI(data) {
  return axios.post('/api/image/images', data); // FormData should not be wrapped by {}, which makes FormData into plain JSON object.
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: error.response.data,
    });
  }
}

function uploadImageAPI(data) {
  return axios.post('/api/image/image', data); // FormData should not be wrapped by {}, which makes FormData into plain JSON object.
}

function* uploadImage(action) {
  try {
    const result = yield call(uploadImageAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

export default function* imageSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchUploadImage),
  ]);
}
