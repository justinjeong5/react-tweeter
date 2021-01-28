import React from 'react'
import { END } from 'redux-saga'
import wrapper from '../../store/configureStore'
import MainPage from '../../components/LandingPage/MainPage'
import { FOLLOWER, LOAD_CURRENT_USER_REQUEST, LOAD_POSTS_REQUEST } from '../../reducers/types'

function Followers() {

  return (
    <MainPage target={FOLLOWER} />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_CURRENT_USER_REQUEST
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
    data: {
      lastId: null,
      target: FOLLOWER
    }
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});


export default Followers
