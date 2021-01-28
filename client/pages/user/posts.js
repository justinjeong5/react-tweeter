import React from 'react'
import { END } from 'redux-saga'
import axios from 'axios'
import wrapper from '../../store/configureStore'
import MainPage from '../../components/LandingPage/MainPage'
import { MYSELF, LOAD_CURRENT_USER_REQUEST, LOAD_POSTS_REQUEST } from '../../reducers/types'

function Posts() {

  return (
    <MainPage target={MYSELF} />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  axios.defaults.headers.Cookie = '';
  const cookie = context.req ? context.req.headers.cookie : '';
  if (cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_CURRENT_USER_REQUEST
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
    data: {
      lastId: null,
      target: MYSELF
    }
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});


export default Posts
