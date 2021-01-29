import React from 'react'
import { END } from 'redux-saga'
import axios from 'axios'
import wrapper from '../store/configureStore'
import MainPage from '../components/LandingPage/MainPage'
import PostForm from '../components/Post/PostForm'
import UserProfile from '../components/User/UserProfile'
import { LOAD_POSTS_REQUEST, CLEAR_POSTS_LIST, LOAD_CURRENT_USER_REQUEST } from '../reducers/types'
import { useSelector } from 'react-redux'

function index() {

  const { currentUser } = useSelector(state => state.user)

  return (
    <MainPage
      payload={{ action: LOAD_POSTS_REQUEST }}
      PostForm={<PostForm />}
      UserProfile={<UserProfile User={currentUser} />}
    />
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
    type: LOAD_POSTS_REQUEST,
    data: { lastId: null }
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default index

