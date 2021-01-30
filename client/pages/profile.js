import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Head from 'next/head'
import Router from 'next/router'
import { END } from 'redux-saga'
import wrapper from '../store/configureStore'

import AppLayout from '../components/AppLayout'
import FollowList from '../components/Profile/FollowList'
import NicknameEditForm from '../components/Profile/NicknameEditForm'
import ImageEditForm from '../components/Profile/ImageEditForm'
import UserProfile from '../components/User/UserProfile'
import { LOAD_CURRENT_USER_REQUEST, GET_FOLLOW_REQUEST } from '../reducers/types'

function Profile() {

  const { currentUser, editUserLoading, getFollowDone } = useSelector(state => state.user)

  useEffect(() => {
    if (!currentUser.id) {
      Router.push('/')
    }
  }, [currentUser])

  if (!currentUser.id) {
    return null;
  }
  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout
        DefaultProfile={!editUserLoading && <UserProfile User={currentUser} />}
        option={true}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 600 }}>
            <NicknameEditForm />
            <ImageEditForm />
            {getFollowDone && <FollowList header='나를 팔로우 하는 사람' data={currentUser.Followers} />}
            {getFollowDone && <FollowList header='내가 팔로우 하는 사람' data={currentUser.Followings} />}
          </div>
        </div>
      </AppLayout>
    </>
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
    type: GET_FOLLOW_REQUEST
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile
