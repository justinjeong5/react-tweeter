import React from 'react'
import { END } from 'redux-saga'
import wrapper from '../../store/configureStore'
import MainPage from '../../components/LandingPage/MainPage'
import { FOLLOWING, LOAD_CURRENT_USER_REQUEST, LOAD_POSTS_REQUEST } from '../../reducers/types'

function Followings() {

  return (
    <MainPage target={FOLLOWING} />
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
      target: FOLLOWING
    }
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});


export default Followings
