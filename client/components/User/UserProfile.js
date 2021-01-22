import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Avatar, Button } from 'antd';
import { LOGOUT_USER } from '../../reducers/types'

const { Meta } = Card;

function UserProfile() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)

  const cardStyle = useMemo(() => ({ width: '100%', maxWidth: 300 }), [])

  const handleLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_USER
    })
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
        title={currentUser.email}
      />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
