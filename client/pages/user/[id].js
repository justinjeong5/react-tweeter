import React from 'react'
import { END } from 'redux-saga'
import axios from 'axios'
import wrapper from '../../store/configureStore'
import MainPage from '../../components/LandingPage/MainPage'
import { LOAD_CURRENT_USER_REQUEST, CLEAR_POSTS_LIST, LOAD_USER_POSTS_REQUEST } from '../../reducers/types'
import { useRouter } from 'next/router'

function User() {

  const router = useRouter();

  return (
    <MainPage payload={{ action: LOAD_USER_POSTS_REQUEST, userId: router.query.id }} />
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
    type: CLEAR_POSTS_LIST,
  })
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: {
      lastId: null,
      userId: context.params.id
    }
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});


export default User
