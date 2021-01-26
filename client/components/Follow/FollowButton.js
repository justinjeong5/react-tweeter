import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST, } from '../../reducers/types'

function FollowButton({ post }) {

  console.log(post)
  const dispatch = useDispatch();
  const { currentUser, followLoading, unfollowLoading } = useSelector(state => state.user)
  const [following, setFollowing] = useState(currentUser.Followings.find(following => following.id === post.User.id))

  const handleFollow = useCallback(() => {
    const data = {
      userTo: post.User.id,
      userFrom: currentUser.id
    }
    if (following) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data
      })
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data
      })
    }
    setFollowing(prev => !prev)
  }, [following])

  return (
    <Button
      loading={followLoading || unfollowLoading}
      disabled={followLoading || unfollowLoading}
      onClick={handleFollow}
    >
      {following ? '언팔로우' : '팔로우'}
    </Button>
  )
}

FollowButton.propsType = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    User: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired
    }),
    content: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired
    })),
    Comments: PropTypes.arrayOf(PropTypes.shape({
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired
      }),
      content: PropTypes.string.isRequired,
    })),
  })
}

export default FollowButton
