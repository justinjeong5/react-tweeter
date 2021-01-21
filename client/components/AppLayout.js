import React, { useState } from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import NavBar from './Header/NavBar'
import UserProfile from './User/UserProfile'
import LoginForm from './User/LoginForm'

function AppLayout({ children }) {

  const [login, setLogin] = useState(false)

  return (
    <div>
      <NavBar />
      <Row gutter={[10, 10]}>
        <Col xs={24} md={6}>
          {login ? <UserProfile setLogin={setLogin} /> : <LoginForm setLogin={setLogin} />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href='https://justinjeong5.github.io' target="_blank" rel="noreferrer noopener">made by JustinJeong5</a>
        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout
