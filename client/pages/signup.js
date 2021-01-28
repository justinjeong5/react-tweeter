import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import { END } from 'redux-saga'

import wrapper from '../store/configureStore'
import AppLayout from '../components/AppLayout'
import RegisterForm from '../components/User/RegisterForm'
import { LOAD_CURRENT_USER_REQUEST } from '../reducers/types'

function Signup() {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AppLayout>
        <RegisterForm />
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
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})

export default Signup
