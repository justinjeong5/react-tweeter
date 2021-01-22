import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/Profile/NicknameEditForm'
import FollowList from '../components/Profile/FollowList'
import faker from 'faker'

function Profile() {

  const followers = Array.from(Array(10)).map(_ => ({ nickname: `${faker.name.firstName()} ${faker.name.lastName()}`, image: faker.image.people() }))
  const followings = Array.from(Array(10)).map(_ => ({ nickname: `${faker.name.firstName()} ${faker.name.lastName()}`, image: faker.image.people() }))

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='나를 팔로우 하는 사람' data={followers} />
        <FollowList header='내가 팔로우 하는 사람' data={followings} />
      </AppLayout>
    </>
  )
}

export default Profile
