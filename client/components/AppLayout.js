import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './Header/NavBar'

function AppLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout
