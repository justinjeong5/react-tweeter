import React from 'react'
import MainPage from '../../components/LandingPage/MainPage'
import { FOLLOWER } from '../../reducers/types'

function Followers() {

  return (
    <MainPage target={FOLLOWER} />
  )
}

export default Followers
