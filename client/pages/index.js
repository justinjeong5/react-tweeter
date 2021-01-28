import React from 'react'
import MainPage from '../components/LandingPage/MainPage'
import { NORMAL } from '../reducers/types'

function index() {

  return (
    <MainPage target={NORMAL} />
  )
}

export default index
