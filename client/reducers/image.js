/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  REMOVE_IMAGE_FROM_PATHS,
  CLEAR_IMAGE_FROM_PATHS,
  REMOVE_IMAGE_FROM_PATH,
} from './types';

const initialState = {
  imagePaths: [],
  imagePath: null,

  uploadImagesDone: false,
  uploadImagesLoading: false,
  uploadImagesError: null,
  uploadImageDone: false,
  uploadImageLoading: false,
  uploadImageError: null,
};

const imageReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS: {
      draft.imagePaths.push(...action.data.images);
      draft.message = action.data.message;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGE_FAILURE:
      draft.message = action.error.message;
      draft.uploadImageLoading = false;
      draft.uploadImageError = action.error.code;
      break;
    case UPLOAD_IMAGE_REQUEST:
      draft.uploadImageLoading = true;
      draft.uploadImageDone = false;
      draft.uploadImageError = null;
      break;
    case UPLOAD_IMAGE_SUCCESS: {
      draft.imagePath = action.data.image;
      draft.message = action.data.message;
      draft.uploadImageLoading = false;
      draft.uploadImageDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.message = action.error.message;
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error.code;
      break;
    case REMOVE_IMAGE_FROM_PATHS:
      draft.imagePaths.splice(action.data, 1);
      break;
    case CLEAR_IMAGE_FROM_PATHS:
      draft.imagePaths = [];
      break;
    case REMOVE_IMAGE_FROM_PATH:
      draft.imagePath = null;
      break;
    default:
      break;
  }
});

export default imageReducer;
