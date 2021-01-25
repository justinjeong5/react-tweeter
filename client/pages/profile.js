import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/Profile/FollowList'
import NicknameEditForm from '../components/Profile/NicknameEditForm'

function Profile() {

  const { currentUser } = useSelector(state => state.user)

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
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='나를 팔로우 하는 사람' data={currentUser.Followers} />
        <FollowList header='내가 팔로우 하는 사람' data={currentUser.Followings} />
      </AppLayout>
    </>
  )
}

export default Profile
