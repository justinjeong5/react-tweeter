import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button } from 'antd';
import { LOGOUT_USER_REQUEST } from '../../reducers/types'
import ImageToAvatar from '../Image/ImageToAvatar';

const { Meta } = Card;

function UserProfile() {

  const dispatch = useDispatch();
  const { currentUser, logoutUserLoading } = useSelector(state => state.user)

  const cardStyle = useMemo(() => ({ width: '100%', maxWidth: 300 }), [])

  const handleLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_USER_REQUEST
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
        <div key='tweet'>게시글<br />{currentUser.Posts.length}</div>,
        <div key='followings'>팔로윙<br />{currentUser.Followings.length}</div>,
        <div key='followers'>팔로워<br />{currentUser.Followers.length}</div>,
      ]}
    >
      <Meta
        avatar={<ImageToAvatar image={currentUser.Image} />}
        title={currentUser.nickname}
      />
      <Button onClick={handleLogout} disabled={logoutUserLoading} loading={logoutUserLoading}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
