import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'
import { Skeleton } from 'antd'

import AppLayout from '../components/AppLayout'
import FollowList from '../components/Profile/FollowList'
import NicknameEditForm from '../components/Profile/NicknameEditForm'
import ImageEditForm from '../components/Profile/ImageEditForm'
import UserProfile from '../components/User/UserProfile'
import { GET_FOLLOW_REQUEST } from '../reducers/types'

function Profile() {

  const dispatch = useDispatch();
  const { currentUser, getFollowDone, getFollowLoading } = useSelector(state => state.user)

  useEffect(() => {
    if (!currentUser.id) {
      Router.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    dispatch({
      type: GET_FOLLOW_REQUEST
    })
  }, [])

  if (!currentUser.id) {
    return null;
  }
  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout UserProfile={<UserProfile User={currentUser} />}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 600 }}>
            <NicknameEditForm />
            <ImageEditForm />
            {getFollowLoading && <Skeleton />}
            {getFollowDone && <FollowList header='나를 팔로우 하는 사람' data={currentUser.Followers} />}
            {getFollowDone && <FollowList header='내가 팔로우 하는 사람' data={currentUser.Followings} />}
          </div>
        </div>
      </AppLayout>
    </>
  )
}

export default Profile
