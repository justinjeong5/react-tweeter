import React, { useCallback, useMemo } from 'react'
import { Card, Avatar, Button } from 'antd';
import PropTypes from 'prop-types'

const { Meta } = Card;

function UserProfile({ setLogin }) {

  const cardStyle = useMemo(() => ({ width: '100%', maxWidth: 300 }), [])

  const handleLogout = useCallback(() => {
    setLogin(false);
  }, [])

  return (
    <Card
      style={cardStyle}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <div key='tweet'>게시글<br />0</div>,
        <div key='followings'>팔로윙<br />0</div>,
        <div key='followers'>팔로워<br />0</div>,
      ]}
    >
      <Meta
        avatar={<Avatar>JJ</Avatar>}
        title="JustinJeong5"
      />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Card>
  )
}

UserProfile.propTypes = {
  setLogin: PropTypes.func.isRequired,
}


export default UserProfile
