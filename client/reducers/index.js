/* eslint-disable indent */
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';
import posts from './posts';
import image from './image';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        posts,
        image,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
