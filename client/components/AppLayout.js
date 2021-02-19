import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import NavBar from './Header/NavBar'
import LoginForm from './User/LoginForm'
import UserProfile from './User/UserProfile'

function AppLayout({ children, DefaultProfile, option }) {

  const { currentUser } = useSelector(state => state.user)

  return (
    <div style={{ padding: 20 }}>
      <NavBar />
      <Row gutter={[10, 10]}>
        <Col sm={24} md={6}>
          {option
            ? DefaultProfile
            : currentUser.id
              ? <UserProfile User={currentUser} />
              : <LoginForm />}
        </Col>
        <Col sm={24} md={12}>
          {children}
        </Col>
        <Col sm={24} md={6}>
          <a href='https://justinjeong5.github.io' target="_blank" rel="noreferrer noopener">made by JustinJeong5</a>
        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  DefaultProfile: PropTypes.node.isRequired,
  option: PropTypes.bool.isRequired,
};

export default AppLayout
