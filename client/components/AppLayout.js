import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import NavBar from './Header/NavBar'
import UserProfile from './User/UserProfile'
import LoginForm from './User/LoginForm'

function AppLayout({ children }) {

  const { userLogin } = useSelector(state => state.user)

  return (
    <div>
      <NavBar />
      <Row gutter={[10, 10]}>
        <Col xs={24} md={6}>
          {userLogin ? <UserProfile /> : <LoginForm />}
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
