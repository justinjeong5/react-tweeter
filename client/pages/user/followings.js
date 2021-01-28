import React from 'react'
import MainPage from '../../components/LandingPage/MainPage'
import { FOLLOWING } from '../../reducers/types'

function Followings() {

  return (
    <MainPage target={FOLLOWING} />
  )
}

export default Followings
