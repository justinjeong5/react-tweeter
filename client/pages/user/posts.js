import React from 'react'
import MainPage from '../../components/LandingPage/MainPage'
import { MYSELF } from '../../reducers/types'

function Posts() {

  return (
    <MainPage target={MYSELF} />
  )
}

export default Posts
