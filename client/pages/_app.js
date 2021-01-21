import React from 'react'
import Head from 'next/head'
import Proptypes from 'prop-types'
import 'antd/dist/antd.css';

function App({ Component }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>React-Tweeter</title>
      </Head>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: Proptypes.elementType.isRequired,
}

export default App
