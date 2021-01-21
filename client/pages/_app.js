import React from 'react'
import Proptypes from 'prop-types'
import 'antd/dist/antd.css';

function App({ Component }) {
  return (
    <>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: Proptypes.elementType.isRequired,
}

export default App
