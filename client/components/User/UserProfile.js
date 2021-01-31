import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Card, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid'
import { LOGOUT_USER_REQUEST } from '../../reducers/types'
import ImageToAvatar from '../Image/ImageToAvatar';

const { Meta } = Card;

function UserProfile({ User }) {

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
    if (currentUser.id === User.id) {
      Router.push(route)
    }
  }, [currentUser, User])

  const renderCounts = useCallback((target) => {
    if (Array.isArray(target)) {
      return target.length;
    } else {
      return target;
    }
  }, [])

  return (
    <Card
      style={cardStyle}
      cover={
        <img
          alt="example"
          src={User.Image.src}
        />
      }
      actions={[
        <div key={uuidv4()} onClick={handleRouter(`/user/${User.id}`)}>게시글<br />{renderCounts(User.Posts)}</div>,
        <div key={uuidv4()} onClick={handleRouter('/user/followings')}>팔로윙<br />{renderCounts(User.Followings)}</div>,
        <div key={uuidv4()} onClick={handleRouter('/user/followers')}>팔로워<br />{renderCounts(User.Followers)}</div>,
      ]}
    >
      <Meta
        avatar={<ImageToAvatar User={User} />}
        title={User.nickname}
      />
      {currentUser.id === User.id && <Button onClick={handleLogout} disabled={logoutUserLoading} loading={logoutUserLoading}>로그아웃</Button>}
    </Card>
  )
}

UserProfile.propTypes = {
  User: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    Image: PropTypes.shape({
      src: PropTypes.string.isRequired
    }).isRequired,
    Posts: PropTypes.oneOfType[
      PropTypes.arrayOf().isRequired,
      PropTypes.number.isRequired
    ],
    Followings: PropTypes.oneOfType[
      PropTypes.arrayOf().isRequired,
      PropTypes.number.isRequired
    ],
    Followers: PropTypes.oneOfType[
      PropTypes.arrayOf().isRequired,
      PropTypes.number.isRequired
    ],
  }).isRequired
}


export default UserProfile
