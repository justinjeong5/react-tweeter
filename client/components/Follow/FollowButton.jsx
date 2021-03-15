/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/types';

function FollowButton({ User }) {
  const dispatch = useDispatch();
  const { currentUser, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const [following, setFollowing] = useState(currentUser.Followings
    .find((follow) => follow.id === User.id));

  const handleFollow = useCallback(() => {
    const data = {
      userId: User.id,
    };
    if (following) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data,
      });
    }
    setFollowing((prev) => !prev);
  }, [following]);

  return (
    <Button
      loading={followLoading === User.id || unfollowLoading === User.id}
      onClick={handleFollow}
    >
      {following ? '언팔로우' : '팔로우'}
    </Button>
  );
}

FollowButton.propsType = {
  User: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FollowButton;
