import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { END } from 'redux-saga'
import { useRouter } from 'next/router'
import axios from 'axios'
import wrapper from '../../store/configureStore'
import MainPage from '../../components/LandingPage/MainPage'
import PostForm from '../../components/Post/PostForm'
import UserProfile from '../../components/User/UserProfile'
import { LOAD_CURRENT_USER_REQUEST, CLEAR_POSTS_LIST, LOAD_USER_POSTS_REQUEST, LOAD_USER_REQUEST } from '../../reducers/types'

function User() {

  const router = useRouter();
  const { currentUser, otherUser, loadUserDone } = useSelector(state => state.user)

  const handleForm = useCallback(() => {
    if (currentUser.id === router.query.id) {
      return < PostForm />;
    }
    return null;
  }, [])

  return (
    <MainPage
      payload={{ action: LOAD_USER_POSTS_REQUEST, userId: router.query.id }}
      PostForm={handleForm()}
      UserProfile={loadUserDone && <UserProfile User={otherUser} />}
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
    type: LOAD_USER_POSTS_REQUEST,
    data: {
      lastId: null,
      userId: context.params.id
    }
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: {
      userId: context.params.id
    }
  })
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});


export default User
