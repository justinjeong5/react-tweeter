import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { Card, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid'
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
    Router.replace('/')
  }, [])

  const handleRouter = useCallback((route) => () => {
    Router.push(route)
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
        <div key={uuidv4()} onClick={handleRouter(`/user/${currentUser.id}`)}>게시글<br />{currentUser.Posts.length}</div>,
        <div key={uuidv4()} onClick={handleRouter('/user/followings')}>팔로윙<br />{currentUser.Followings.length}</div>,
        <div key={uuidv4()} onClick={handleRouter('/user/followers')}>팔로워<br />{currentUser.Followers.length}</div>,
      ]}
    >
      <Meta
        avatar={<ImageToAvatar image={currentUser.Image} userId={currentUser.id} />}
        title={currentUser.nickname}
      />
      <Button onClick={handleLogout} disabled={logoutUserLoading} loading={logoutUserLoading}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
