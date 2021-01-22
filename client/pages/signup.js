import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import RegisterForm from '../components/User/RegisterForm'

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

export default Signup
