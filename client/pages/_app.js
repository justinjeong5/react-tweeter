import React from 'react'
import Head from 'next/head'
import Proptypes from 'prop-types'
import withReduxSaga from 'next-redux-saga'
import 'antd/dist/antd.css';
import 'react-virtualized/styles.css';

import wrapper from '../store/configureStore'

function App({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>React-Tweeter</title>
      </Head>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: Proptypes.elementType.isRequired,
}

export default wrapper.withRedux(withReduxSaga(App));
