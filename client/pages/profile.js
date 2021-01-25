import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/Profile/NicknameEditForm'
import FollowList from '../components/Profile/FollowList'
import faker from 'faker'
import { useSelector } from 'react-redux'

function Profile() {

  const { currentUser } = useSelector(state => state.user)
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
