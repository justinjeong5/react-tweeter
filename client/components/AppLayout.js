import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import NavBar from './Header/NavBar'

function AppLayout({ children }) {
  return (
    <div>
      <NavBar />
      <Row>
        <Col xs={24} md={6}>
          회원 정보
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
